---
layout: page
title: LED Lightshow Circuit
description: A custom LED controller for off-the-shelf LED strips.
img: assets/img/lightshow.jpg
importance: 2
category: fun
related_publications: false
toc:
  beginning: true
---

<div class="col-sm-5 mt-3 mt-md-0 mx-auto">
    {% include figure.liquid loading="eager" path="/assets/img/lightshow.jpg" class="img-fluid rounded z-depth-1" zoomable=true %}
</div>

> tl;dr: The cool-factor of the decorative LED strip sets commonly used as mood lighting can be improved dramatically by replacing their controller box with a programmable microcontroller.

> This article is a technical breakdown of how I built an LED controller with custom lighting effects using a Raspberry Pi Pico and supporting electronics.

## Concept

Existing Amazon-sold LED strip controllers are often limited to displaying one color at a time—even with multiple strips attached. These systems could see a dramatic improvement in customization by replacing their controller with a microcontroller board such as the Raspberry Pi Pico. One can program any number of advanced lighting effects using custom code—which may be impossible to find in existing products.

<br>

## Components

The circuit consisted of a Raspberry Pi Pico microcontroller board (which hosts the RP2040 microcontroller), TIP120 darlington transistors, DC-DC buck converter, resistor, and several feet of wire. Also included were the original light strips, IR receiver, DC power supply, and connectors from the original product.

<br>

| Component                    | Function                                                   | Reason for selection                                                                                                                                                                                                                        |
| :--------------------------- | :--------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Raspberry Pi Pico            | Control the system                                         | Relatively inexpensive but thanks to the RP2040, has plenty of compute power to control rapid color-changing effects smoothly. It also sports two cores which is helpful for simultaneously checking remote signals and controlling LEDs.   |
| IR receiver                  | Allow system to receive external user input                | Original to the system and able to communicate with the RP2040 using existing MicroPython libraries                                                                                                                                         |
| TIP120 Darlington Transistor | Drive the LED strips                                       | 5A collector current allows strips to be about 5m long with one transistor per color. These are very common, fairly inexpensive for hobbyist projects, and can be driven by the RP2040's 3.3V digital in/out pins.                          |
| DC-DC buck converter         | Regulate 12VDC down to 3.3VDC for the RP2040               | I have found this type of buck converter to be useful in all kinds of applications due to its relatively low price and wide input voltage range. Thus, I had some on hand. A buck converter rated for less output current may also be used. |
| Resistor                     | Limit current flow between infrared sensor and transistors | On-hand and easy to solder.                                                                                                                                                                                                                 |

<br>

## Schematic

<div class="col-sm-10 mt-3 mt-md-0 mx-auto">
    {% include figure.liquid loading="eager" path="/assets/img/lightshow/LED Lightshow Schematic_bb.svg" class="img-fluid rounded z-depth-1" zoomable=true %}
</div>

LED strips generally cannot be powered by a microcontroller alone, so in addition to the data signal from the Pi Pico, an external source of power was required. I selected TIP120 darlington transistors because they were very common.

<br>

## Reverse Engineering the Remote

One of the design goals was to keep the original remote as part of the system. The infrared sensor shipped with the LED set emitted a pulsed digital signal through its data pin, which was read by a digital IO pin on the Pi Pico. Each button caused the remote to emit a unique hex code, but I needed to empirically gather these codes to make a map of all button hex codes (below).

<div class="row mt-3">
    <div class="col-sm-3 mt-3 mt-md-0 mx-auto">
        {% include figure.liquid loading="eager" path="/assets/img/lightshow/RemotePinout.jpg" class="img-fluid rounded z-depth-1" zoomable=true %}
        <div class="caption">
        The remote's NEC8 codes were extracted by pressing each button and recording their corresponding numerical and hex code.
        </div>
    </div>
    <div class="col-sm-3 mt-3 mt-md-0 mx-auto">
        {% include figure.liquid loading="eager" path="/assets/img/lightshow/RemoteReference.jpg" class="img-fluid rounded z-depth-1" zoomable=true %}
        <div class="caption">
        Infrared remote control for reference (not my photo). 
        </div>
    </div>
