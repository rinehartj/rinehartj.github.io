---
layout: distill
title: In-ear Wearable for Blood Oxygen Saturation Monitoring
description: Helps doctors gather data from people with sleep apnea and COPD.
date: 2024-08-20
img: assets/img/oximeter.png
importance: 1
category: academic
related_publications: false

toc:
  - name: Abstract
  - name: Introduction
  - name: Materials and Methods
    subsections:
      - name: Hardware Design
      - name: Software Design
  - name: Testing and Results
  - name: Schematic Sheets
  - name: Discussion
  - name: Conclusion and Future Direction
  - name: Acknowledgements

authors:
  - name: Jason Rinehart
    url: "https://linkedin.com/in/jasonrinehart"
    affiliations:
      name: Wentworth Institute of Technology
  - name: Eva Sebagisha
    url: "https://www.linkedin.com/in/evelyne-sebagisha"
    affiliations:
      name: Wentworth Institute of Technology
  - name: Douglas E. Dow
    url: "https://www.linkedin.com/in/douglas-dow-869ba5181"
    affiliations:
      name: Professor, Wentworth Institute of Technology

bibliography: 2024-08-01-oximeter.bib
---

## Abstract

{% include figure.liquid loading="eager" path="assets/img/oximeter/pcb_render_1.png" class="img-fluid rounded z-depth-1" zoomable=true %}

The oxygen concentration in the blood (SpO2) sustains life. A few minutes of low SpO2 leads to brain damage, organ failure, or death. Low SpO2 occurs in sleep apnea, COPD, or anemia. Pulse oximeters are widely used in clinical practice to measure SpO2 and have been incorporated in some wearable devices. Wearable health devices on the wrist are popular but may lack comfort or accuracy. The location may inhibit one’s activities of daily living (ADL). The ear canal is a promising location. The purpose of our project was to develop and test an earbud-style wearable device to measure SpO2. Experimental results were compared to a commercial oximeter at the fingertip. Software was developed to process the measured sensor signals and calculate SpO2 levels (%) with low latency using Simulink (MathWorks). A printed circuit board (PCB) was designed to employ the simulation. Such a device would improve continual monitoring of SpO2 during ADL, especially for high-risk individuals.

---

## Introduction

Providing healthcare professionals with useful and accurate patient data would improve diagnosis accuracy. Analysis of photoplethysmogram (PPG) measurements provides values for SpO2, including heart rate and respiratory rate. Typically, pulse oximetry is stretched as a spot status while in the clinic to aid in quick health assessments. As such, measurement devices tend to be designed for easily accessible body locations, such as the fingertip and skin surfaces <d-cite key="allen2007photoplethysmography"></d-cite>.

While convenient and timely, these locations are often uncomfortable or impractical for extended periods. Fingertip probes can see sweat buildup, motivating the patient to remove the probe. The fingertip is also difficult to wear when going about activities of daily living (ADL), for example, typing on a keyboard or using hand tools. Skin-worn devices may be less invasive but still be inconvenient when stretching or sleeping.

The ear canal has the potential to provide pulse oximetry accuracy not inferior to the fingertip but more compatible for chronic recording as one goes about ADL <d-cite key="davies2023ear"></d-cite>. The device could be worn in or near the ear as many people wear ear buds for audio listening for extended periods of time.

The objective of our project is to develop and test modules that would be suitable for an ear canal worn pulse oximeter device. Such a product could be ergonomic and suitable for long-term measurements.

---

## Materials and Methods

### Hardware Design

<div class="row mt-3">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/oximeter/wiring_diagram.png" class="img-fluid rounded z-depth-1" zoomable=true %}
        <div class="caption">
            Figure 1 Wiring diagram for the hardware setup.
        </div>
    </div>
    <div class="col-sm-4 mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/oximeter/blockdiagram_hardwaresetup.png" class="img-fluid rounded z-depth-1" zoomable=true %}
        <div class="caption">
            Figure 2 Block diagram of the hardware setup.
        </div>
    </div>
</div>

A hardware setup was designed both as a learning tool and as a foundation for the later development of a pulse oximetry algorithm. The SparkFun Qwiic MAX30101 Breakout board (Boulder, CO, U.S.) was a commercially available product which served as the basis of this setup. The board contained the PPG as well as supporting electronics for I2C communication.

Red and infrared data channels from the sensor needed to be retrieved for processing. The Raspberry Pi Pico (Cambridge, England, UK) microcontroller board was selected for its support of I2C and serial communication as well as ease of use. It was programmed using the Arduino IDE (Somerville, MA, U.S.) to acquire reflectance data from the memory registers of the MAX30101 and print to serial port. Data was then able to be read by computer software, including Arduino Serial Monitor and MATLAB.

### Software Design

