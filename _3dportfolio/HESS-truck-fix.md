---
layout: 3d_model
title: HESS Truck Trailer Pivot Replacement Part
date: 2025-12-14
description: a 3D-printed replacement part to fix a 1990s-era HESS truck with a broken trailer.
img: /assets/img/3d/HESS-truck-fix.webp
model: /assets/3d/HESS-truck-fix.glb
importance: 1
tags: [3D print]

specifications:
  - label: Date
    value: 2025
---

This 3D-printed component was designed to fix a HESS truck with a broken trailer that belonged to me since I was a kid. Wires were exposed which could have lead to further damage if not fixed.

After disassembly, I found half of the broken piece—it looked like a cylinder with pieces joined to it at the end to hold the trailer to the cabin. I measured its dimensions with a caliper and extrapolated dimensions to re-create the missing side of the piece.

This model incorporates two design features that allow it to integrate seamlessly into the truck. First, it uses a snap-fit fastener design. The part is pushed into the existing hole, and the chamfered edges cause the sides to compress inward. Once through the hole, the part springs back and locks into place. Second, a notch runs along the entire length of the part to allow 1mm-diameter wires to pass through, enabling the wires to travel through the pivot point.

The part was printed on its side so that its strength would be on the same plane as the pinching action.

<div class="col-sm-8 mt-3 mt-md-0 mx-auto">
    {% include figure.liquid loading="eager" path="/assets/img/HESS-truck-fix/HESS-truck-fix-slicer.png" class="img-fluid rounded z-depth-1" zoomable=true %}
    <div class="caption">
        Part in the 3D-print slicer (Cura). Red is the part itself, cyan is support material.
    </div>
</div>

Below is a photo of the truck after the part (not visible) was installed.

<div class="col-sm-12 mt-3 mt-md-0 mx-auto">
    {% include figure.liquid loading="eager" path="/assets/img/HESS-truck-fix/HESS-truck-fix-reallife.jpg" class="img-fluid rounded z-depth-1" zoomable=true %}
    <div class="caption">
        Photograph of the fixed HESS truck.
    </div>
</div>
