class Enemy {
  constructor(x, y, type) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.mass = 10;
    this.type = type;
    this.alive = true;
    this.hitBy = [];
    this.colour = color("blue");
    this.money = 100;

    if (this.type != "path") {
      this.tolerance = 20;
      this.r = 15;
    }

    if (this.type == "path") {
      this.maxSpeed = 15;
      this.tolerance = 55;
      this.r = 25;
      this.health = 10000;
      this.colour = color("blue"); // in case some error comes out if i dont give it a this.colour
      this.damage = 0;
    } else if (this.type == 1) {
      // normal pings
      this.maxSpeed = 2;
      this.health = 1;
      this.colour = color("red");
      this.money = 10;
      this.damage = 1;
    } else if (this.type == 2) {
      // fast pings
      this.maxSpeed = 4;
      this.health = 2;
      this.colour = color("blue");
      this.money = 30;
      this.damage = 3;
    } else if (this.type == 3) {
      // clustered pings
      this.maxSpeed = 1.8;
      this.health = 4;
      this.colour = color("rgb(0,213,28)");
      this.damage = 6;
      this.money = 50;
    } else if (this.type == 4) {
      // VPN pings
      this.maxSpeed = 3;
      this.health = 5;
      this.colour = color("rgb(0,0,0)");
      this.money = 60;
      this.damage = 10;
    } else if (this.type == 5) {
      // office pings (MOABs)
      this.maxSpeed = 1;
      this.health = 40;
      this.colour = color("rgb(156,0,156)");
      this.moeny = 100;
      this.damage = 60;
    }

    this.wpNumber = 0;

    this.firstHitByIce = 0;
    this.slowLength = 0;
    this.ogSpeed = this.maxSpeed;
    this.newSpeed = this.maxSpeed;
    this.slowed = false;
  }

  show() {
    fill(this.colour);
    stroke(255)
    strokeWeight(1)
    circle(this.pos.x, this.pos.y, this.r * 2);
    fill(255);
    textSize(15);
    textAlign(CENTER, CENTER);
    //text(this.health, this.pos.x, this.pos.y);
  }

  update() {
    if (this.health <= 0) {
      this.alive = false;
      money += this.money;
    }

    if (this.maxSpeed != this.ogSpeed) {
      // Enemy is slowed
      this.slowed = true;
      this.colour = color("lightblue");

      let timeSlowed = millis() - this.firstHitByIce;
      if (timeSlowed > this.slowLength) {
        this.maxSpeed = this.ogSpeed;
        this.firstHitByIce = 0;
        this.slowLength = 0;
        this.colour = color("blue");
        this.slowed = false;
      }
    }

    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  applyForce(force) {
    let f = p5.Vector.div(force, this.mass);
    this.acc.add(f);
  }

  gotoWp(wp) {
    if (this.pos != wp) {
      // Calculate distance from waypoint
      // The velocity needed the move the enemy at

      // let x = wp.pos.x - this.pos.x
      // let y = wp.pos.y - this.pos.y
      let desired = p5.Vector.sub(wp, this.pos);
      desired.setMag(this.maxSpeed); // Ensures line is smooth

      // Calculate diff in desired vel and current val
      // Basically the accleration needed to move the enemy at
      let steer = p5.Vector.sub(desired, this.vel);
      this.applyForce(steer);
    }
  }

  checkWp(wp, array) {
    let distanceFromNextWp = dist(wp.x, wp.y, this.pos.x, this.pos.y);
    if (
      distanceFromNextWp < this.tolerance &&
      this.wpNumber < array.length - 1
    ) {
      this.wpNumber++;
    }
  }

  completedPath(array) {
    if (this.wpNumber == array.length - 1) {
      if (this.pos.x >= width + this.r - sidebarW) {
        return true;
      } else {
        return false;
      }
    }
  }

  updateType() {
    if (this.health == 1) {
      this.type = 1;
    } else if (this.health == 2 || this.health == 3) {
      this.type = 2;
    } else if (this.health == 4) {
      this.type = 3;
    } else if (this.health == 5) {
      this.type = 4;
    } else if (this.health == 80) {
      this.type = 5;
    }

    if (!this.slowed) {
      if (this.type == 1) {
        // normal pings
        this.maxSpeed = 2;
        this.colour = color("red");
      } else if (this.type == 2) {
        // fast pings
        this.maxSpeed = 4;
        this.colour = color("blue");
      } else if (this.type == 3) {
        // clustered pings
        this.maxSpeed = 1.8;
        this.colour = color("rgb(0,213,28)");
      } else if (this.type == 4) {
        // VPN pings
        this.maxSpeed = 3;
        this.colour = color("rgb(0,0,0)");
      } else if (this.type == 5) {
        // office pings (MOABs)
        this.maxSpeed = 1;
        this.colour = color("rgb(156,0,156)");
      }
    }
  }

  checkPonged() {
    for (let i = 0; i < pongs.length; i++) {
      let pong = pongs[i];
      if (dist(pong.pos2.x, pong.pos2.y, this.pos.x, this.pos.y) <= this.r) {
        if (!this.hitBy.includes(pong.id)) {
          if (pong.type == "pongBear") {
            if (this.type != 4 || pong.ninjaPong) {
              this.health -= pong.damage;
            }

            this.hitBy.push(pong.id);
          } else if (pong.type == "iceBear") {
            if (this.type != 4 || pong.ninjaPong) {
              this.firstHitByIce = millis();
              this.slowLength = pong.slowLength;
              this.health -= pong.damage;
              this.ogSpeed = this.maxSpeed;

              if (this.maxSpeed - pong.slowness >= 0.5) {
                this.maxSpeed -= pong.slowness;
              } else {
                this.maxSpeed = 0.5;
              }

              pong.dead = true;
            }

            this.hitBy.push(pong.id);
          } else if (pong.type == "ninjaBear") {
            if (pong.sharpness > 1) {
              let closestDistance = Infinity;
              let targetEnemyIndex = -1;
              for (let i = 0; i < enemies.length; i++) {
                let enemy = enemies[i];

                if (enemy === this) {
                  continue;
                }

                let distFromEnemy = dist(
                  this.pos.x,
                  this.pos.y,
                  enemy.pos.x,
                  enemy.pos.y
                );
                if (distFromEnemy < closestDistance) {
                  closestDistance = distFromEnemy;
                  targetEnemyIndex = i;
                }
              }

              if (targetEnemyIndex != -1) {
                let newVel, enemyVel;
                let targetEnemy = enemies[targetEnemyIndex];

                enemyVel = p5.Vector.copy(targetEnemy.vel);
                enemyVel.mult(7);
                let shootAt = p5.Vector.copy(targetEnemy.pos);
                shootAt = shootAt.add(enemyVel);
                newVel = p5.Vector.sub(shootAt, this.pos);
                newVel.mult(0.3);

                pong.vel = newVel;
              } else {
                pong.dead = true;
              }
            }

            pong.sharpness--;

            if (pong.sharpness <= 0) {
              pong.dead = true;
            }
            this.health -= pong.damage;
            this.hitBy.push(pong.id);
          }
        }
      }
    }
  }
}