</div>

<br>

## Multithreading Support

This feature took the longest amount of time to implement but allowed the system to run lag-free. With help from the pre-made MicroPython library "ir_tx", a callback function `callback(data, addr, ctrl)` was called when an infrared signal from the remote was received. This function set the global variable `hexIn` to the hex code that came from the remote. The main thread was a continuous loop that checked the `hexIn` variable, and if it was populated, it would call the relevant function in a new thread.

Major bugs needed to be fixed for the multithreading to run reliably. For example, the most difficult problem was the code abruptly freezing after about a few minutes of operation. It was difficult to diagnose this problem because it was unclear if the system resources were being depleted or if the bug was in the code itself. After many hours of testing, it was found that a garbage collector function `gc.collect()`—which frees system resources—needed to be called in nearly all threaded functions (inside their loops) to prevent memory overflows. This allowed the code to run indefinitely while the system was powered.

<br>

## Setting a color

The function `u(strip, color, a)` sets a strip to a specified color and brightness. `strip` is the strip identifier between 0 and 3, `color` is a size 3 array of values 0-255 for each color, and `a` is a brightness multiplier of preset values between 0 and 255.

<br>

## RGB Color Cycle Algorithm

The Raspberry Pi Pico is limited when it comes to math-heavy operations. Basic color effects like fading between two colors were possible with only addition and subtraction operations every few milliseconds. For a full RGB cycle function, however, the Pi Pico initially fell short and was not able to update the strips fast enough for a quick and smooth RGB fade effect. I then decided to make an array of pre-baked color codes that the program would simply cycle through called `RGBLST`. This way, the Pico only had to call `u(strip, color, a)` using the colors from the `RGBLST` array.

<br>

## Brightness Up/Down

Simple brightness control was implemented by multiplying the RGB values with a multiplier between 0 and 255. 7 total brightness settings were possible via the `brightArr` variable, and more could be added. Since differences in brightness were more noticeable at the lower end of possible brightnesses, increments were made close together between 0 to 80 and more spread out from 80 to 255.

<br>

## Speed Fast/Slow

Speed control was implemented by variable `speed` that ranged from 0 to 20. This variable was used in code delays (`sleep()`) and `for` loops to adjust how quickly an effect plays.

<br>

## Full Python Code

{% details Click to expand %}

<!-- prettier-ignore-start -->

{% highlight python linenos %}

from machine import Pin, PWM
from utime import sleep
from random import randint
from constants import COLORS, REMCODE, RGBLST
import _thread
from ir_rx.nec import NEC_8
import gc

hexIn = 0
bright = 255 #0-255
brightArr = [5, 10, 15, 30, 80, 150, 255]
pwm = []
led = Pin(25, Pin.OUT)
mode = False
colArr = [[0,0,0],[0,0,0]]
baton = \_thread.allocate_lock()
brightLvl = len(brightArr)-1
speed = 10
remColors = [65,88,89,69,68,84,85,73,72,80,81,77,76,28,29,30,31,24,25,26,27]

for i in range(12):
    pwm.append(PWM(Pin(i)))
    pwm[i].freq(1000)
    pwm[i].duty_u16(0)

def u(strip, color, a):#update certain strip only 65025 is highest.
    if strip == 1:
        pwm[0].duty_u16(color[1]*a)
        pwm[1].duty_u16(color[0]*a)
        pwm[2].duty_u16(color[2]*a)
    if strip == 0:
        pwm[3].duty_u16(color[1]*a)
        pwm[4].duty_u16(color[0]*a)
        pwm[5].duty_u16(color[2]*a)
    if strip == 3:
        pwm[6].duty_u16(color[1]*a)
        pwm[7].duty_u16(color[0]*a)
        pwm[8].duty_u16(color[2]*a)
    if strip == 2:
        pwm[9].duty_u16(color[1]*a)
        pwm[10].duty_u16(color[0]*a)
        pwm[11].duty_u16(color[2]*a)

