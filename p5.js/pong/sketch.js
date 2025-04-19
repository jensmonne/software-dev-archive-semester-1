let ballX = 0;
let ballY = 0;
let ballSpeedX = 2;
let ballSpeedY = 2;
let paddleSizeX = 30;
let paddleSizeY = 0

window.setup = function setup() {
  createCanvas(600, 600);
  ballX = width / 2;
  ballY = height / 2;
  paddleSizeY = paddleSizeX * 5
}

window.draw = function draw() {
  background(150);

  fill(0);
  rect(20, mouseY - (paddleSizeY / 2), paddleSizeX, paddleSizeY);

  fill(0);
  rect(width - 40, mouseY - (paddleSizeY / 2), paddleSizeX, paddleSizeY);

  fill(0);
  ellipse(ballX, ballY, 30, 30);

  ballX += ballSpeedX;
  ballY += ballSpeedY;

  if (ballY < 15 || ballY > width - 15) {
    ballSpeedY *= -1;
  }

  if ((ballX < 30 + paddleSizeX && ballY > mouseY - (paddleSizeY / 2) && ballY < mouseY + (paddleSizeY / 2)) ||
    (ballX > width - 30 - paddleSizeX && ballY > mouseY - (paddleSizeY / 2) && ballY < mouseY + (paddleSizeY / 2))) {
    ballSpeedX *= -1;
  }

  if (ballX < 15 || ballX > width - 15) {
    ballX = width / 2;
    ballY = height / 2;
    ballSpeedX = 2;
    ballSpeedY = 2;
  }
}