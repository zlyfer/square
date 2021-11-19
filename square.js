class Square {
  constructor(id, hue, saturation, dir, segments, margin, main) {
    this.id = id;
    this.hue = hue;
    this.saturation = saturation;
    this.dir = dir;
    this.margin = margin;
    this.segments = segments;
    this.segmentsDir = 1;
    this.main = main;
    this.size = 200;
  }
  update() {
    this.draw();
    if (this.main) this.doSin();
  }

  draw() {
    push();
    translate(width / 4 / 2, this.id * this.margin - height / 8);
    angleMode(DEGREES);
    rotate(this.dir);
    strokeWeight(3);
    stroke(100, map(this.id, 0, limit, 100, 10));
    fill(this.hue, this.saturation, 100, map(this.id, 0, limit, 80, 0));
    beginShape();
    for (let i = 0; i <= 360; i += 360 / this.segments) {
      let x = cos(i) * this.size;
      let y = sin(i) * this.size;
      vertex(x, y);
    }
    endShape(CLOSE);
    pop();
  }

  doSin() {
    let unique = frameCount + this.id;
    this.dir = ((sin(unique * 1.25) + 1) / 2) * 360;
    this.hue = ((sin(unique) + 1) / 2) * 100;
    this.saturation = ((sin(unique / 8) + 1) / 2) * 80 + 20;
    let segment = ((sin(unique * 10) + 1) / 2) * 100;
    if (segment == 0) this.segments += this.segmentsDir;
    if (this.segments == maxSegments) {
      this.segmentsDir = -1;
    }
    if (this.segments == 3) this.segmentsDir = 1;
    let margin = sin(unique / 5);
    this.margin = map(margin, -1, 1, minMargin, maxMargin);
  }
}
