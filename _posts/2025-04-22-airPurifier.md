---
layout: post
# tags: hardware (shared by multiple files?)
title: "Fixing an air purifier with an obstructed PM sensor"
thumbnail: assets/img/airPurifier/airPurifier_main.jpg
date: 2025-04-22
---

> This article outlines how I fixed a Levoit air purifier with broken automatic function. It didn't automatically ramp up when air was filled with particles. Instead, it always displayed a near-zero particulate matter (PM) count.

Tools I needed: 6x flat-head (common) screwdrivers or butter knives, pressurized air or vacuum.

<div class="row mt-3 mb-3 col-sm-6 mx-auto">
    {% include figure.liquid loading="eager" path="assets/img/airPurifier/airPurifier_main.jpg" class="img-fluid rounded z-depth-1" zoomable=true %}
</div>

1. I removed the filter from the bottom of the unit and turned it upside down to access the screws underneath.

2. I unscrewed the 6x phillips screws and set them aside.

3. I released the 6x plastic tabs that hold the unit together. This can be accomplished with flat-head (common) screwdrivers or butter knives as seen in the following picture.

<div class="row mt-3 mb-3 col-sm-6 mx-auto">
    {% include figure.liquid loading="eager" path="assets/img/airPurifier/airPurifier_screws.jpg" class="img-fluid rounded z-depth-1" zoomable=true %}
</div>

4. With all of the prying devices in place, I pulled up on the plastic to release them. Behold, the unit comes apart and the PM count sensor becomes visible.

5. I unplugged the connector (which I know to be JST-GH from my drone project) from the laser PM count sensor.

<div class="row mt-3 mb-3 col-sm-6 mx-auto">
    {% include figure.liquid loading="eager" path="assets/img/airPurifier/airPurifier_laserbox.jpg" class="img-fluid rounded z-depth-1" zoomable=true %}
</div>

6. I cleaned the fan and wire mesh from any dust covering the sensor using compressed air.

7. I replaced the sensor (as seen below) and reassembled the unit. Make sure to clean the air filter!

<div class="row mt-3 mb-3 col-sm-6 mx-auto">
    {% include figure.liquid loading="eager" path="assets/img/airPurifier/airPurifier_laserbox_2.jpg" class="img-fluid rounded z-depth-1" zoomable=true %}
</div>

This air purifier now operated as normal. Now that the laser PM sensor is able to move air through it, automatic function will be restored.
