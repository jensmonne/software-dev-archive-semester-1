let TextBorderSpace = 30;
let TextBorderSpaceR = 350;

//opdracht 1
let Text1Y = 130;

//opdracht 2
let Text2Y = 230;

//opdracht 3
let Text3Y = 330;
let ChessX = TextBorderSpace+50;
let ChessY = Text3Y-50;

//opdracht 4
let Text4Y = 550;

//opdracht 5
let Text5Y = 750;

//opdracht 6
let Text6Y = 130;

//opdracht 7
let Text7Y = 450;

//opdracht 8
let Text8Y = 750;

function setup() {
  createCanvas(1000, 1000);
  background(200, 0, 190);
  textSize(30);
  text("opdracht, hello world!", 20 , 50);
}

function draw() {
  textSize(25);
  textFont('Verdana');
  fill(0);
  noStroke();

  //opdracht 1
  text("1.", TextBorderSpace, Text1Y);
  text("Jens Monné", TextBorderSpace+50, Text1Y);

  //opdracht 2 
  text("2.", TextBorderSpace, Text2Y);
  fill(255, 0, 0);
  rect(TextBorderSpace+50, Text2Y-50, 125, 25);
  fill(255)
  rect(TextBorderSpace+50, Text2Y-25, 125, 25);
  fill(0, 0, 255);
  rect(TextBorderSpace+50, Text2Y, 125, 25);

  //opdracht 3
  fill(0);
  text("3.", TextBorderSpace, Text3Y);
  //zwart
  stroke(1);
  strokeWeight(5);
  rect(ChessX, ChessY, 200);

  //Wit
  noStroke();
  fill(255);
  //ik had eerst alle zwarte vlakken apart ingetekend, ik vond dit te inefficient en heb for loops geleerd om dit wel efficient te maken en dit is het resultaat daarval
  for (let posX = 0; posX < 8; posX++) {
    for (let posY = 0; posY < 8; posY++) {
      if ((posX+posY)%2===0) {
        rect(ChessX+(posX*25), ChessY+(posY*25), 25);
      }
    }
  }

  //opdracht 4
  fill(0);
  text("4.", TextBorderSpace, Text4Y);
  stroke(1);
  strokeWeight(3);
  fill(200, 0, 190);
  rect(TextBorderSpace+50, Text4Y+25, 100);
  triangle(TextBorderSpace+50, Text4Y+25, TextBorderSpace+100, Text4Y-25, TextBorderSpace+150, Text4Y+25);
  circle(TextBorderSpace+100, Text4Y+5, 20);
  rect(TextBorderSpace+70, Text4Y+45, 20);
  rect(TextBorderSpace+110, Text4Y+45, 20);
  rect(TextBorderSpace+110, Text4Y+85, 20);
  rect(TextBorderSpace+70, Text4Y+85, 20, 40);
  point(TextBorderSpace+76, Text4Y+105);

  //opdracht 5
  noStroke();
  fill(0);
  text("5.", TextBorderSpace, Text5Y);
  stroke(1);
  strokeWeight(1);
  fill(120);
  rect(TextBorderSpace+50, Text5Y-25, 40, 105, 105);
  rect(TextBorderSpace+65, Text5Y+79, 10, 105, 105);
  strokeWeight(0.5);
  fill(255, 0, 0);
  circle(TextBorderSpace+70, Text5Y-4, 25);
  fill(255, 165, 0);
  circle(TextBorderSpace+70, Text5Y+28, 25);
  fill(0, 255, 0);
  circle(TextBorderSpace+70, Text5Y+59, 25);

  //opdracht 6
  fill(0);
  text("6.", TextBorderSpaceR, Text6Y);
  fill(255);
  stroke(1);
  strokeWeight(7);
  rect(TextBorderSpaceR+50, Text6Y-50, 300, 300, 40);
  noStroke();
  fill(0);
  circle(TextBorderSpaceR+200, Text6Y+100, 70);
  circle(TextBorderSpaceR+125, Text6Y+25, 70);
  circle(TextBorderSpaceR+275, Text6Y+175, 70);
  circle(TextBorderSpaceR+125, Text6Y+175, 70);
  circle(TextBorderSpaceR+275, Text6Y+25, 70);

  //opdracht 7
  text("7.", TextBorderSpaceR, Text7Y);
  text("Mario", TextBorderSpaceR+30, Text7Y-30);
  //brown
  fill(153, 102, 15)
  rect(TextBorderSpaceR+80, Text7Y+10, 105, 15);
  rect(TextBorderSpaceR+65, Text7Y+25, 150, 45);
  rect(TextBorderSpaceR+80, Text7Y+85, 90, 15);
  rect(TextBorderSpaceR+65, Text7Y+100, 150, 15);
  rect(TextBorderSpaceR+50, Text7Y+115, 180, 30);
  rect(TextBorderSpaceR+65, Text7Y+190, 150, 15);
  rect(TextBorderSpaceR+50, Text7Y+205, 180, 15);
  //skin
  fill(237, 158, 97);
  rect(TextBorderSpaceR+125, Text7Y+10, 30, 15);
  rect(TextBorderSpaceR+170, Text7Y+10, 15);
  rect(TextBorderSpaceR+110, Text7Y+25, 45, 15);
  rect(TextBorderSpaceR+125, Text7Y+40, 45, 15);
  rect(TextBorderSpaceR+170, Text7Y+25, 45, 15);
  rect(TextBorderSpaceR+185, Text7Y+40, 45, 15);
  rect(TextBorderSpaceR+95, Text7Y+55, 60, 15);
  rect(TextBorderSpaceR+80, Text7Y+25, 15, 30);
  rect(TextBorderSpaceR+95, Text7Y+70, 105, 15);
  rect(TextBorderSpaceR+110, Text7Y+130, 60, 15);
  rect(TextBorderSpaceR+80, Text7Y+145, 120, 15);
  rect(TextBorderSpaceR+50, Text7Y+130, 30, 45);
  rect(TextBorderSpaceR+200, Text7Y+130, 30, 45);
  //red
  fill(230, 0, 0);
  rect(TextBorderSpaceR+95, Text7Y-20, 75, 15);
  rect(TextBorderSpaceR+80, Text7Y-5, 135, 15);
  rect(TextBorderSpaceR+125, Text7Y+115, 30, 60);
  rect(TextBorderSpaceR+110, Text7Y+85, 15, 45);
  rect(TextBorderSpaceR+155, Text7Y+100, 15, 30);
  rect(TextBorderSpaceR+170, Text7Y+130, 15, 15);
  rect(TextBorderSpaceR+95, Text7Y+130, 15, 15);
  rect(TextBorderSpaceR+95, Text7Y+145, 90, 15);
  rect(TextBorderSpaceR+80, Text7Y+160, 120, 15);
  rect(TextBorderSpaceR+80, Text7Y+175, 45, 15);
  rect(TextBorderSpaceR+155, Text7Y+175, 45, 15);
  //purple
  fill(200, 0, 190);
  rect(TextBorderSpaceR+110, Text7Y+190, 60, 30);

  //opdracht 8
  fill(0);
  text("8.", TextBorderSpaceR, Text8Y);
  text("Luigi", TextBorderSpaceR+30, Text8Y-30);
  //brown
  fill(153, 102, 15);
  rect(TextBorderSpaceR+80, Text8Y+10, 105, 15);
  rect(TextBorderSpaceR+65, Text8Y+25, 150, 45);
  rect(TextBorderSpaceR+80, Text8Y+85, 90, 15);
  rect(TextBorderSpaceR+65, Text8Y+100, 150, 15);
  rect(TextBorderSpaceR+50, Text8Y+115, 180, 30);
  rect(TextBorderSpaceR+65, Text8Y+190, 150, 15);
  rect(TextBorderSpaceR+50, Text8Y+205, 180, 15);
  //skin
  fill(237, 158, 97);
  rect(TextBorderSpaceR+125, Text8Y+10, 30, 15);
  rect(TextBorderSpaceR+170, Text8Y+10, 15);
  rect(TextBorderSpaceR+110, Text8Y+25, 45, 15);
  rect(TextBorderSpaceR+125, Text8Y+40, 45, 15);
  rect(TextBorderSpaceR+170, Text8Y+25, 45, 15);
  rect(TextBorderSpaceR+185, Text8Y+40, 45, 15);
  rect(TextBorderSpaceR+95, Text8Y+55, 60, 15);
  rect(TextBorderSpaceR+80, Text8Y+25, 15, 30);
  rect(TextBorderSpaceR+95, Text8Y+70, 105, 15);
  rect(TextBorderSpaceR+110, Text8Y+130, 60, 15);
  rect(TextBorderSpaceR+80, Text8Y+145, 120, 15);
  rect(TextBorderSpaceR+50, Text8Y+130, 30, 45);
  rect(TextBorderSpaceR+200, Text8Y+130, 30, 45);
  //red
  fill(71, 173, 55);
  rect(TextBorderSpaceR+95, Text8Y-20, 75, 15);
  rect(TextBorderSpaceR+80, Text8Y-5, 135, 15);
  rect(TextBorderSpaceR+125, Text8Y+115, 30, 60);
  rect(TextBorderSpaceR+110, Text8Y+85, 15, 45);
  rect(TextBorderSpaceR+155, Text8Y+100, 15, 30);
  rect(TextBorderSpaceR+170, Text8Y+130, 15, 15);
  rect(TextBorderSpaceR+95, Text8Y+130, 15, 15);
  rect(TextBorderSpaceR+95, Text8Y+145, 90, 15);
  rect(TextBorderSpaceR+80, Text8Y+160, 120, 15);
  rect(TextBorderSpaceR+80, Text8Y+175, 45, 15);
  rect(TextBorderSpaceR+155, Text8Y+175, 45, 15);
  //purple
  fill(200, 0, 190);
  rect(TextBorderSpaceR+110, Text8Y+190, 60, 30);
  //done and done
}