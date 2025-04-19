// shape arrays
let circles = [];
let triangles = [];
let rects = [];
// shape variables
let circleAmount = 0;
let triangleAmount = 0;
let rectAmount = 0;
// mousetrail
let trail = [];

// setup
window.setup = function setup() {
  createCanvas(800, 600);
  generateShapes();
}

//  draw
window.draw = function draw() {
  background(220);
  stroke(1);
  showShapes();
  mouseTrail();
}

//  generate shapes
function generateShapes() {
  // generate random shape amount variables
  circleAmount = random(200);
  triangleAmount = random(200);
  rectAmount = random(200);

  // circle random for loop generation
  for (let i = 0; i < circleAmount; i++) {
    circles.push({
      x: random(width),
      y: random(height),
      r: random(20, 100),
      c: color(random(255), random(255), random(255)),
    });
  }

  // triangle random for loop generation
  for (let i = 0; i < triangleAmount; i++) {
    triangles.push({
      x: random(width),
      y: random(height),
      z: random(width),
      a: random(height),
      b: random(width),
      c: random(height),
      d: color(random(255), random(255), random(255)),
    });
  }

  // rectangle random for loop generation
  for (let i = 0; i < rectAmount; i++) {
    rects.push({
      x: random(width),
      y: random(height),
      z: random(width),
      a: random(height),
      c: color(random(255), random(255), random(255)),
    });
  }
}

// making the shapes visible
function showShapes() {
  // rectangle drawing
  for (let r of rects) {
    fill(r.c);
    rect(r.x, r.y, r.z, r.a);
  }

  // circle drawing
  for (let c of circles) {
    fill(c.c);
    ellipse(c.x, c.y, c.r*2, c.r*2);
  }

  // triangle drawing
  for (let t of triangles) {
    fill(t.d);
    triangle(t.x, t.y, t.x + t.a, t.y, t.x + t.b, t.y + t.z);
  }
}

// reseting shapes when pressing backspace
function resetShapes() {
  circles = [];
  triangles = [];
  rects = [];

  generateShapes();
  showShapes();
}

// mousetrail
function mouseTrail() {
  noStroke();
  // pushes the X and Y position of the mouse to the array as to store the position
  trail.push({ x: mouseX, y: mouseY });
  // for loop as to generate the trail
  for (let i = 0; i < trail.length; i++) {
    // calculates the opacity for each circle of the trail
    let alpha = map(i, 0, trail.length, 255, 0);
    // fills the circle with the calculated opacity
    fill(alpha, 0, 0);
    // draws the circle/ellipse at the position of the mouse
    ellipse(trail[i].x, trail[i].y, 10, 10);
  }
  // if the amount of circles in the trail is longer than 50 remove the first circle in the array
  if (trail.length > 50) {
    trail.splice(0, 1);
  }
}

window.keyPressed = function keyPressed() {
  // call the resetShape function when pressing backspace
  if (key === 'Backspace') {
    resetShapes();
  }
}