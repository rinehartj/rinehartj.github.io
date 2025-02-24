---
layout: distill
title: "Raspberry Pi Pico as a hardware ISP"
tags: hardware, firmware
thumbnail: assets/img/hardwareISP/isp.jpg
bibliography: 2025-02-17-hardwareISP.bib
date: 2025-02-23
---

<div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/hardwareISP/isp.jpg" class="img-fluid rounded z-depth-1" zoomable=true %}
</div>

#### This project began when I was looking for proof that my Arduino Nano could be brought back to life.

## Introduction

Why purchase the genuine version of an open source hardware device when clones can be purchased for less? I asked myself this question a few years ago and decided to pick up some Arduino Nano clones from AliExpress. Once they arrived, I remember them to be well-soldered and free of noticeable imperfections. As I experimented with the boards, I learned the quirks of these specific boards thoroughly.

## Terms

The term "**open source**" describes source code or design documents that are free to access and redistribute<d-cite key="enwiki:1276146904"></d-cite>. **Arduino** is an open source platform and community centered around making complex electronics and digital technologies available to all<d-cite key="arduinoAboutArduino"></d-cite>. The Arduino Integrated Development Environment (IDE) is a software for writing code and programming Arduino boards, including the Arduino Nano. This article mentions the Arduino Nano, a compact microcontroller board that hosts the ATMega328P microcontroller.

## Findings

At first, code was not uploading to any of the Arduino Nano boards. The Arduino IDE would get stuck on "Uploading..." or similar. Thankfully, communication issues between the board and software are thoroughly documented online. I found that two changes were important to getting my version of the Nano clone working:

