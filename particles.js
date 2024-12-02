class Particle {
  constructor(x, y, colour) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.r = 5;
    this.colour = colour;
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);

    this.acc.mult(0);
  }

  show() {
    fill(255);
    fill(this.colour);
    noStroke();
    circle(this.pos.x, this.pos.y, this.r * 2);
  }

  applyForce(force) {
    let f = p5.Vector.div(force, this.mass);
    this.acc.add(f);
  }

  checkOut() {
    if (this.pos.y > height) {
      return true;
    } else {
      return false;
    }
  }
}
