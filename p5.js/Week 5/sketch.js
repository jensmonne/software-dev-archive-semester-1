// variables
let imgs = [];
let pixelArrays = [];
let currentIndex = 0;
let button;

// preload function to load images
function preload() {
  // load images and push them to the imgs array
  imgs.push(loadImage('assets/bill.png'));
  imgs.push(loadImage('assets/billfury.png'));
  imgs.push(loadImage('assets/doritobill.png'));
  imgs.push(loadImage('assets/bt.png'));
}

// setup function
function setup() {
  // create the canvas
  createCanvas(640, 480);

  pixelArrays = [];

  // loop through each image in the imgs array
  for (let i = 0; i < imgs.length; i++) {
    // create a new pixel array for each image
    let pixelArray = [];

    // load the pixels of the current image
    imgs[i].loadPixels();

    // loop through each pixel of the image
    for (let y = 0; y < imgs[i].height; y++) {
      // create a new row in the pixel array
      pixelArray.push([]);
      for (let x = 0; x < imgs[i].width; x++) {
        // calculate the index of the pixel in the pixels array
        let index = (y * imgs[i].width + x) * 4;

        // get the rgb and transparency of each pixel
        let r = imgs[i].pixels[index];
        let g = imgs[i].pixels[index + 1];
        let b = imgs[i].pixels[index + 2];
        let a = imgs[i].pixels[index + 3];

        // if the alpha component is 0, set the pixel to null (transparent)
        if (a === 0) {
          pixelArray[y].push(null);
        } else {
          // otherwise create a color object and push it to the pixel array
          pixelArray[y].push(color(r, g, b));
        }
      }
    }
    // push the pixel array to the pixelArrays array
    pixelArrays.push(pixelArray);
  }

// create a button to go through images
button = createButton('Next Image');
button.position(10, 10);
// call the nextImage function when the button is pressed
button.mousePressed(nextImage);
}

// draw function to show the current image
function draw() {
// animated background
let r = map(sin(frameCount * 0.01), -1, 1, 0, 255);
let g = map(cos(frameCount * 0.01), -1, 1, 0, 255);
let b = map(sin(frameCount * 0.02), -1, 1, 0, 255);
background(r, g, b);

// set the image in the middle of the canvas
let offsetX = (width - imgs[currentIndex].width) / 2;
let offsetY = (height - imgs[currentIndex].height) / 2;

// loop through each pixel of the current image
for (let y = 0; y < imgs[currentIndex].height; y++) {
  for (let x = 0; x < imgs[currentIndex].width; x++) {
    // get the color of the current pixel
    let c = pixelArrays[currentIndex][y][x];
    
    // if the pixel is not transparent draw a rectangle
    if (c !== null) {
      fill(c);
      noStroke();
      rect(x + offsetX, y + offsetY, 1, 1);
    }
  }
}
}

// function to go to the next image
function nextImage() {
// add to the current index reset to 0 if it reaches the end of the array
currentIndex = (currentIndex + 1) % imgs.length;
}