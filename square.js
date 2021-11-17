class Square {
  constructor(id, hue, dir, segments, main) {
    this.id = id;
    this.hue = hue;
    this.dir = dir;
    this.segments = segments;
    this.segmentsDir = 1;
    this.main = main;
  }
  update() {
    this.draw();
    if (this.main) this.doSin();
  }

  draw() {
    push();
    translate(0, this.id * 15);
    angleMode(DEGREES);
    rotate(this.dir);
    strokeWeight(3);
    stroke(255);
    fill(this.hue, 200, 100);
    beginShape();
    for (let i = 0; i <= 360; i += 360 / this.segments) {
      let x = cos(i) * 150;
      let y = sin(i) * 150;
      vertex(x, y);
    }
    endShape();
    pop();
  }

  doSin() {
    let unique = frameCount + this.id;
    this.dir = ((sin(unique * 1.25) + 1) / 2) * 360;
    this.hue = ((sin(unique) + 1) / 2) * 100;
    let segment = ((sin(unique * 10) + 1) / 2) * 100;
    if (segment == 0) this.segments += this.segmentsDir;
    if (this.segments == 6) {
      this.segmentsDir = -1;
    }
    if (this.segments == 3) this.segmentsDir = 1;
  }
}
