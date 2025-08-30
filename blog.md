---
layout: default
title: Blog - Ascension Energy Technologies
permalink: /blog/
---

<div class="blog-header">
  <h1>Blog: Exploring Energy Technologies and Consciousness</h1>
  
  <div class="blog-intro">
    <p>Welcome to our educational blog, where we explore the fascinating intersection of science, energy technologies, and consciousness. From historical discoveries to cutting-edge theories, these posts are designed to inform, inspire, and encourage hands-on exploration.</p>
  </div>
</div>

<section class="blog-controls">
  <h2>Search Our Posts</h2>
  <div class="search-container">
    <input type="text" id="search-input" placeholder="Search blog posts..." aria-label="Search blog posts">
    <div id="search-results" role="region" aria-live="polite"></div>
  </div>

  <h2>Filter by Category</h2>
  <div class="category-filter" role="group" aria-label="Filter posts by category">
    <button class="filter-btn active" data-category="all" aria-pressed="true">All Posts</button>
    <button class="filter-btn" data-category="Quantum Phenomena" aria-pressed="false">Quantum Phenomena</button>
    <button class="filter-btn" data-category="Energy Technologies" aria-pressed="false">Energy Technologies</button>
    <button class="filter-btn" data-category="Consciousness Studies" aria-pressed="false">Consciousness Studies</button>
    <button class="filter-btn" data-category="Historical Discoveries" aria-pressed="false">Historical Discoveries</button>
  </div>
</section>

<section class="blog-posts">
  <h2>All Blog Posts</h2>
  
  <div class="posts-grid" role="main">
    {% for post in site.posts %}
      <article class="post-card" data-category="{{ post.category }}">
        <header class="post-card-header">
          <h3><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
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
</section>

## Explore Related Topics

Interested in putting theory into practice? Visit our [Store]({{ '/store' | relative_url }}) to explore tools and technologies that complement these blog topics, including:

- [Rodin Coils]({{ '/store/rodin-coil' | relative_url }}) for electromagnetic experimentation
- [Crystals]({{ '/store/crystals' | relative_url }}) for vibrational studies  
- [Ascension Tools]({{ '/store/ascension-tools' | relative_url }}) for advanced energy work

<script src="{{ '/assets/js/search.js' | relative_url }}"></script>
<script src="{{ '/assets/js/filter.js' | relative_url }}"></script>