A new simulation was designed from the equations for pulse oximetry found by Rusch et. al. 1996 <d-cite key="rusch1996signal"></d-cite>

<!-- prettier-ignore-start -->
\begin{equation}
\text{SpO}_2 = 107 - 17 \times R
\end{equation}

\begin{equation}
R = \frac{AC_{\text{red}} / DC_{\text{red}}}{AC_{\text{infrared}} / DC_{\text{infrared}}}
\end{equation}
<!-- prettier-ignore-end -->

{% include figure.liquid loading="eager" path="assets/img/oximeter/simulink_blockdiagram.png" class="img-fluid rounded z-depth-1" zoomable=true %}

<div class="caption">
    Figure 3 Simulink simulation of pulse oximeter using MAX30101 PPG.
</div>

The simulation in Fig. 3 was designed using Simulink (MathWorks, Natick, MA). The simulation works as follows,

A measurement was taken approximately every 3 seconds. The maximum and minimum blocks were reset by the square wave generator. Only after at least one cycle of the pulsatile signal are the minimum and maximum values useful for calculating blood oxygen, because one full cycle needed to be observed by the minimum and maximum blocks before their values could calculate the AC component.

The AC components were calculated by subtracting the minimum from the maximum, resulting in the amplitude of the wave.

The DC components were considered as the median of the waveform, although some groups consider the DC component as the minimum of the waveform. To find the median of the waveform, the minimum was subtracted from maximum, the result divided by two, then added back to the minimum.
With the AC and DC components determined, the ratio of ratios could be calculated (2) and then used to calculate blood oxygen (1).

---

## Testing and Results

{% include figure.liquid loading="eager" path="assets/img/oximeter/holdbreath_demo.png" class="img-fluid rounded z-depth-1" zoomable=true %}

<div class="caption">
    Figure 4 Comparison of experimental simulation versus off-the-shelf oximeter.
</div>

**Purpose of Test for Project**: Pulse oximeters are expected to yield data comparable to that of an arterial blood gas measurement (ABG) test. This test involves a blood draw from a patient and compared with simultaneous pulse oximeter readings. This test compares a commercial off-the-shelf oximeter with the experimental system.

**Methods of Test**: Index finger connected to experimental hardware and simulation, middle finger connected to off-the-shelf pulse oximeter. Measurements were conducted simultaneously and synchronized by starting each measurement close to one another. The procedure was to conduct thirty seconds of normal breathing, followed by holding breath for as long as humanly possible, followed by resumed breathing for sixty seconds. A graph was to be generated using MATLAB by first saving both sequences to variables, then plotting those variables on the same figure.

<div class="row mt-3 mb-3">
    <div class="col-sm-6 mx-auto">
        {% include figure.liquid loading="eager" path="assets/img/oximeter/experimental_setup.jpg" class="img-fluid rounded z-depth-1" zoomable=true %}
        <div class="caption">
            Figure 5 Test setup consisting of off-the-shelf oximeter and experimental system.
        </div>
    </div>
</div>

**Number of Trials**: One trial was conducted because holding breath is not exactly an easy task. More trials would be possible and could lead to discrepancies in recorded data.

**Discussion of Test Results for Project**: Fig. 4 suggests that the experimental system readings (red) are within 1% of the commercial oximeter readings (blue) for a blood oxygen level of 96%. However, as levels begin to drop below 96%, the experimental system drifts further and further away from the commercial oximeter. The largest difference was at 145 seconds, when the experimental system read 10% higher than the commercial system.

This phenomenon may be due to the following factors:

- **Inaccurate empirical linear approximation**: The experimental system was modeled using an empirical equation provided by the manufacturer of the pulse oximeter chip, Maxim <d-cite key="analogmax30101"></d-cite>. It is unclear what might cause the pulse oximeter to deviate from the equation provided by the manufacturer, however, it is mentioned that “age, skin tone, overall health, and medical conditions” can affect the accuracy of SpO2 measurements. Further research is needed to investigate whether this equation needs to be adjusted.

- **Inaccurate control**: The commercial oximeter itself claims ±2% on its oximetry readings above 70%. It is thought to not be possible to tune the experimental system to a narrower accuracy window without obtaining a more accurate test product.

These results with the Sparkfun MAX30101 and developed software appear promising. The next stage of development was to design a custom PCB for the MAX30101 that could perform pulse oximetry in a smaller space, such as the ear canal.

---

## Schematic Sheets

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/oximeter/sch1.png" class="img-fluid rounded z-depth-1" zoomable=true %}
        <div class="caption">
            Figure 6 Sensor
        </div>
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/oximeter/sch2.png" class="img-fluid rounded z-depth-1" zoomable=true %}
        <div class="caption">
            Figure 7 DC-DC converter
        </div>
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/oximeter/sch3.png" class="img-fluid rounded z-depth-1" zoomable=true %}
        <div class="caption">
            Figure 8 Voltage regulation
        </div>
    </div>
