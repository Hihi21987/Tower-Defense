class Pong {
  constructor(x, y, velX, velY, damage, ttl, ninjaPong) {
    this.pos = createVector(x, y);
    this.vel = createVector(velX, velY);
    this.acc = createVector(0, 0);
    this.pos2 = createVector(0, 0);
    this.type = "pongBear";
    this.ninjaPong = ninjaPong
    this.id = pongID
    pongID++
    
    
    this.damage = damage;
    this.ttl = ttl;

    this.dead = false;
    this.timeCreated = millis();
    this.timeSpent = 0;
  }

  show() {
      this.pos2.x = this.pos.x + this.vel.x * 2;
      this.pos2.y = this.pos.y + this.vel.y * 2;

      stroke("lime");
      strokeWeight(5);
      line(this.pos.x, this.pos.y, this.pos2.x, this.pos2.y);
  }

  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.mult(0);

    // if (frameCount % 30 == 0) {
    //   this.ttl -= 0.5
    // }

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
