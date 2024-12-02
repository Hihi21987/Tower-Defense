class NinjaPong {
  constructor(x, y, velX, velY, damage, sharpness) {
    this.pos = createVector(x, y);
    this.pos2 = createVector(0, 0);
    this.vel = createVector(velX, velY);
    this.acc = createVector(0, 0);
    this.type = "ninjaBear";
    this.ttl = 3000;

    this.timeCreated = millis();
    this.timeSpent = 0;

    this.id = pongID;
    pongID++;

    this.damage = damage;
    this.sharpness = sharpness;

    this.dead = false;
  }

  show() {
    noStroke();
    fill(20);
    circle(this.pos.x, this.pos.y, 15);
  }

  update() {
    this.pos2.x = this.pos.x;
    this.pos2.y = this.pos.y;
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.mult(0);

    this.timeSpent = millis() - this.timeCreated;

    if (this.timeSpent >= this.ttl) {
      this.dead = true;
    }
  }

  checkOut() {
    if (this.dead == true) {
      return true;
    } else {
      return false;
    }

    if (
      this.pos.x < 0 ||
      this.pos.x > width ||
      this.pos.y < 0 ||
      this.pos.y > height
    ) {
      return true;
    } else {
      return false;
    }
  }
}