def callback(data, addr, ctrl):
    global hexIn
    if data > 0:  # NEC protocol sends repeat codes.
        hexIn = data

ir = NEC_8(Pin(12, Pin.IN, Pin.PULL_DOWN), callback)

def findRem(val):
    for i in range(11):
        for j in range(4):
            if val == REMCODE[i][j]:
                return i, j    

def twoFade(colList):
    baton.acquire()
    while mode is True:
        print(speed)
        for i in range(0, len(colList), speed):
            for j in range(0, 3, 2):
                u(j, colList[i], bright)
                u(j+1, colList[len(colList)-1-i], bright)
            sleep(0.02)
        if mode is True:
            for i in range(len(colList)-1, 0, -speed):
                for j in range(0, 3, 2):
                    u(j, colList[i], bright)
                    u(j+1, colList[len(colList)-1-i], bright)
                sleep(0.02)
        gc.collect()
    baton.release()

def genTwoColFade(colorA, colorB):
    rate = 253 #resolution, 255 max (255/255=1 step)
    steps = []
    color = [colorA[0], colorA[1], colorA[2]]
    cArray = []
    for i in range(3):
        step = (colorA[i]-colorB[i])/rate
        if step < 0.001 and step > -0.001: step = 0
        steps.append(step)
    for x in range(rate+1):
        cArray.append([int(color[0]), int(color[1]), int(color[2])])
        for i in range(3):
            color[i] -= steps[i]
            if steps[i] > 0.0 and color[i] < colorB[i]: steps[i] = 0.0
            if steps[i] < 0.0 and color[i] > colorB[i]: steps[i] = 0.0
            if color[i] > 255: color[i] = 255.0
            if color[i] < 0.0: color[i] = 0.0
    cArray.append(colorB)
    print(len(cArray))
    return(cArray)

def solidColor(r, g, b):
    baton.acquire()
    while mode is True:
        for i in range(4):
            u(i, [r,g,b], bright)
        sleep(0.1)
        gc.collect()
    baton.release()

def twoSolidColor(c):
    baton.acquire()
    while mode is True:
        for i in range(0, 3, 2):
            u(i, c[0], bright)
            u(i+1, c[1], bright)
        sleep(0.2)
        gc.collect()
    baton.release()

def fourSolidColor(colList):
    baton.acquire()
    while mode is True:
        for i in range(4):
            u(i, colList[i], bright)
        sleep(0.2)
        gc.collect()
    baton.release()

def oneFade(colList):
    baton.acquire()
    while mode is True:
        for i in range(0, len(colList), speed):
            for j in range(4):
                u(j, colList[i], bright)
            sleep(0.02)
        if mode is True:
            for i in range(len(colList)-1, 0, -speed):
                for j in range(4):
                    u(j, colList[i], bright)
                sleep(0.02)
        gc.collect()
    baton.release()

def twoFlash(c):
    baton.acquire()
    while mode is True:
        for i in range(0, 3, 2):
            u(i, c[0], bright)
            u(i+1, c[1], bright)
        sleep(10/(speed*2)) # speed factor
        for i in range(0, 3, 2):
            u(i, c[1], bright)
            u(i+1, c[0], bright)
        sleep(10/(speed*2)) # speed factor
        gc.collect()
    baton.release()

def sweepFlash(c):
    baton.acquire()
    while mode is True:
        for i in range(4):
            if mode is True:
                for j in range(4):
                    u(j, c[1], bright)
                u(i, c[0], bright)
                sleep(5/(speed*2))
        for i in range(2,0,-1):
            if mode is True:
                for j in range(4):
                    u(j, c[1], bright)
                u(i, c[0], bright)
                sleep(5/(speed*2))
        gc.collect()
    baton.release()

