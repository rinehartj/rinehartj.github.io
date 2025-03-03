---
layout: page
title: Hexacopter Drone
description: 6 arms, 11.52kg motor thrust
img: assets/img/hexacopter.jpg
importance: 1
category: fun
related_publications: false
---

This self-built drone is meant to lift heavy payloads like a DSLR camera or delivery parcel. With six arms, it is capable of a surviving a single motor failure.

# Specifications

---

<div class="row mt-3">
    <div class="col-sm-6 mt-3 mt-md-0">
    {% capture markdown_content %}

### Body

| **Body Kit** | Tarot 680 Pro |
| **Arms** | Six (6) |
| **Materials** | Carbon Fiber, Aluminum |

<br>

### Motors and ESCs

| **Motor Count** | Six (6) |
| **Motor Type** | Brushless |
| **Max Thrust** | 1920g per motor |
| **KV Rating** | 380 KV |
| **ESC** | 40A max continuous |

    {% endcapture %}

    {{ markdown_content | markdownify }}

    </div>
    <div class="col-sm-6 mt-3 mt-md-0">
    {% capture markdown_content %}

### Radios

| **Telemetry Modem** | RFD900X |
| **RC Link** | TBS Crossfire RX 12ch |
| **Video Transmitter** | Generic 1W 5.8GHz VTX |

<br>

### Flight Computer

| **Flight Computer** | Pixhawk Cube |

<br>

### Power Management

| **Power Distribution Board** | Kore Carrier Board |

    {% endcapture %}

    {{ markdown_content | markdownify }}
    </div>

</div>

<br>

# Images

---

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/hexacopter/drone_top.jpg" title="Top of drone" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/hexacopter/drone_bottom.jpg" title="Bottom of drone" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/hexacopter/drone_arm.jpg" title="arm of drone" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
</div>
