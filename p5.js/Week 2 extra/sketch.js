// importing classes
import Cloud from "./classes/Cloud.js";
import Mountain from "./classes/Mountain.js";
import Star from "./classes/Star.js";
import Tree from "./classes/Tree.js";
import Car from "./classes/Car.js";
import Ufo from "./classes/Ufo.js";

// Constants
const MIN_CLOUD_SIZE = 35;
const MAX_CLOUD_SIZE = 55;
const MIN_STAR_SIZE = 5;
const MAX_STAR_SIZE = 15;
const MIN_CLOUD_SPEED = 0.2;
const MAX_CLOUD_SPEED = 1;
const SUN_RADIUS = 100;
const MOON_RADIUS = 75;
const STAR_COUNT = 100;
const CLOUD_COUNT = 5;
const ROAD_WIDTH = 100;
const VERGE_WIDTH = 20;

let gameState = 'menu';

// Variables
let centerX, centerY;
let angle = 0;
let sunX, sunY;
let sunColor;
let moonX, moonY;
let moonColor;
let bgColor;
let colorTransitionRate = 0;
let isDay = false;
let isNight = false;
let stars = [];
let starCount = 0;
let clouds = [];
let mountains = [];
let trees = [];
let cars = [];
let probability = 1 / 60;
let score = 0;
let highScore = 0;
let mousePressedCheck = false;
let mousePressedTimer = 0;
let timer = 20;
let timerBarHeight;
let ufos = [];
let istutorial = false;
let isDevtools = false;
let isInfoholic = false;
let devColor = false;

// setup function
window.setup = function setup() {
  createCanvas(1500, 700);
  frameRate(60);
  centerX = width / 2;
  centerY = height;
  sunColor = color(255, 255, 0);
  moonColor = color(200);

  gameOverSetup();
}

// game over setup function
window.gameOverSetup = function gameOverSetup() {
  bgColor = color(0, 190, 255);

  // clouds
  for (let i = 0; i < random(4, 9); i += 1) {
    let x = random(100, 1400);
    let y = random(30, 400);
    let size = random(MIN_CLOUD_SIZE, MAX_CLOUD_SIZE);
    let speed = random([-1, 1]) * random(MIN_CLOUD_SPEED, MAX_CLOUD_SPEED);

    let cloud = new Cloud(x, y, size, speed);

    clouds.push(cloud);
  }

  // mountains
  for (let i = 0; i < 7; i += 1) {
    let x = random(50, 1300);
    let y = height - 100;
    let size = random(-300, -100);
    let thickness = random(200, 400);
    let color = random(50, 120);

    let mountain = new Mountain(x, y, size, thickness, color);

    mountains.push(mountain);
  }

  // tree
  for (let i = 0; i < 6; i += 1) {
    let x1, y1;
    let overlapping = true;

    while (overlapping) {
      x1 = random(60, 1440);
      y1 = height - 200;
      overlapping = false;

      for (let tree of trees) {
        if (dist(x1, y1, tree.x1, tree.y1) < 50) {
          overlapping = true;
          break;
        }
      }
    }
    let x2 = 70;
    let y2 = height - 200;
    let size = random(10, 20);
    let leaf = 1;
    let green = random(70, 210);

    let tree = new Tree(x1, y1, x2, y2, size, leaf, green);

    trees.push(tree);
  }
}