First, the `CH340G` USB to UART converter chip on the clones required downloading and installing a driver. The name of the file was `CH341SER.exe` which can be downloaded [here](http://www.wch.cn/download/CH341SER_EXE.html).

Furthermore, I needed to make the following setting in Arduino IDE:

- Processor: **ATMega328P (Old Bootloader)**

There appears to be two bootloaders for the `ATMega328P` chip, titled by Arduino IDE as "old" and "new". My Nano only worked when setting the Arduino IDE to "Old Bootloader" so I assume it had the old bootloader installed. Later in this article, I discuss how I flashed the "new" bootloader to the chip using a Raspberry Pi Pico microcontroller board.

Finally, I made sure to use a USB cable that supported **data and power** (as opposed to **power only**). I did this by listening for the USB insertion sound when I plugged in the cable and checking the device manager utility for a new listing.

## How I accidentally erased the bootloader

<div class="row mt-3">
    <div class="col-sm-4 mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="/assets/img/hardwareISP/MarlinOldFirmware.png" class="img-fluid rounded z-depth-1" zoomable=true %}
        {% include figure.liquid loading="eager" path="/assets/img/hardwareISP/MarlinNewFirmware.png" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
    <div class="col-sm-8 mt-3 mt-md-0">
        Earlier this year, I updated the firmware for my Ender 3 Pro 3D printer to access a new feature called "Z-Babystep". However, on older Ender 3 Pro versions using the 8-bit "Melzi" motherboard, bootloaders were sometimes not included from the factory, including mine. I flashed a bootloader myself using <a href="https://letsprint3d.net/guide-how-to-flash-a-bootloader-on-melzi-boards/">this online guide</a>. After wiring the SPI headers of my Arduino Nano and Melzi motherboard together, I uploaded the "Arduino as ISP" sketch to the Nano using Arduino IDE. Then, I set "Board" to "Sanguino" and used the "Burn Bootloader" function. At this point, I was able to upload Marlin firmware without issue.
    </div>
</div>
However, this process seemed to have wiped the bootloader from my Arduino Nano, as it was no longer accepting new sketches. Arduino IDE was hanging at "Uploading Sketch".

## Flashing the new bootloader

To flash an ATMega chip with a corrupted or erased bootloader such as mine, an **In-System Programmer** (ISP) is needed. The easiest path forward would be to use _another Arduino_ since both devices would operate at the same logic level (5V). I had none on hand so I chose to use a Raspberry Pi Pico which operates at 3.3V. I needed to be careful that logic levels would not saturate.

According to the datasheet, the maximum safe DIO voltage of the RP2040 is `IOVDD + 0.5V`. I measured the IOVDD pin using a multimeter and found it to be 3.27V, so in my case, the maximum safe DIO voltage was 3.77V. It was possible that level shifters were not needed between the Arduino Nano and Pi Pico, as long as the Arduino Nano could operate at 3.77V reliably.

### Flashing Steps

1. I downloaded the Adafruit AVR programmer repository [here](https://github.com/adafruit/Adafruit_CircuitPython_AVRprog/tree/main).
2. I held the `BOOTSEL` button on the Pi Pico while plugging it in over a data-capable USB cable. I then let go of the button and uploaded the [CircuitPython .uf2 file](https://circuitpython.org/board/raspberry_pi_pico/) to the mounted drive.
3. I connected to the Pi Pico using the online CircuitPython IDE available [here](https://code.circuitpython.org/) to upload code and libraries.

When all was finished, the file structure of the Pi Pico root directory looked like this:

<div class="col-sm mt-3 mt-md-0 w-50">
    {% include figure.liquid loading="eager" path="/assets/img/hardwareISP/filesystem.png" class="img-fluid rounded z-depth-1" zoomable=true %}
</div>

I then made the following connections between the Arduino Nano and Pi Pico:

```
Arduino Clk <> Pico GP18
Arduino MOSI <> Pico GP19
Arduino MISO <> Pico GP16
Arduino RST <> Pico GP10
```

and set these accordingly in Code.py as seen below:

```py
spi = busio.SPI(clock=board.GP18, MOSI=board.GP19, MISO=board.GP16)
avrprog = adafruit_avrprog.AVRprog()
avrprog.init(spi, board.GP10)
```

I ran the code, and to my surprise the chip was flashed in less than a second. At first I was worried, because the program skipped almost all of the sectors. However, at the very end, code was uploaded and verified, which I presume to be the bootloader. After a round of testing, the Arduino was then able to accept code via the Arduino IDE. Since I flashed the _new_ bootloader, I could now select `Processor: ATmega328P` instead of the old bootloader option.

{% details Click to expand console output %}

```plaintext
Ready to GO, type 'G' here to start> G
Found signature: ['0x1e', '0x95', '0xf']
Found ATmega328p
Programming flash from file
Erasing chip....
Programming page $0000...skipping
Programming page $0080...skipping
Programming page $0100...skipping
Programming page $0180...skipping
Programming page $0200...skipping
Programming page $0280...skipping

(230 more lines...)

Programming page $7880...skipping
Programming page $7900...skipping
Programming page $7980...skipping
Programming page $7A00...skipping
Programming page $7A80...skipping
Programming page $7B00...skipping
Programming page $7B80...skipping
Programming page $7C00...skipping
Programming page $7C80...skipping
Programming page $7D00...skipping
Programming page $7D80...skipping
Programming page $7E00...Verifying page @ $7E00
Programming page $7E80...Verifying page @ $7E80
Programming page $7F00...Verifying page @ $7F00
Programming page $7F80...Verifying page @ $7F80
Done!

Code done running.
```

{% enddetails %}

## Conclusion

According to [this reddit post](https://www.reddit.com/r/arduino/comments/10o64v2/comment/j6g53h1/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button), new Nano clones are being shipped with the new bootloader. This procedure would likely work for anyone who would like to update their Nano bootloader if they had an old board. Considering the inexpensive price tag of the Arduino Nano compared to other microcontroller boards, I suspect most people with corrupted bootloaders would opt for a replacement. I am glad I chose the more challenging path of flashing a bootloader which extended the life of my trusty Arduino.

{::comment}

{::nomarkdown}
{% assign jupyter_path = 'assets/jupyter/hardwareISP.ipynb' | relative_url %}
{% capture notebook_exists %}{% file_exists assets/jupyter/hardwareISP.ipynb %}{% endcapture %}
{% if notebook_exists == 'true' %}
{% jupyter_notebook jupyter_path %}
{% else %}

  <p>Sorry, the notebook you are looking for does not exist.</p>
{% endif %}
{:/nomarkdown}

{:/comment}
