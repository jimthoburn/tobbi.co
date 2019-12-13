---
title: How to improve UX for images while they’re loading on the web
date: 2019-12-06 12:00:00 -07:00
image: /images/writing/2019-12-06-improve-ux-for-images-while-loading-on-the-web/2048-wide/wildflowers.jpg
---

<style>
img {
  max-width: 100%;
  height: auto;
}
[class*="language"] {
  max-width: 100%;
  overflow: auto;
}
</style>

Here are a few ways you can improve the experience a user has while images are loading on your web site or application.

* Load images lazily
* Give images an intrinsic size
* Have a variety of image sizes available for differently sized screens
* Show a preview of each image
* Make image descriptions available

You can see a [demo of these techniques](https://pictures.tobbi.co/wildflowers/) by switching on _network throttling_ in the developer tools for [Firefox](https://developer.mozilla.org/en-US/docs/Tools/Network_Monitor/Throttling) or [Chrome](https://developers.google.com/web/tools/chrome-devtools/network/), and then visiting this URL:

[Wildflowers of Joshua Tree, image loading demo](https://pictures.tobbi.co/wildflowers/)

![Network throttling in the developer tools for Firefox](/images/writing/2019-12-06-improve-ux-for-images-while-loading-on-the-web/2048-wide/network-throttle.png)

## Load images lazily

This technique involves only loading images if they’re within the viewport or likely to be within the viewport the next time the user scrolls up or down. It’s super useful when applied to a list of images where only a few are visible at a time.

This may make the first few images a user is looking at load more quickly–particularly on a slow connection. It may also save bandwidth and some dollars for users of your web product.

You can easily begin using the lazy loading technique, now that it’s built into the web platform:
 
[Native Lazy Loading on CSS Tricks](https://css-tricks.com/native-lazy-loading/)

```html
<img loading="lazy" />
```

And if it’s not yet implemented in a browser that you feel is important to your audience, you can manually apply the technique by following a guide like this one, from Google:

[Lazy Loading Images and Video, Web Fundamentals by Google](https://developers.google.com/web/fundamentals/performance/lazy-loading-guidance/images-and-video/)

## Give images an [intrinsic](https://twitter.com/jensimmons/status/980980521848127488) size

This will help browsers to lay out the page completely while the images are still loading, since it will know how wide and tall each image should be.

[Mapping the width and height attributes of media container elements to their aspect-ratio, MDN Web Docs by Mozilla](https://developer.mozilla.org/en-US/docs/Web/Media/images/aspect_ratio_mapping)

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

## Have a variety of image sizes available for differently sized screens

Similar to lazy loading, this will make images load noticeably faster on slow connections and saves bandwidth for users and servers (and perhaps also some dollars for your audience and yourself).

[Responsive images, MDN Web Docs by Mozilla](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images)

```html
<img srcset="
  /images/500-wide/wildflowers.jpg 500w,
  /images/1000-wide/wildflowers.jpg 1000w,
  /images/1500-wide/wildflowers.jpg 1500w
" />
```

You can use a tool like [GraphicsMagick](https://github.com/topics/graphicsmagick) to automatically generate differently sized images. Or you can use a service like [Netlify Large Media](https://www.netlify.com/products/large-media/).

## Show a preview of each image

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

![A blurry preview image with a variety of colors](/images/writing/2019-12-06-improve-ux-for-images-while-loading-on-the-web/2048-wide/image-preview.png)

![The original image](/images/writing/2019-12-06-improve-ux-for-images-while-loading-on-the-web/2048-wide/image-loaded.png)

## Make a description available for each image

Adding an image description using the [_alt_ attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Img) will help users who experience your web product with a tool like [Voice Over](http://www.apple.com/accessibility/voiceover/). It may also improve the visual experience, since most browsers display the description while the image is loading.

```html
<img alt="A lush group of plants with purple flowers, growing in the sunshine" />
```

![Alternate text displayed on top of an image, loading on a web page](/images/writing/2019-12-06-improve-ux-for-images-while-loading-on-the-web/2048-wide/description.png)

If you have a lot of images, you may be able to get a head start writing descriptions by using something like [machine learning](https://stackoverflow.com/questions/44929055/generate-meaningful-image-description-based-on-image-labels). (I haven’t done this before myself, but would really like to try it!)

## An example project

Here’s a project on GitHub that makes use of each of these techniques, that you can use a reference or starting point:

[Picture Gallery 🖼 ✨ on GitHub](https://github.com/jimthoburn/picture-gallery)

The project also contains example code for automatically [generating images](https://github.com/jimthoburn/picture-gallery/blob/master/create/images.js) and [_width_ and _height_](https://github.com/jimthoburn/picture-gallery/blob/master/create/albums.js) data.

## More tips

There are, no doubt, many more ways to improve the user experience while loading images on the web. If you have a tip I didn’t mention or an easier way of accomplishing any of the ideas above, please [feel free to comment](https://dev.to/jimthoburn/how-to-improve-ux-for-images-while-they-re-loading-on-the-web-3b12#comments). 🙂

<div style="margin-top: 3em"></div>

_This article is also published on [Dev](https://dev.to/jimthoburn/how-to-improve-ux-for-images-while-they-re-loading-on-the-web-3b12)._
