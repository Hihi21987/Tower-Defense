class IcePong {
  constructor(x, y, velX, velY, damage, slowness, slowLength, ninjaPong) {
    this.pos = createVector(x, y);
    this.pos2 = createVector(0, 0);
    this.vel = createVector(velX, velY);
    this.acc = createVector(0, 0);
    this.type = "iceBear";
    this.ninjaPong = ninjaPong
    this.id = pongID
    pongID++
    
    this.damage = damage;
    this.slowness = slowness
    this.slowLength = slowLength

    this.dead = false;
  }

  show() {
      stroke(0)
      strokeWeight(2)
      fill(255)
      circle(this.pos.x, this.pos.y, 10)
  }
  
  update() {
    this.pos2.x = this.pos.x
    this.pos2.y = this.pos.y
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
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
