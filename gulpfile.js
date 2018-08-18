// https://github.com/gulpjs/gulp
const gulp = require('gulp');

// https://www.npmjs.com/package/gulp-image-resize
const imageResize = require('gulp-image-resize');

const parallel = require("concurrent-transform");
const os = require("os");

const SIZES = [
  384,
  512,
  768,
  1024,
  1536,
  2048
];
const FOLDER_NAMES = [
  "ctzn-app",
  "fahrenheit",
  "food-oasis",
  "good",
  "good-community",
  "good-fest",
  "grand-park",
  "jj-burns",
  "kiva",
  "ok-the-store",
  "la2050"
];

function generateImages(size, imagePath) {
  console.log('generateImages: ' + size + ' :: ' + imagePath);
  gulp.src(imagePath + "/original/*.{jpg,png}")
    .pipe(parallel(
      imageResize({ width : size }),
      os.cpus().length
    ))
    .pipe(gulp.dest(imagePath + "/" + size + "-wide"))
    .on('end', generateNext);
}

let nextCursor = 0;
let nextImagePath;
function generateNext() {
  if (nextCursor < SIZES.length) {
    console.log('generateNext: ' + nextCursor + ' :: ' + SIZES[nextCursor] + ' :: ' + nextImagePath);
    generateImages(SIZES[nextCursor], nextImagePath);
    nextCursor++;
  } else {
    generateNextFolder();
  }
}

let nextFolderCursor = 0;
function generateNextFolder() {
  if (nextFolderCursor < FOLDER_NAMES.length) {
    console.log('generateNextFolder: ' + nextFolderCursor + ' :: ' + FOLDER_NAMES[nextFolderCursor]);

    nextCursor = 0;
    nextImagePath = `images/${ FOLDER_NAMES[nextFolderCursor] }`;
    generateNext();

    nextFolderCursor++;
  }
}

gulp.task("default", function() {
  nextFolderCursor = 0;
  generateNextFolder();
});