</div>
<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/oximeter/sch4.png" class="img-fluid rounded z-depth-1" zoomable=true %}
        <div class="caption">
            Figure 9 Logic conversion
        </div>
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/oximeter/sch5.png" class="img-fluid rounded z-depth-1" zoomable=true %}
        <div class="caption">
            Figure 10 Connector
        </div>
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/oximeter/sch6.png" class="img-fluid rounded z-depth-1" zoomable=true %}
        <div class="caption">
            Figure 11 Pull-up resistor
        </div>
    </div>
</div>

A PCB was designed using Altium Designer (La Jolla, CA, U.S.), a software chosen for its robust component libraries and ability to manage and create custom components efficiently. The design process began with creating schematic sheets, which detailed the components used in the design. Components were either imported directly from the manufacturer or built from scratch by creating symbols and PCB footprints, and by downloading data from manufacturers such as Digikey.

Next, the PCB layout file was created, where all components were placed on the board. This file contained the precise location of every physical element in the PCB assembly. To facilitate connections between all components, the design incorporated four layers, with the bottom layer serving as the ground connection. This approach not only facilitated routing but also the placement of vias.

{% include figure.liquid path="assets/img/oximeter/pcb_layout.png" class="img-fluid rounded z-depth-1" zoomable=true %}

<div class="caption">
    Figure 12 2D PCB Layout
</div>

A miniaturized printed circuit board (PCB) was designed specifically for measuring SpO2 within the ear canal utilizing the MAX30101 sensor. The PCB's design was inspired by the schematic provided by SparkFun, the sensor's manufacturer. The SparkFun MAX30101 sensor module's schematic included circuits necessary for the sensor’s functionality. These circuits included the logic level conversion, DC-DC converter, and voltage regulator.

**3D Model**

A 3D model was developed to explore a potentially marketable product. Worn like an earbud, a patient may already be acquainted with the sensation of an in-ear wearable for audio listening devices. The pulse oximetry LED lights could be transmitted to the skin in ear canal adjacent to device, with the light sensor receiving the reflected light. Design for the plastic enclosure of this model was inspired by the Sony WF-1000XM3 wireless earbuds (Sony, Tokyo, Japan). This shell would house the PCB, battery, and contacts with a docking station.

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/oximeter/render_main.png" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/oximeter/render_alt.png" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
</div>
<div class="caption">
    Figure 13 3D Model Renders
</div>

---

## Discussion

During the first 60 seconds, both the experimental and control systems show relatively stable SpO2 readings. The experimental system has more fluctuations. These may suggest issues with signal stability or processing in the experimental setup. When the test subject holds their breath, this leads to a gradual decrease in SpO2 levels indicating a realistic physiological response to holding breath. After the breath-hold phase, the control system shows a rapid recovery in SpO2 levels, returning to baseline values. The experimental system also shows recovery, but the data remains noisy.

The experimental system requires further refinement, including better filtering techniques, hardware adjustments, or algorithmic improvements, to match the performance of established commercial devices.

---

## Conclusion and Future Direction

The proposed simulation and printed circuit board developed in this project have demonstrated the potential to advance the feasibility of in-ear pulse oximetry. By integrating the MAX30101sensor within an earbud style enclosure, this innovative design offers a promising alternative to traditional pulse oximeters, which are often uncomfortable and impractical for continuous monitoring during activities of daily living (ADL).

The device successfully detected and processed SpO2 levels, the experimental results indicated areas requiring further refinement, particularly in reducing noise and fluctuations during critical periods such as reduced oxygen intake. Overall, the development of this in-ear wearable device represents a significant step toward bringing advanced pulse oximetry technology to everyday users. With further improvements in hardware and software to enhance signal stability and accuracy, this technology has the potential to become a valuable tool in both personal health management and clinical settings.

Moving forward, several enhancements can be made to improve the functionality and practicality of the in-ear wearable device for SpO2 monitoring. Biocompatibility testing should be prioritized to ensure that the materials used in the earbud do not cause irritation or allergic reactions during prolonged use. Finally, conducting clinical trials across diverse populations is essential to validate the device’s performance and ensure it meets medical-grade standards. By addressing these areas, the in-ear wearable device could become a valuable tool in both personal health management and clinical practice, offering a convenient and reliable method for continuous SpO2 monitoring.

---

## Acknowledgements

We would like to thank Dr. Xiu Zhai of the School of Engineering at Wentworth Institute of Technology for her guidance. We would like to also thank an anonymous donor via the MEFS fund for financial support that alleviated development costs.
