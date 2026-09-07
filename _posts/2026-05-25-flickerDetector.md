---
layout: distill
title: "Flicker Detector Circuit for LEDs & More"
thumbnail: assets/img/flickerDetector/flickerDetector4.jpg
date: 2026-05-25
---

<div class="col-sm mt-3 mt-md-0">
    {% include video.liquid path="assets/img/flickerDetector/flickerDetector.mp4" class="img-fluid rounded z-depth-1" controls=true autoplay=true %}
</div>
<div class="caption">
    My custom-built circuit that senses light intensity and outputs a usable waveform.
</div>

> Have you ever wondered why some LED light bulbs flicker more than others? The quality of the LED driver circuitry plays a huge part in whether flicker is present. Lights that flicker can cause headaches and health problems in some individuals, so finding bulbs with a stable illumination can be advantageous. This project aims to help anyone looking to characterize their light sources to make informed choices about lighting, ideally leading to healthier lives.

# Introduction

This project began when I noticed that some LED bulbs flicker more than others, despite them being powered by the same wall outlet. I myself find that flickering bulbs disturb my focus and often motivate me to go to another room...maybe you can relate. After researching the topic, I found a sizable community on Reddit, [r/PWM_Sensitive](https://www.reddit.com/r/PWM_Sensitive), where people discuss sensitivity to pulse-width modulation (PWM). They highlight the adverse health effects of being around PWM light sources, especially for long periods of time. Given the online discourse, I thought I'd characterize my existing light bulbs and see how their measured flicker profiles stand up to premium bulb options.

# Circuit Specifications

A flicker profile of a bulb can be created by plotting its light intensity over a short period of time, typically a few milliseconds. I found a database called [Optimize Your Biology](https://optimizeyourbiology.com/light-bulb-database/) that uses this method to compare hundreds of LED bulbs. I found one of my own bulbs was in their database: a Philips Ultra Definition bulb with 2700K color temperature, 800 lumen light output, 8W power consumption, and in a frosted glass enclosure.

<div class="row mt-3 mb-3 col-sm-6 mx-auto">
    {% include figure.liquid loading="eager" path="assets/img/flickerDetector/example_from_optimize_your_biology.png" class="img-fluid rounded z-depth-1" zoomable=true %}
    <div class="caption">
        The published curve for my particular Philips light bulb (source: Optimize Your Biology)
    </div>
</div>

I counted the number of samples per millisecond in the above image and estimated that the instrument used to create the graph had a sample rate of at least 10,000 samples per second. High sample rate would be required to capture the light intensity waveform in high resolution. I also estimated the instrument had at least an 8-bit analog-digital converter (ADC) which would yield 256 discrete "steps" of light intensity in the y-axis.

# Circuit Design

Based on the estimated specifications above, I set out to design a transimpedance amplifier circuit, featuring a photodiode configured for reverse-bias. A transimpedance amplifier is useful for turning very small currents from the photodiode (in this case, the micro-Ampere range) into usable voltage signals that can be read by an Arduino, etc. The photodiode in this circuit has a maximum current output of 70 micro-Amps, which the circuit transforms to a voltage signal with a range of 0V to 3.3V. That signal could then be read by a microcontroller's ADC for analysis.

<div class="row mt-3">
    <div class="col-sm-7 mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="/assets/img/flickerDetector/BPW34Amp_Sch_Rev_B.png" class="img-fluid rounded z-depth-1" zoomable=true %}
        <div class="caption">
            The flicker detector schematic, Revision B.
        </div>
    </div>
    <div class="col-sm-5 mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="/assets/img/flickerDetector/flickerDetector1.jpg" class="img-fluid rounded z-depth-1" zoomable=true %}
        <div class="caption">
            My breadboard circuit with alligator clips supplying power.
        </div>
    </div>
</div>

# Component Selections

### Photodiode: BPW34

<div class="row mt-3 mb-3 col-sm-3 mx-auto">
    {% include figure.liquid loading="eager" path="/assets/img/flickerDetector/BPW34_sml.webp" class="img-fluid rounded z-depth-1" zoomable=true %}
    <div class="caption">
        source: DigiKey
    </div>
</div>

I selected the BPW34 photodiode as the sensor for this circuit because it was relatively inexpensive and has an switching speed of 20 nanoseconds—plenty for this circuit. The 10kHz sample rate specification required the diode to switch ON and OFF in 50 microseconds or less, which it easily could. The diode is also breadboard mountable, making it easy to prototype with. Another option was a phototransistor, but I opted for a photodiode because it was my understanding that photodiodes are generally preferred for precision and high-speed circuits.

### Op-amp: MCP602

<div class="row mt-3 mb-3 col-sm-3 mx-auto">
    {% include figure.liquid loading="eager" path="/assets/img/flickerDetector/MCP602.webp" class="img-fluid rounded z-depth-1" zoomable=true %}
    <div class="caption">
        source: DigiKey
    </div>
</div>

I selected the MCP602 as the operational amplifier because of its high gain-bandwidth product, low input bias current, and single-supply operation. I spent the most time selecting the op-amp because there were many parameters to review, and alternatives could produce a higher quality output signal, etc. In the end, I decided to opt for this op-amp because it seemed like my 10kHz target sample rate was on the low end of what this op-amp is capable of.

### Passives: feedback resistor ($ R_1 $) & feedback capacitor ($ C_1 $)

At first, I performed manual calculations for these values using the following equations:

$$
R_1=\frac{V_{oMax}-V_{oMin}}{I_{iMax}}=\frac{3.3V - 0.1V}{75\mu A}=42.666k\Omega
$$

$$
C_1 ≤ \frac{1}{2*\pi*R_1*f_p} = \frac{1}{2*\pi *42.666k\Omega * 10kHz}=37.3pF
$$

However, I found this [online tool by Analog Devices](https://tools.analog.com/en/photodiode/) that made the calculation of these values nearly effortless. For context, the resistor value dictates the gain of the op-amp and thus output voltage level, while the capacitor value stabilizes the circuit.

I used a C0G-type capacitor for C1 because my goal was to keep its capacitance constant over the wide range of voltages it might see.

### Passives: Supply bypass and bulk capacitors

I followed the datasheet's test circuit to determine the values of the bypass and bulk capacitors, which are used for filtering noise. I used an X7R-type ceramic for the bypass capacitor because my understanding was that the consistency of the capacitance value is not important in that application. A tantalum capacitor was used for the bulk capacitor because it was less expensive than ceramic and it appeared other designers use tantalum-type in bulk capacitor contexts.

<div class="row mt-3 mb-3 col-sm-6 mx-auto">
    {% include figure.liquid loading="eager" path="/assets/img/flickerDetector/mcp602_testcircuit.png" class="img-fluid rounded z-depth-1" zoomable=true %}
    <div class="caption">
        MCP602 Datasheet, Figure 1.3. Highlighted are the bypass (0.1μF) and bulk (1μF) capacitors that were carried over to my circuit.
    </div>
</div>

<br>

# Test Setup

<div class="row mt-3">
    <div class="col-sm-4 mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="/assets/img/flickerDetector/flickerDetector11.jpg" class="img-fluid rounded z-depth-1" zoomable=true %}
        <div class="caption">
            Light shining into the photodiode
        </div>
    </div>
    <div class="col-sm-4 mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="/assets/img/flickerDetector/flickerDetector3.jpg" class="img-fluid rounded z-depth-1" zoomable=true %}
        <div class="caption">
            Power supply configured for 3.3V and 6.6V. The 5V constant supply was also used
        </div>
    </div>
    <div class="col-sm-4 mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="/assets/img/flickerDetector/flickerDetector4.jpg" class="img-fluid rounded z-depth-1" zoomable=true %}
        <div class="caption">
            Entire test setup, minus the lamp under test
        </div>
    </div>
</div>

The test setup consisted of:

- an oscilloscope,
- a power supply,
- a lamp housing with various LED light bulbs
- the circuit under test

The light sources tested were:

- an LED flashlight capable of variable brightness
- an incandescent bulb (which is, the kind of bulb that gets really hot)
- an LED bulb: GreatValue brand
- an LED bulb: Philips brand "Ultra Definition" (800lm, 2200-2700K, 8W, Frosted Glass)

It took three attempts to get this circuit working... the first time, I had a fundamental flaw in the circuit design, and the second, I forgot to hook up the ground lead of the oscilloscope.

The third (successful) time, I began by shining the LED flashlight at full power in the photodiode. I was delighted to see the output signal responded and was inversely proportional to input light intensity. This was expected because the circuit constructed was an **inverting** amplifier. After inverting the signal with the scope, I could then begin some tests using various household light sources.

## LED Flashlight

<div class="row mt-3">
    <div class="col-sm-4 mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="/assets/img/flickerDetector/flickerDetector5.jpg" class="img-fluid rounded z-depth-1" zoomable=true %}
        <div class="caption">
            High brightness
        </div>
    </div>
    <div class="col-sm-4 mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="/assets/img/flickerDetector/flickerDetector6.jpg" class="img-fluid rounded z-depth-1" zoomable=true %}
        <div class="caption">
            Medium brightness
        </div>
    </div>
    <div class="col-sm-4 mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="/assets/img/flickerDetector/flickerDetector7.jpg" class="img-fluid rounded z-depth-1" zoomable=true %}
        <div class="caption">
            Low brightness
        </div>
    </div>
</div>

When I ran this test, I didn't know if my flashlight used PWM to _fake_ a lower LED intensity, or if the LED truly was half as bright. I had an "aha!" moment when I switched the flashlight from high to medium brightness and noticed that the LED was in fact pulsed! Its PWM frequency was about 270Hz. The medium intensity's duty cycle (the ratio of the ON-time versus OFF-time) was about 50%, and for the low intensity, about 25%.

## Incandescent Bulb

<div class="row mt-3 mb-3 col-sm-6 mx-auto">
    {% include figure.liquid loading="eager" path="/assets/img/flickerDetector/flickerDetector8.jpg" class="img-fluid rounded z-depth-1" zoomable=true %}
    <div class="caption">
        Light intensity waveform of the incandescent bulb
    </div>
</div>

The incandescent bulb's intensity appeared to be a triangle wave, which made sense because there are no active electronics and thus no complicated waveforms. This bulb type is simply a filament with an alternating current traveling through it.

## GreatValue LED Bulb

<div class="row mt-3 mb-3 col-sm-6 mx-auto">
    {% include figure.liquid loading="eager" path="/assets/img/flickerDetector/flickerDetector9.jpg" class="img-fluid rounded z-depth-1" zoomable=true %}
    <div class="caption">
        Light intensity waveform of the GreatValue LED bulb
    </div>
</div>

This bulb had me fooled at first because I grabbed it out of the bin thinking it was an incandescent bulb due to its frosted glass exterior. When I observed the waveform, however, it was clearly an LED bulb because of the saw-tooth-like flicker pattern.

The flicker range appeared intense, as in, the flicker made up a significant percentage of the bulb's overall light output. One next step in this project could be to learn how to measure lux using this circuit. I assume that would require calibration against a few known-intensity light sources. This way, I could say that the flicker spans 50% of the bulb's total light output, for example.

## Philips Ultra Definition LED Bulb

I originally bought a set of these bulbs as low-flicker lighting for my living area. This was the real test for my circuit because the waveform of this bulb was already known. Let's compare the graph from Optimize Your Biology (which even had units!) to my experimental waveform of this bulb.

<div class="row mt-3">
    <div class="col-sm-5 mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="/assets/img/flickerDetector/example_from_optimize_your_biology.png" class="img-fluid rounded z-depth-1" zoomable=true %}
        <div class="caption">
            Known flicker curve from Optimize Your Biology of the Philips Ultra Definition LED bulb
        </div>
    </div>
    <div class="col-sm-7 mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="/assets/img/flickerDetector/flickerDetector10.jpg" class="img-fluid rounded z-depth-1" zoomable=true %}
        <div class="caption">
            My light intensity waveform of the Philips Ultra Definition LED bulb
        </div>
    </div>
</div>

To my delight, the graphs appear to very closely match! Despite the apparent noise in my circuit, the silhouette is clearly a match, with the troughs in both measurements being about 8 milliseconds apart. This proved to me that my circuit works and could be used to reliably measure additional light sources. The noise in my circuit was likely due to the breadboard's parasitic capacitance and inductance, which could be mitigated by designing a proper printed circuit board.

<br>

# Conclusion

This project could be useful to anyone looking for an inexpensive method of characterizing the flicker of their light sources. With an increasing public attention on the health effects of PWM light sources on sleep quality and energy levels, it may be of great benefit to learn more about the lights around you to make educated decisions about them.