// draw function
window.draw = function draw() {
  if (gameState === 'menu') {
    drawMenu();
    score = 0;
    highScore = 0;
  }
  if (gameState === 'game') {
    background(bgColor);
    timer -= 1 / 60;
  }
  if (gameState === 'gameOver') {
    drawGameOverMenu();
  }
  if (timer <= 0) {
    timer = 0;
    gameState = 'gameOver';
  }

  stroke(1);

  // Day-night cycle
  if (sunY < centerY) {
    bgColor = lerpColor(bgColor, color(0, 190, 255), colorTransitionRate);
  } else if (moonY < centerY) {
    bgColor = lerpColor(bgColor, color(0, 0, 30), colorTransitionRate);
  } else {
    bgColor = lerpColor(bgColor, bgColor, 0);
  }

  if (angle > PI) {
    isDay = false;
    isNight = true;
    if (angle < PI + 0.01) {
      colorTransitionRate = 0;
    }
  } else {
    isDay = true;
    isNight = false;
    if (starCount === 0) {
      stars = [];
    }
  }

  // Stars
  if (moonY < 500 && starCount < STAR_COUNT) {
    if (frameCount % 30 === 0) {
      let x = random(10, 1490);
      let y = random(10, 590);
      let size = random(MIN_STAR_SIZE, MAX_STAR_SIZE);

      let star = new Star(x, y, size);

      stars.push(star);
      starCount++;
    }
  }

  // Remove stars slowly when the sun rises
  if (isDay && stars.length > 0) {
    if (frameCount % 6 === 0) {
      stars.shift();
      starCount--;
    }
  }

  for (let star of stars) {
    star.show();
  }

  if (angle > TWO_PI) {
    angle = 0;
    colorTransitionRate = 0;
  }

  // Sun-moon cycle
  sunX = centerX - cos(angle) * 600;
  sunY = centerY - sin(angle) * 600;
  moonX = centerX + cos(angle) * 600;
  moonY = centerY + sin(angle) * 600;
  colorTransitionRate += 0.000025;
  angle += 0.001;

  // Sun
  fill(sunColor);
  ellipse(sunX, sunY, SUN_RADIUS);

  // Moon
  fill(moonColor);
  ellipse(moonX, moonY, MOON_RADIUS);

  // Crescent
  noStroke();
  fill(bgColor);
  ellipse(moonX - 20, moonY - 10, MOON_RADIUS);

  for (let cloud of clouds) {
    cloud.update();
    cloud.show();
  }

  for (let mountain of mountains) {
    mountain.show();
  }

  for (let tree of trees) {
    tree.show();
  }

  // Road
  fill(80);
  rect(0, height - ROAD_WIDTH, width, ROAD_WIDTH);

  // road stripes
  for (let i = 0; i < 40; i += 1) {
    fill(255);
    let dist = i * 100;
    rect(dist + 15, 640, 55, 10);
  }

  // verge
  fill(0, 150, 0);
  rect(0, 580, width, VERGE_WIDTH);

  // cars
  if (gameState === 'game' && random(1) < probability) {
    let direction;
    let x;
    let carspeed;
    let y;
    if (random(1) < 0.5) {
      y = height - 110;
      direction = -1;
      x = width;
      carspeed = random(-7, -30);
    } else {
      y = height - 40;
      direction = 1;
      x = -100;
      carspeed = random(7, 30);
    }
    let windowPos = direction === -1 ? 10 : 0;
    let frameColor = color(random(255), random(255), random(255));
    let windowColor = color(random(255), random(255), random(255));
    let wheelColor = color(random(50, 130));

    let car = new Car(x, y, carspeed, 0, frameColor, windowColor, wheelColor, windowPos, cars);
    cars.push(car);
  }

  for (let i = cars.length - 1; i >= 0; i--) {
    let car = cars[i];
    car.update();
    car.show();

    if (mousePressedCheck === true && dist(mouseX, mouseY, car.x + 50, car.y) < 50) {
      score += car.scoreValue;
      car.remove = true;
      timer += 0.7;
    }

    if (car.x < -100 || car.x > width + 100) {
      car.remove = true;
    }
  }

  // remove cars
  for (let i = cars.length - 1; i >= 0; i--) {
    if (cars[i].remove) {
      cars.splice(i, 1);
    }
  }

  // ufo's
  if (gameState === 'game' && random(1) < 1 / 3000) {
    let direction;
    let x;
    let ufoSpeed;
    let y;
    y = random(100, 400);
    if (random(1) < 0.5) {
      direction = -1;
      x = width + 50;
      ufoSpeed = random(-15, -30);
    } else {
      direction = 1;
      x = -100;
      ufoSpeed = random(15, 30);
    }

    let scoreValue = 100;
    let ufo = new Ufo(x, y, ufoSpeed, scoreValue);
    ufos.push(ufo);
  }

  for (let i = ufos.length - 1; i >= 0; i--) {
    let ufo = ufos[i];
    ufo.update();
    ufo.show();

    if (mousePressedCheck === true && dist(mouseX, mouseY, ufo.x + 50, ufo.y) < 50) {
      score += ufo.scoreValue;
      ufo.remove = true;
      timer += 5;
    }

    this.x += this.speed;
    if (this.x < -100 || this.x > width + 100) {
      this.remove = true;
    }
  }

  // remove UFOs
  for (let i = ufos.length - 1; i >= 0; i--) {
    if (ufos[i].remove) {
      ufos.splice(i, 1);
    }
  }

  // game
  if (gameState === 'game') {
    timerBarHeight = map(timer * 1.5, 0, 30, 0, 404);
    timerBarHeight = min(timerBarHeight, 400);
    fill(255)
    rect(width - 22, height - 552, 14, 404)
    noStroke();
    fill(240, 0, 0);
    rect(width - 20, height - timerBarHeight - 150, 10, timerBarHeight);
    fill(255);
    textSize(24);
    textAlign(CENTER, CENTER);
    text(`Score: ${score}`, width / 2, 30);
    text(`High Score: ${highScore}`, width / 2, 60);
  }

  if (mousePressedCheck) {
    mousePressedTimer++;
    if (mousePressedTimer > 1) {
      mousePressedCheck = false;
    }
  }

  if (istutorial === true) {
    tutorial();
  }

  if (timer > 20) {
    timer = 20;
  }

  if (score > highScore) {
    highScore = score;
  }

  if (gameState === 'gameOver') {
    drawGameOverMenu();
  }

  devtools();
}

