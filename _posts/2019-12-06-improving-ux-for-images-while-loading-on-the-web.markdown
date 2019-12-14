---
title: Improving UX for images while they’re loading on the web
date: 2019-12-06 12:00:00 -07:00
image: /images/writing/2019-12-06-improving-ux-for-images-while-loading-on-the-web/2048-wide/wildflowers.jpg
---

This article is about a few different ways that you can improve the experience that someone has while they’re waiting for the images to load on your web site or application.

You can see a demo of these techniques by switching on [network throttling](https://developer.mozilla.org/en-US/docs/Tools/Network_Monitor/Throttling) in the developer tools for Firefox or Chrome, and then visiting this wildflower picture gallery:

[Wildflowers of Joshua Tree (demo)](https://pictures.tobbi.co/wildflowers/)

<figure markdown="1">
[![Network throttling in the developer tools for Firefox](/images/writing/2019-12-06-improving-ux-for-images-while-loading-on-the-web/2048-wide/network-throttle.png)](https://pictures.tobbi.co/wildflowers/51-mastodon-peak/)
</figure>

There are five ideas suggested here, but don’t feel like you have to use all of them! Some will be way more useful in certain contexts (especially _lazy loading_), and implementing even just one can make a big difference. In general, these techniques are useful for large images, long lists of images, and images that affect the layout of a web page.

1. [Loading images lazily](#lazy-loading)
2. [Giving images an intrinsic size](#intrinsic-sizing)
3. [Making a variety of image sizes available for differently sized screens](#responsive-images)
4. [Showing a preview of each image](#image-preview)
5. [Making image descriptions available](#image-description)

<h2 id="lazy-loading">Loading images lazily</h2>

This technique involves only loading images if they’re within the viewport or likely to be within the viewport the next time the user scrolls up or down. It’s super useful when applied to a list of images, where only a few are visible at a time.

This should make the first few images a user is looking at load more quickly–particularly on a slow connection. It may also save bandwidth and some dollars for users of your web product.

You can easily begin using the lazy loading technique, now that it’s built into the web platform:

[Native Lazy Loading on CSS Tricks](https://css-tricks.com/native-lazy-loading/)

```html
<img loading="lazy" />
```

And if it’s not yet implemented in a browser that you feel is important to your audience, you can manually apply the technique by following a guide like this one, from Google:

[Lazy Loading Images and Video, Web Fundamentals by Google](https://developers.google.com/web/fundamentals/performance/lazy-loading-guidance/images-and-video/)

<h2 id="intrinsic-sizing">Giving images an <a href="https://twitter.com/jensimmons/status/980980521848127488">intrinsic</a> size</h2>

This will help browsers to lay out the page completely while the images are still loading, since it will know how wide and tall each image should be. Basically all you have to do is add a `width` and `height` attribute to each image and the browser will take care of the rest. You can learn more about it with this guide from Mozilla:

[Media container elements and aspect-ratio, by Mozilla](https://developer.mozilla.org/en-US/docs/Web/Media/images/aspect_ratio_mapping)

```html
<img width="1500" height="1000" />
```

```css
img {
  max-width: 100%;
  height: auto;

  /* Browsers like Firefox now have a default rule like this one
    (so you don’t have to write this line, but it looks neat!) */
  aspect-ratio: attr(width) / attr(height); 
}
```

If you have a lot of images, you can use a tool like [node-exif](https://www.npmjs.com/package/exif) to automatically make the image sizes available to you as data.

```json
"exif": {
  "ExifImageWidth": 1500,
  "ExifImageHeight": 1000
}
```

<h2 id="responsive-images">Making a variety of image sizes available for differently sized screens</h2>

Similar to lazy loading, this will make images load noticeably faster on slow connections and saves bandwidth for users and servers–and potentially some dollars for your audience and yourself.

You can get started by adding a `srcset` attribute to your image element and giving it a few image sizes at different widths. If you want to go further, adding a `sizes` attribute can make a big difference in download size too.

```html
<img
  src="
    /images/500-wide/wildflowers.jpg"
  srcset="
    /images/500-wide/wildflowers.jpg 500w,
    /images/1000-wide/wildflowers.jpg 1000w,
    /images/1500-wide/wildflowers.jpg 1500w"
  sizes="
    (min-width: 35em) 50vw,
    100vw"
/>
```

The `srcset` attribute above is basically saying to the browser, “Hey! I have three different images for you to choose from, ranging from 500 pixels wide to 1,500 pixels wide. Please choose whichever one is best for your viewport size and device pixel ratio.”

And the `sizes` attribute is saying, “I’ve included a CSS layout for this page that makes images either 50 or 100 percent of the viewport width, depending on how wide the viewport is. Please consider this information too when you choose one of the `srcset` images. I’m telling you this information now–since you’re awesome and you have a [lookahead preparser](https://cloudfour.com/thinks/the-real-conflict-behind-picture-and-srcset/) that needs this information to be stored in the HTML.”

```css
img {
  width: 100vw;
  height: auto;
}

@media (min-width: 35em) {
  img {
    width: 50vw;
  }
}
```

Be sure to keep the `src` attribute that you already have on the `img` element. This will provide a default image for browsers that don’t understand the `srcset` syntax. Any size image will be a good choice–even a big one. (Modern browsers will skip the `src`image and download a potentially smaller image from the `srcset` instead.)

If you have a lot of images, you can use a tool like [GraphicsMagick](https://github.com/topics/graphicsmagick) to automatically generate differently sized images. Or you can use a service like [Netlify Large Media](https://www.netlify.com/products/large-media/).

You can learn more in the [Responsive Images](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images) guide from Mozilla or by listening to this [Implementing Responsive Images](https://thewebahead.net/99) podcast with Jen Simmons and Jason Grigsby.

<h2 id="image-preview">Showing a preview of each image</h2>

This practice is about making images _appear_ to load faster, by showing a colorful preview of each image while it’s loading.

[The “Blur Up” Technique for Loading Background Images on CSS Tricks](https://css-tricks.com/the-blur-up-technique-for-loading-background-images/)

If you’re already creating differently sized images for use in the [responsive images](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images) technique, you can easily generate one more tiny sized image for use as a preview. I found that a 16 pixel wide image works well–especially after it’s optimized with a tool like [ImageOptim](https://imageoptim.com).

Once you have your tiny images, you can embed them directly in the HTML for your page using [data URLs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs).


```html
<img class="preview" src=" data:image/jpeg;base64,/9j…EKyONpWJGxwSAuDj5qPEXQxv/9k=" />
<img src="/images/wildflowers.jpg" />
```

```css
img.preview {
  filter: blur(100px);
}
```

<figure markdown="1">
![A blurry preview image with a variety of colors](/images/writing/2019-12-06-improving-ux-for-images-while-loading-on-the-web/2048-wide/image-preview.png)
</figure>

<figure markdown="1">
![The original image](/images/writing/2019-12-06-improving-ux-for-images-while-loading-on-the-web/2048-wide/image-loaded.png)
</figure>

<h2 id="image-description">Making image descriptions available</h2>

Most browsers display the description stored in the [_alt_ attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Img) while the image is loading.

```html
<img alt="A lush group of plants with purple flowers, growing in the sunshine" />
```

<figure markdown="1">
![Alternate text displayed on top of an image, loading on a web page](/images/writing/2019-12-06-improving-ux-for-images-while-loading-on-the-web/2048-wide/description.png)
</figure>

Descriptions are also super important and helpful for people who experience your web product using tools like [Voice Over](http://www.apple.com/accessibility/voiceover/).

If you have a lot of images, you may be able to get a head start writing descriptions by using something like [machine learning](https://stackoverflow.com/questions/44929055/generate-meaningful-image-description-based-on-image-labels). (I haven’t done this before myself, but would really like to try it!)

## An example project

Here’s a project on GitHub that makes use of each of these techniques, that you can use a reference or starting point:

[Picture Gallery 🖼 ✨ on GitHub](https://github.com/jimthoburn/picture-gallery)

The project also contains example code for automatically [generating images](https://github.com/jimthoburn/picture-gallery/blob/master/create/images.js) and [_width_ and _height_](https://github.com/jimthoburn/picture-gallery/blob/master/create/albums.js) data.

## More tips

There are, no doubt, many more ways to improve the user experience while loading images on the web. If you have a tip I didn’t mention or an easier way of accomplishing any of the ideas above, please [feel free to comment](https://dev.to/jimthoburn/how-to-improve-ux-for-images-while-they-re-loading-on-the-web-3b12#comments). 🙂

<div style="margin-top: 3em"></div>

_This article is also published on [Dev](https://dev.to/jimthoburn/how-to-improve-ux-for-images-while-they-re-loading-on-the-web-3b12)._
