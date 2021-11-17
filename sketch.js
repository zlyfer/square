function preload() {}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

const limit = 30;
let mainSquare = new Square(0, 0, 1, 3, true);
let squares = [];
let sinWaves = [];

function draw() {
  background(220);
  colorMode(HSB, 100);
  translate(width / 2, height / 2);

  // Sinuswave Lines
  push();
  strokeWeight(2);
  // Left
  line(-200, -150, -200, 150);
  line(-450, -150, -450, 150);
  // Top
  line(-150, -200, 150, -200);
  line(-150, -400, 150, -400);
  // Right
  line(200, -150, 200, 150);
  line(450, -150, 450, 150);
  pop();

  for (let i = squares.length - 1; i >= 0; i--) {
    squares[i].update();
  }
  mainSquare.update();

  doSinWaves();
  pushSquare();
}

function doSinWaves() {
  push();
  let s = mainSquare.dir * 0.8 - 180 * 0.8;
  sinWaves.unshift(s);
  if (sinWaves.length > 100) sinWaves.pop();
  strokeWeight(2);
  noFill();
  beginShape();
  for (let i = 0; i < sinWaves.length; i++) {
    let x = sinWaves[i];
    let y = -400 + i * 2;
    vertex(x, y);
  }
  endShape();
  beginShape();
  for (let i = 0; i < sinWaves.length; i++) {
    let x = -450 + i * 2.5 + 3;
    let y = sinWaves[i];
    vertex(x, y);
  }
  endShape();
  beginShape();
  for (let i = 0; i < sinWaves.length; i++) {
    let x = 450 - i * 2.5 - 3;
    let y = sinWaves[i];
    vertex(x, y);
  }
  endShape();
  pop();
}

function pushSquare() {
  let newSquare = new Square(0, mainSquare.hue, mainSquare.dir, mainSquare.segments, false);
  squares.unshift(newSquare);
  for (let i = 0; i < squares.length; i++) {
    squares[i].id = i;
  }
  if (squares.length > limit) squares.pop();
}
