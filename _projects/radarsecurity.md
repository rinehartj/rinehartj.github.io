---
layout: page
title: Client-Server Radar Security Circuit
description: Protects against intruders using 5.8GHz radar and IoT connectivity.
img: assets/img/radarsecurity.jpg
importance: 2
category: academic
related_publications: false
---

> This article was adapted from a research poster I created with Trinh Huynh, project partner, and Dr. Saurav Basnet of Wentworth Institute of Technology, advisor.
> <br>

## Need

---

Everyone has concerns when they leave their homes for long periods of time. Additionally, people who are home alone need to know if someone is within the perimeter of their property. Parents are always worried about the whereabouts and safety of children, especially in dangerous areas such as a garage or by the street. **Possible solutions to the above scenarios are either unreliable, costly, or difficult to install.** A security and alert device systems for home use that
counteracts the above setbacks is now proposed.

<br>

## Alternatives

---

- IP Cameras:
  - Pros: low cost, easy to set up, work well indoor
  - Cons: fault alerts for outdoor use, reliance on internet, privacy concerns, have a gap accuracy on indoor and outdoor use
- AI-Equipped IP Cameras:
  - Pros: Artificial Intelligence provides more accurate recognition of humans and objects, especially outdoors.
  - Cons: Requires a monthly fee, requires more computing power, and relies the manufacturer to stay in business to run the AI software.

<br>

## Solution

---

Built a circuit that encompasses short term and long-term reliability, cost effectiveness, and expandability. The proposed circuit has the potential
to expand further these abilities

<br>

## Purpose

---

The project utilizes two WiFi equipped microcontrollers: a Raspberry Pi B 3+ and a Particle Photon. The Photon reads a 1/0 from the Radar Sensor and sends to to the Raspberry Pi. From the Pi, the signal is used to trigger events on the LCD display, buzzer, LEDs, and external triggers such as phone notifications.

<br>

## Components

---

{% include figure.liquid loading="eager" path="/assets/img/radarsecurity/components.png" class="img-fluid rounded z-depth-1" zoomable=true %}

<br>

## Design: Renders and Schematics

---

<div class="row mt-3">
    <div class="col-sm-6 mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="/assets/img/radarsecurity/ctrlbox_closed.png" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
    <div class="col-sm-6 mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="/assets/img/radarsecurity/ctrlbox_open.png" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
</div>

<div class="row mt-3">
    <div class="col-sm-4 mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="/assets/img/radarsecurity/remotebox_closed.png" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
    <div class="col-sm-4 mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="/assets/img/radarsecurity/remotebox_open_partial.png" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
    <div class="col-sm-4 mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="/assets/img/radarsecurity/remotebox_open.png" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
</div>

<br>

## Circuit Design

---

<div class="row mt-3">
    <div class="col-sm-6 mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="/assets/img/radarsecurity/ctrl_schematic.png" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
    <div class="col-sm-6 mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="/assets/img/radarsecurity/remote_schematic.png" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
</div>

<br>

## Network Design

---

<div class="row mt-3 mb-3 col-sm-6 mx-auto">
    {% include figure.liquid loading="eager" path="/assets/img/radarsecurity/network_diagram.png" class="img-fluid rounded z-depth-1" zoomable=true %}
</div>

- A wireless router connects the whole
  system to the internet (WAN), where
  external services may be accessed by code
  from the Raspberry Pi.
- The Radar Sensor and Base Station use
  local Transmission Control Protocol (TCP)
  packets to communicate, a very basic but
  reliable method.

<br>

## Results

---

- Motion detection range up to 36 feet
- Successfully sending messages with different degree of motions between base station and endpoints wirelessly
- Ability to distinguish people from the environment by modified Python Code
- Work independently without third party service provider

<div class="row mt-3 mb-3 col-sm-6 mx-auto">
    {% include figure.liquid loading="eager" path="/assets/img/radarsecurity/output_sample.png" class="img-fluid rounded z-depth-1" zoomable=true %}
</div>

By using radar sensor and modified Python code base on motion behavior method, the product was able to detect motion, minimized fault alerts between human motions and environment factors. The project may be continued with the following feature additions:

- Multiple endpoints for indoor and outdoor use
- Phone notification
- 10-bit LED display

<br>

#### References

---

[1] M. Maya, “Internet of Things: A Deeper Dive in Your Privacy and Information,” 2020.

[2] S. Akter, R. A. Sima, M. S. Ullah, and S. A. Hossain, “Smart Security Surveillance using IoT,” 2018, pp. 659–663, doi: 10.1109/ICRITO.2018.8748703.

[3] Y. Bai, C. Cheng and Z. Xie, "Use of ultrasonic signal coding and PIR sensors to enhance the sensing reliability of an embedded surveillance system," 2013 IEEE International Systems Conference (SysCon), 2013, doi: 10.1109/SysCon.2013.6549895.
