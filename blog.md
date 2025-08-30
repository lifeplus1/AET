---
layout: default
title: Blog - Ascension Energy Technologies
permalink: /blog/
---

## Blog: Exploring Energy Technologies and Consciousness

Welcome to our educational blog, where we explore the fascinating intersection of science, energy technologies, and consciousness. From historical discoveries to cutting-edge theories, these posts are designed to inform, inspire, and encourage hands-on exploration.

## Search Our Posts

<div class="search-container">
  <input type="text" id="search-input" placeholder="Search blog posts...">
  <div id="search-results"></div>
</div>

## Filter by Category

<div class="category-filter">
  <button class="filter-btn active" data-category="all">All Posts</button>
  <button class="filter-btn" data-category="Quantum Phenomena">Quantum Phenomena</button>
  <button class="filter-btn" data-category="Energy Technologies">Energy Technologies</button>
  <button class="filter-btn" data-category="Consciousness Studies">Consciousness Studies</button>
  <button class="filter-btn" data-category="Historical Discoveries">Historical Discoveries</button>
</div>

## All Blog Posts

<div class="posts-grid">
  {% for post in site.posts %}
    <article class="post-card" data-category="{{ post.category }}">
      <header class="post-card-header">
        <h2><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h2>
        <div class="post-meta">
          <time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%B %d, %Y" }}</time>
          {% if post.category %}
            <span class="post-category">{{ post.category }}</span>
          {% endif %}
        </div>
      </header>

      <div class="post-excerpt">
        {{ post.excerpt | strip_html | truncatewords: 50 }}
      </div>
      
      <footer class="post-card-footer">
        <a href="{{ post.url | relative_url }}" class="read-more">Read Full Post →</a>
      </footer>
    </article>
  {% endfor %}
</div>

{% if site.posts.size == 0 %}
<div class="no-posts">
  <p>Blog posts are coming soon! Check back for insights into energy technologies, consciousness studies, and much more.</p>
</div>
{% endif %}

## Explore Related Topics

Interested in putting theory into practice? Visit our [Store](/store) to explore tools and technologies that complement these blog topics, including:

- [Rodin Coils](/store/rodin-coil) for electromagnetic experimentation
- [Crystals](/store/crystals) for vibrational studies  
- [Ascension Tools](/store/ascension-tools) for advanced energy work

<script src="{{ '/assets/js/search.js' | relative_url }}"></script>
<script src="{{ '/assets/js/filter.js' | relative_url }}"></script>
