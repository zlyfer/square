const maxSegments = 10;
const minMargin = 10;
const maxMargin = 200;

let limit; // make "trail" no go off screen
let mainSquare = new Square(0, 0, 0, 0, 3, minMargin, true);
let squares = [];

let waves = [];

function preload() {}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  // frameRate(120);
  limit = height / mainSquare.margin;
  background(5);
  colorMode(HSB, 100);
  translate(width / 2, height / 2);

  // Sinuswave Lines
  push();
  stroke(80);
  strokeWeight(2);
  line(-width / 2 + width / 4, -height / 2, -width / 2 + width / 4, height / 2);
  pop();

  for (let i = squares.length - 1; i >= 0; i--) {
    squares[i].update();
  }
  mainSquare.update();

  let waveObj = [
    map(mainSquare.hue, 0, 360, 0, 100),
    map(mainSquare.dir, 0, 360, 0, 100),
    map(mainSquare.saturation, 0, 100, 0, 100),
    map(mainSquare.segments, 3, maxSegments, 0, 100),
    map(mainSquare.margin, minMargin, maxMargin, 0, 100),
  ];
  doWaves(waveObj);
  doWavesKnobs(waveObj);
  pushSquare();
}

function doWavesKnobs(waveObj) {
  push();
  translate(0, -height / 2);
  stroke(80);
  strokeWeight(2);
  fill(80);
  let x = -width / 2 + width / 4;
  let y = 0;
  // Hue
  push();
  fill(mainSquare.hue, 100, 100);
  y = calcWaveHeight(waveObj, waveObj[0], 0);
  circle(x, y, 20);
  pop();
  // Dir
  push();
  y = calcWaveHeight(waveObj, waveObj[1], 1);
  angleMode(DEGREES);
  translate(x, y);
  rotate(180);
  rotate(map(waveObj[1], 0, 100, -90, 90));
  beginShape();
  vertex(-10, 0);
  vertex(-6, 0);
  vertex(-6, -10);
  vertex(6, -10);
  vertex(6, 0);
  vertex(10, 0);
  vertex(0, 10);
  endShape(CLOSE);
  // circle(x, y, 20);
  pop();
  // Saturation
  push();
  y = calcWaveHeight(waveObj, waveObj[2], 2);
  fill(waveObj[2]);
  circle(x, y, 20);
  pop();
  // Segments
  push();
  y = calcWaveHeight(waveObj, waveObj[3], 3);
  translate(x, y);
  beginShape();
  for (let i = 0; i <= 360; i += 360 / mainSquare.segments) {
    vertex(cos(i - 30) * 10, sin(i - 30) * 10);
  }
  endShape(CLOSE);
  pop();
  // Margin
  push();
  y = calcWaveHeight(waveObj, waveObj[4], 4);
  fill(0);
  circle(x, y, 20);
  fill(100);
  circle(x, y, map(waveObj[4], 0, 100, 20, 0));
  pop();
  pop();
}

function doWaves(waveObj) {
  push();
  translate(0, -height / 2);
  stroke(80);
  strokeWeight(2);
  noFill();
  waveObj.forEach((value, index) => {
    if (waves.length - 1 < index) waves.push([]);
    waves[index].unshift(calcWaveHeight(waveObj, value, index));
    beginShape();
    for (let i = 0; i < waves[index].length; i++) {
      let x = -width / 2 + width / 4 - i;
      let y = waves[index][i];
      vertex(x, y);
    }
    endShape();
    if (waves[index].length > width / 4) waves[index].pop();
  });
  pop();
}

function calcWaveHeight(waveObj, value, index) {
  let h1 = (height / waveObj.length) * index + 50;
  let h2 = h1 + height / waveObj.length - 100;
  let ret = map(value, 0, 100, h1, h2);
  return ret;
}

function pushSquare() {
  let newSquare = new Square(
    0,
    mainSquare.hue,
    mainSquare.saturation,
    mainSquare.dir,
    mainSquare.segments,
    mainSquare.margin,
    false
  );
  squares.unshift(newSquare);
  for (let i = 0; i < squares.length; i++) {
    squares[i].id = i;
  }
  if (squares.length > limit) squares.pop();
}
