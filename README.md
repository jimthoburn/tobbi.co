# tobbi.co

This is my personal web site: https://tobbi.co

## How to make changes

The website is published with [GitHub Pages](https://pages.github.com), and the files are generated with [Jekyll](http://jekyllrb.com).

As you make changes and commit/push them to GitHub, the [website](https://tobbi.co) will automatically update.

If you want to see a preview of your changes while you work, you can [run a Jekyll server](https://jekyllrb.com) on your local machine. [Installing Ruby and Jekyll](https://jekyllrb.com/docs/installation/) is a good place to start.

After you have Jekyll installed, you can clone this project with [Git](https://git-scm.com) or [GitHub Desktop](https://desktop.github.com)…

```
git clone https://github.com/jimthoburn/tobbi.co.git
```

And then start running the Jekyll application like this...

```
jekyll serve
```

## Using brower-sync

I’m using [Node.js](https://nodejs.org) and [browser-sync](https://www.browsersync.io) to see changes without refreshing my browser, and to make it easy to use *https* locally. If you’d like to do that as well, here are some steps you can follow…

1. Install [Node.js and NPM](https://nodejs.org/en/download/).

2. Install this project’s dependencies...

```
npm install
```

3. Start the application…

```
npm start
```

Note that you’ll need to run jekyll as well, in a separate terminal window.

```
jekyll build --watch
```

## To regenerate the images

1. Install [Node.js and NPM](https://nodejs.org/en/download/).

2. Install this project’s dependencies...

```
npm install
```

3. Run the command…

```
npm run generate-images
```