def sweepFade2(colList):
    baton.acquire()
    while mode is True:
        for x in range(4):
            for i in range(0, len(colList), speed):
                u(x, colList[i], bright)
                sleep(0.02)
            if mode is True:
                for i in range(len(colList)-1, 0, -speed):
                    u(x, colList[i], bright)
                    sleep(0.02)
        gc.collect()
    baton.release()

def sweepFade(colList):
    baton.acquire()
    for i in range(4):
            u(i, colList[0], bright)
    stripOrder = [[0,1],[1,0],[2,1],[3,2],[2,3],[1,2]]
    while mode is True:
        for strip in stripOrder:
            if mode is True:
                for i in range(0, len(colList), speed\*2):
                    u(strip[0], colList[i], bright)
                    u(strip[1], colList[len(colList)-1-i], bright)
                    sleep(0.02)
                u(strip[1], colList[0], bright)
                sleep(1/speed)
        gc.collect()
    baton.release()

def rgb():
    baton.acquire()
    locations = [0, int(1*len(RGBLST)/8), int(2*len(RGBLST)/8), int(3*len(RGBLST)/8)]
    while mode is True:
        for i in range(4):
            u(i, RGBLST[locations[i]], bright)
            locations[i] += 1
            if locations[i] > len(RGBLST)-1: locations[i] = 0
        sleep(0.03)
    baton.release()
    
def rgbAll():
    baton.acquire()
    while mode is True:
        for i in range(len(RGBLST)):
            for j in range(4):
                u(j, RGBLST[i], bright)
            sleep(0.03)
    baton.release()
    
def rgbStrobe():
    baton.acquire()
    gc.collect()
    counter = 0
    while mode is True:
        gc.collect()
        for i in range(len(RGBLST)):
            if counter < 10:
                u(0, RGBLST[i], bright)
                u(1, RGBLST[i], bright)
                u(2, [0,0,0], bright)
                u(3, [0,0,0], bright)
            else:
                u(0, [0,0,0], bright)
                u(1, [0,0,0], bright)
                u(2, RGBLST[i], bright)
                u(3, RGBLST[i], bright)
            counter += 1
            print(counter)
            if counter > 19: counter = 0
            sleep(0.02)
    baton.release()
    
def randFade():
    baton.acquire()
    while mode is True:
        randColor = COLORS[randint(0, 4)][randint(0, 3)]
        print(randColor)
        for i in range(150, 0, -0.5\*speed):
            for j in range(4):
                u(j, randColor, i)
            sleep(0.05)
        gc.collect()
    baton.release()
    
def strobe1():
    baton.acquire()
    randColor = [0,0,0]
    speeds = [0.3, 0.2, 0.15, 0.1, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05]
    while mode is True:
        gc.collect()
        randColorOld = randColor
        while randColorOld == randColor:
            randColor = COLORS[randint(0, 4)][randint(0, 3)]
        for i in range(len(speeds)):
            if mode is False: continue
            u(0, randColor, bright)
            u(1, randColor, bright)
            u(2, [0,0,0], bright)
            u(3, [0,0,0], bright)
            sleep(speeds[i])
            u(0, [0,0,0], bright)
            u(1, [0,0,0], bright)
            u(2, randColor, bright)
            u(3, randColor, bright)
            sleep(speeds[i])
        for i in range(17):
            for j in range(4):
                u(j, randColor, bright)
            sleep(0.03)
            for j in range(4):
                u(j, [0,0,0], bright)
            sleep(0.03)
    baton.release()
            