window.mousePressed = function mousePressed() {
  mousePressedTimer = 0;
  mousePressedCheck = true;
}

// keypressed
window.keyPressed = function keyPressed() {
  if (key === ' ') {
    gameState = 'game';
    score = 0;
    istutorial = false;
  }

  if (key === 't' && gameState === 'menu') {
    istutorial = !istutorial;
  }

  if (key === 'p') {
    isDevtools = !isDevtools;
  }
  if (key === 'i' && isDevtools) {
    isInfoholic = !isInfoholic;
  }
  if (key === 'c') {
    devColor = !devColor;
  }
}

// tutorial
function tutorial() {
  fill(255);
  textSize(48);
  textAlign(CENTER, CENTER);
  text('destroy car: Mouse 1', width / 2, height / 2 - 150);
  text('Open devtools: P', width / 2, height / 2 - 50);
}

// devtools
function devtools() {
  if (isDevtools) {
    let devtoolsData = [
      {
        title: 'Devtools Menu:',
        items: [
          `bgColor: ${bgColor}`,
          `angle: ${angle}`,
          `colorTransitionRate: ${colorTransitionRate}`,
          `isDay: ${isDay}`,
          `isNight: ${isNight}`,
          `sunX: ${sunX}`,
          `sunY: ${sunY}`,
          `moonX: ${moonX}`,
          `moonY: ${moonY}`,
          `starCount: ${starCount}`,
          `cloudCount: ${clouds.length}`,
          `mountainCount: ${mountains.length}`,
          `treeCount: ${trees.length}`,
          `carLenght: ${cars.length}`,
          `mousePresssed: ${mousePressedCheck}`,
          `probability: ${probability}`,
          `timer: ${timer}`,
          `highScore: ${highScore}`,
          `score: ${score}`,
        ]
      },
      {
        title: 'System Variables:',
        items: [
          `isDevtools: ${isDevtools}`,
          `isInfoholic: ${isInfoholic}`,
          `centerX: ${centerX}`,
          `centerY: ${centerY}`,
          `width: ${width}`,
          `height: ${height}`,
          `frameCount: ${frameCount}`,
        ]
      },
    ];

    if (isInfoholic) {
      devtoolsData.push({
        title: 'Infoholic:',
        items: [
          `sunColor: ${sunColor}`,
          `moonColor: ${moonColor}`,
          `MIN_CLOUD_SIZE: ${MIN_CLOUD_SIZE}`,
          `MAX_CLOUD_SIZE: ${MAX_CLOUD_SIZE}`,
          `MIN_STAR_SIZE: ${MIN_STAR_SIZE}`,
          `MAX_STAR_SIZE: ${MAX_STAR_SIZE}`,
          `STAR_COUNT: ${STAR_COUNT}`,
          `CLOUD_COUNT: ${CLOUD_COUNT}`,
          `ROAD_WIDTH: ${ROAD_WIDTH}`,
          `VERGE_WIDTH: ${VERGE_WIDTH}`,
        ],
      });
    }

    devtoolsData.push({
      title: 'Controls:',
      items: [
        'Press "p" to toggle Devtools',
        'Press "i" to toggle Infoholic (while Devtools is on)',
        'Press "c" to toggle HighConstrast',
        'Press "t" to toggle Tutorial',
        'Press "Space" to Start/Restart the game',
      ],
    });

    if (devColor) {
      fill(0, 255, 0);
    } else {
      fill(255);
    }
    noStroke();
    textSize(12);
    textAlign(LEFT, BOTTOM);

    let y = 15;
    for (let section of devtoolsData) {
      text(section.title, 5, y);
      text('-----------', 5, y + 15);
      y += 30;
      for (let item of section.items) {
        text(item, 5, y);
        y += 15;
      }
    }
  } else {
    isInfoholic = false;
  }
}

// main menu
window.drawMenu = function drawMenu() {
  background(bgColor);
  fill(255);
  textSize(48);
  stroke(1);
  textAlign(CENTER, CENTER);
  text('Welcome to Car Clicker!', width / 2, height / 2 - 200);
  text('Press t for tutorial', width / 2, height / 2 - 100);
  text('Press Space to Start', width / 2, height / 2);
}

// game over menu
window.drawGameOverMenu = function drawGameOverMenu() {
  background(140);
  fill(255);
  textSize(48);
  stroke(1);
  textAlign(CENTER, CENTER);

  text('Game Over!', width / 2, height / 2 - 100);
  text(`Your Score: ${score}`, width / 2, height / 2 - 50);
  text(`High Score: ${highScore}`, width / 2, height / 2);
  text('Press Space to Restart', width / 2, height / 2 + 50);

  resetGameState();
  gameOverSetup();
}

// game restart
function resetGameState() {
  timer = 20;
  cars = [];
  clouds = [];
  mountains = [];
  trees = [];
  stars = [];
  starCount = 0;
  angle = 0;
  colorTransitionRate = 0;
  isDay = true;
  isNight = false;
  istutorial = false;
}