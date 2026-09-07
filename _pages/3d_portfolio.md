---
layout: default
title: 3D portfolio
permalink: /3d-portfolio/
description: A showcase of my 3D modeling work
nav: true
nav_order: 4
---

<div class="post">
  {% assign portfolio_name_size = page.title | size %}
  {% assign portfolio_description_size = page.description | size %}
  {% if portfolio_name_size > 0 or portfolio_description_size > 0 %}
    <div class="header-bar">
      <h1>{{ page.title }}</h1>
      <h2>{{ page.description }}</h2>
    </div>
  {% endif %}
  {% assign all_tags = site["3dportfolio"] | map: "tags" | join: "," | split: "," | uniq | sort %}
  {% assign has_tags = false %}
  {% for tag in all_tags %}
    {% if tag != "" %}
      {% assign has_tags = true %}
      {% break %}
    {% endif %}
  {% endfor %}
  {% if has_tags %}
    <div class="tag-category-list">
      <ul class="p-0 m-0">
        {% for tag in all_tags %}
          {% if tag != "" %}
            <li>
              <i class="fa-solid fa-hashtag fa-sm"></i> <a href="{{ tag | slugify | prepend: '/3d-portfolio/tag/' | relative_url }}">{{ tag }}</a>
            </li>
            {% unless forloop.last %}
              <p>&bull;</p>
            {% endunless %}
          {% endif %}
        {% endfor %}
      </ul>
    </div>
  {% endif %}

  <ul class="post-list">
    {% assign sorted_models = site["3dportfolio"] | sort: "importance" %}
    {% include 3d_portfolio.liquid models=sorted_models %}
  </ul>

</div>