def selectCol(num): #num of colors to select, cannot exceed 4
    global hexIn
    colSelect = []
    for i in range(4):
        u(i, [0,0,0], 0)
    for i in range(num):
        while not hexIn in remColors:
            u(i, [255,255,255], 20)
            sleep(0.1)
            u(i, [255,255,255], 0)
            sleep(0.1)
        button = findRem(hexIn)
        if hexIn != 65: colSelect.append(COLORS[button[0]-1][button[1]])
        else: colSelect.append([0,0,0])
        u(i, colSelect[i], bright)
        hexIn = 0
    return colSelect

gc.enable()

while True:
    led.toggle()
    if hexIn:
        button = findRem(hexIn)
        print("value: " + str(hexIn))
        print(button)
        
        if button[0] >= 1 and button[0] <= 5:
            mode = False
            baton.acquire()
            mode = True
            _thread.start_new_thread(solidColor, (COLORS[button[0]-1][button[1]]))
            baton.release()
            
        if hexIn == 92:
            if brightLvl < len(brightArr)-1:
                brightLvl += 1
            bright = brightArr[brightLvl]
        if hexIn == 93:
            if brightLvl > 0:
                brightLvl -= 1
            bright = brightArr[brightLvl]
        if hexIn == 23:
            if speed < 20:
                speed += 1
                print("Speed: " + str(speed))
        if hexIn == 19:
            if speed > 1:
                speed -= 1
                print("Speed: " + str(speed))
                
        if hexIn == 64:
            mode = False
            baton.acquire()
            for i in range(4):
                u(i, [0,0,0], bright)
            hexIn = 0
            while hexIn != 64:
                sleep(1)
            for i in range(4):
                u(i, [20,20,20], bright)
            baton.release()
        if hexIn == 12:
            mode = False
            baton.acquire()
            mode = True
            _thread.start_new_thread(twoSolidColor, (selectCol(2),))
            baton.release()
        if hexIn == 8:
            mode = False
            baton.acquire()
            mode = True
            _thread.start_new_thread(fourSolidColor, (selectCol(4),))
            baton.release()
        if hexIn == 13:
            mode = False
            baton.acquire()
            mode = True
            c = selectCol(2)
            _thread.start_new_thread(oneFade, (genTwoColFade(c[0], c[1]),))
            baton.release()
        if hexIn == 14:
            mode = False
            baton.acquire()
            mode = True
            c = selectCol(2)
            _thread.start_new_thread(twoFade, (genTwoColFade(c[0], c[1]),))
            baton.release()
        if hexIn == 9:
            mode = False
            baton.acquire()
            mode = True
            c = selectCol(2)
            _thread.start_new_thread(twoFlash, (c,))
            baton.release()
        if hexIn == 10:
            mode = False
            baton.acquire()
            mode = True
            c = selectCol(2)
            _thread.start_new_thread(sweepFlash, (c,))
            baton.release()
        if hexIn == 11:
            mode = False
            baton.acquire()
            mode = True
            c = selectCol(2)
            _thread.start_new_thread(sweepFade, (genTwoColFade(c[0], c[1]),))
            baton.release()
        if hexIn == 15:
            mode = False
            baton.acquire()
            mode = True
            _thread.start_new_thread(rgb, ())
            baton.release()
        if hexIn == 6:
            mode = False
            baton.acquire()
            mode = True
            _thread.start_new_thread(rgbAll, ())
            baton.release()
        if hexIn == 5:
            mode = False
            baton.acquire()
            mode = True
            _thread.start_new_thread(strobe1, ())
            baton.release()
        if hexIn == 4:
            mode = False
            baton.acquire()
            mode = True
            _thread.start_new_thread(randFade, ())
            baton.release()
        if hexIn == 7:
            mode = False
            baton.acquire()
            mode = True
            _thread.start_new_thread(rgbStrobe, ())
            baton.release()
        hexIn = 0
    #print(gc.mem_free())
    sleep(0.1)

{% endhighlight %}

<!-- prettier-ignore-end -->

{% enddetails %}

> Thank you for reading! This project is inspired by the idea of **making do with what you have**. It uses readily accessible components in a creative application to make fun for everyone in the room.
