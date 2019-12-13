---
title: Writing
---

Writing
===========

<ol>

{% for post in site.posts %}

<li>
  <h2><a href="{{ post.url }}">{{ post.title }}</a></h2>
  <p class="author">
    Posted on {{ post.date | date: "%B %-d, %Y" }}
  </p>

  <p>
    {{ post.excerpt | remove: '<p>' | remove: '</p>' }}…
    <a class='more' href='{{ post.url }}'>Read More</a>
  </p>
</li>

{% endfor %}

</ol>
