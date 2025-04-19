let car = 690
let carspeed = 0
let border
let light = 0
let cloudspeed = 0
let devtools = false
let sec
let seconds
let dev = 0
let bounce1 = 0
let bounce2 = 0
let sunX
let sunspeed = 0
let extdevtools = false
let extdev = 0
let Cbounce1
let Cbounce2
let Cdev = 0
let Cursordevtools = false

//stoplight
let RR
let RO
let GO
let GG

function setup() {
  createCanvas(1400, 700);
}

function draw() {
  fill(230);
  textFont('Verdana');
  textSize(24);
  stroke(1);
  strokeWeight(1);
  border = width + 200;

  //skybox
  background(0, 160, 244);

  //sun
  fill(222, 222, 16);
  circle(-100 + sunspeed, 100, 100);
  if (sunX < 1550) {
    sunX = sunspeed;
  }
  sunspeed = frameCount % border;

  //clouds
  fill(230);
  for (let cloud = 0; cloud <= 3; cloud += 1) {
    circle(cloud * 20 + cloudspeed + 1500, 150, 40)
  }
  cloudspeed = -frameCount % border;

  //mountains
  fill(150);
  triangle(-50, 700, 450, 700, 200, 300);
  triangle(150, 700, 500, 700, 300, 375);
  triangle(400, 700, 1100, 700, 750, 200);
  //pines
  fill(107, 73, 33);
  rect(40, 580, 15, 110);
  fill(40, 107, 33);
  triangle(10, 600, 85, 600, 47.5, 500);
  fill(107, 73, 33);
  rect(900, 550, 20, 140);
  fill(40, 107, 33);
  triangle(840, 580, 980, 580, 910, 470);
  triangle(850, 540, 970, 540, 910, 430);
  triangle(860, 500, 960, 500, 910, 390);
  fill(107, 73, 33);
  rect(1300, 580, 15, 110);
  fill(40, 107, 33);
  triangle(1260, 600, 1355, 600, 1307.5, 500);
  triangle(1260, 560, 1355, 560, 1307.5, 460);
  //road
  fill(100);
  rect(-10, 700, 1500, -15);
  //stoplight
  noStroke();
  fill(50);
  rect(1120, 608, 10, 77);
  rect(1110, 540, 30, 70, 20);
  fill(RR, 0, 0);
  circle(1125, 555, 17); //red
  fill(RO, GO, 0);
  circle(1125, 575, 17); //orange
  fill(0, GG, 0);
  circle(1125, 595, 17); //green

  //car
  fill(200, 0, 190);
  rect(-100 + carspeed % border, car - 35, 100, 20);
  rect(-80 + carspeed % border, car - 55, 60, 20);
  fill(200);
  rect(-70 + carspeed % border, car - 50, 20, 15);
  rect(-40 + carspeed % border, car - 50, 20, 15);
  circle(-25 + carspeed % border, car - 15 - bounce2, 20);
  circle(-75 + carspeed % border, car - 15 - bounce1, 20);
  if (carspeed > 1550) {
    carspeed = 0
  }
  if (light == 1) {
    carspeed += 2
  }
  if (light == 2) {
    carspeed += 4
  }

  //wheelbounce
  if (light == 0) {
    bounce1 = 0
    bounce2 = 0
  }
  if (light == 1) {
    if (bounce1 < 3) {
      bounce1 += 0.15
    } else
      bounce1 -= 3
    if (bounce2 < 4) {
      bounce2 += 0.1
    } else
      bounce2 -= 3
  }
  if (light == 2) {
    if (bounce1 < 4) {
      bounce1 += 0.35
    } else
      bounce1 -= 4
    if (bounce2 < 4) {
      bounce2 += 0.3
    } else
      bounce2 -= 4
  }

  //devtools
  if (devtools == true) {
    text(frameCount, 5, 25);
    text(seconds, 100, 25)
    text(light, 50, 50);
    text(carspeed, 100, 50);
    text(cloudspeed, 150, 50);
    text(sunspeed, 150, 25);
    text(extdevtools, 200, 25);
    if (extdevtools == true) {
      text(Cursordevtools, 200, 75)
      text(Cbounce1, 50, 75);
      text(Cbounce2, 75, 75);
      text(width, 100, 75);
      text(RR, 50, 100);
      text(RO, 100, 100);
      text(GO, 150, 100);
      text(GG, 200, 100);
      text('X.' + mouseX, 50, 125);
      text('Y.' + mouseY, 150, 125);
      if (Cursordevtools == true) {
        fill(0)
        rect(mouseX, mouseY - 1000, 3, 2000)
        rect(mouseX - 5000, mouseY, 10000, 3)
      }
    }
  } else
    text(devtools, 5, 20);
  Cbounce1 = bounce1;
  Cbounce2 = bounce2;
  Cbounce1 = round(Cbounce1);
  Cbounce2 = round(Cbounce2);
  sec = frameCount / 60;
  seconds = round(sec);

  //stoplight
  if (light == 0) {
    RR = 244
  } else
    RR = 110
  if (light == 1) {
    RO = 244
    GO = 100
  } else
    RO = 145
  GO = 70
  if (light == 2) {
    GG = 244
  } else
    GG = 110
}

function keyTyped() {
  if (key === 'Enter') {
    if (keyIsPressed === true) {
      light++
      if (light == 3)
        light = 0
    }
  }
  //devtools
  if (key === 'p') {
    if (keyIsPressed === true) {
      devtools = true
      dev++
      if (dev == 2) {
        dev = 0
        devtools = false
      }
    }
  }
  if (key === 'x') {
    if (keyIsPressed === true) {
      extdevtools = true
      extdev++
      if (extdev == 2) {
        extdev = 0
        extdevtools = false
      }
    }
  }
  if (key === 'c') {
    if (keyIsPressed === true) {
      Cursordevtools = true
      Cdev++
      if (Cdev == 2) {
        Cdev = 0
        Cursordevtools = false
      }
    }
  }
}