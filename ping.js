class Ping {
  constructor(type) {
    this.targetPos = createVector(startPos.x + 9, startPos.y - pingTowerH + 76);
    this.pos = createVector(random(0, width - sidebarW), random(0, height));

    // Copy this.targetPos to calculate this.vel
    let tempTargetPos = this.targetPos.copy();
    this.vel = tempTargetPos.sub(this.pos);
    this.vel.normalize();
    this.vel.mult(10);
    this.type = type;
  }

  show() {
    if (this.type == 1) {
      stroke("red");
    } else if (this.type == 2) {
      stroke("blue");
    } else if (this.type == 3) {
      stroke("rgb(0,213,28)");
    } else if (this.type == 4) {
      stroke(0);
    } else if (this.type == 5) {
      stroke("rgb(156,0,156)");
    }

    strokeWeight(6);
    line(
      this.pos.x,
      this.pos.y,
      this.pos.x - this.vel.x * 2,
      this.pos.y - this.vel.y * 2
    );
  }

  update() {
    this.pos.add(this.vel);
  }

  checkReached() {
    let d = ceil(dist(this.pos.x, this.pos.y, this.targetPos.x, this.targetPos.y))
    return d < 10
  }
}
