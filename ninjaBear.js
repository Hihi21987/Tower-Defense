class NinjaBear {
  // started on friday
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.type = "ninjaBear";

    this.r = 19;
    this.rotation = PI / 2;

    this.pathTooClose = false;
    this.towerTooClose = false;
    this.withinBoundary = false;

    this.canPlace = false;

    // for animations
    this.attacking = false;
    this.attackTime = 0;

    this.attackRadius = 60;
    this.attackSpeed = 1750;
    this.lastAttack = 0;
    this.attackCooldown = 0;
    this.attackDamage = 2;
    this.canAttack = true;
    this.pongSpeed = 3;

    this.buffed = false;

    this.pongSharpness = 2;

    this.enemiesClose = [];
    this.closestEnemy = -1;
    this.mode = "ghost";

    this.menuOpened = false;
    this.mouseHovered = false;

    // Stuff for first upgrade path
    this.ug1Level = 0;
    this.ug1Label = "Better Pongs";
    this.ug1Desc = [
      "Pongs will hone onto more pings!",
      "Pongs will hone onto even more pings!",
    ];
    this.ug1 = [2, 4, 7];
    this.ug1Price = [300, 500, 1200]

    // Stuff for second upgrade path
    this.ug2Level = 0;
    this.ug2Label = "Sharp Pongs";
    this.ug2Desc = ["Pongs will deal 3 damage!", "Pong will deal 4 damage!"];
    this.ug2 = [2, 3, 4];
    this.ug2Price = [200, 400, 800]

    // Stuff for third upgrade path
    this.ug3Level = 0;
    this.ug3Label = "Further Pongs";
    this.ug3Desc = [
      "Ninja Bear can shoot pings further away!",
      "Ninja Bear can shoot pings even further away!",
    ];
    this.ug3 = [60, 68, 75];
    this.ug3Price = [150, 300, 500]
  }

  placing() {
    this.pos.x = mouseX;
    this.pos.y = mouseY;

    // Placement indicator
    for (let path of paths) {
      let distFromPath = dist(path.x, path.y, this.pos.x, this.pos.y);
      if (distFromPath < pathThickness / 2 + this.r) {
        this.pathTooClose = true;
        break;
      } else {
        this.pathTooClose = false;
      }
    }

    for (let i = 0; i < towers.length - 1; i++) {
      let minDistance = this.r + towers[i].r;

      if (
        dist(this.pos.x, this.pos.y, towers[i].pos.x, towers[i].pos.y) <
        minDistance
      ) {
        this.towerTooClose = true;
        break;
      } else {
        this.towerTooClose = false;
      }
    }

    if (this.pos.x + this.r > width - sidebarW) {
      this.withinBoundary = false;
    } else {
      this.withinBoundary = true;
    }

    if (
      this.pathTooClose == false &&
      this.towerTooClose == false &&
      this.withinBoundary == true
    ) {
      fill("rgba(0,0,0,0.2)");
      this.canPlace = true;
    } else {
      fill("rgba(255,0,0, 0.3)");
      this.canPlace = false;
    }

    noStroke();
    circle(this.pos.x, this.pos.y, this.attackRadius * 2);

    // Actual tower model
    image(
      ninjaBearIdle,
      this.pos.x - this.r * 2,
      this.pos.y - this.r * 2,
      this.r * 4,
      this.r * 4
    );
  }

  show() {
    if (this.mode == "tower") {
      // Attack radius circle
      if (this.menuOpened == true) {
        fill("rgba(0,0,0,0.2)");
        noStroke();
        circle(this.pos.x, this.pos.y, this.attackRadius * 2);
      }

      // Main body
      push();
      translate(this.pos.x, this.pos.y);
      rotate(this.rotation + (PI / 2) * 3);

      if (this.mouseHovered) {
        if (this.attacking) {
          image(
            ninjaBearAttackHovered,
            -this.r * 2,
            -this.r * 2,
            this.r * 4,
            this.r * 4
          );
        } else
          image(
            ninjaBearIdleHovered,
            -this.r * 2,
            -this.r * 2,
            this.r * 4,
            this.r * 4
          );
      } else {
        if (this.attacking) {
          image(
            ninjaBearAttack,
            -this.r * 2,
            -this.r * 2,
            this.r * 4,
            this.r * 4
          );
        } else {
          image(
            ninjaBearIdle,
            -this.r * 2,
            -this.r * 2,
            this.r * 4,
            this.r * 4
          );
        }
      }

      pop();
    }
  }

  update() {
    // Update upgrades
    this.pongSharpness = this.ug1[this.ug1Level];
    this.attackDamage = this.ug2[this.ug2Level];
    this.attackRadius = this.ug3[this.ug3Level];

    this.attackSpeed = 1000;

    if (dist(mouseX, mouseY, this.pos.x, this.pos.y) < this.r) {
      this.mouseHovered = true;
    } else {
      this.mouseHovered = false;
    }

    if (millis() - this.attackTime >= 300) {
      this.attacking = false;
    }

    // Check if enemies are close
    for (let i = 0; i < enemies.length; i++) {
      this.enemiesClose.push(i);
    }

    // Remove enemies far away
    for (let i = this.enemiesClose.length - 1; i >= 0; i--) {
      let enemyIndex = this.enemiesClose[i];

      if (enemies[enemyIndex] != undefined) {
        let distFromEnemy = dist(
          this.pos.x,
          this.pos.y,
          enemies[enemyIndex].pos.x,
          enemies[enemyIndex].pos.y
        );

        if (distFromEnemy - enemies[enemyIndex].r > this.attackRadius) {
          this.removeEnemiesClose(enemyIndex);
        }
      } else {
        this.removeEnemiesClose(enemyIndex);
      }
    }

    let closestDistance = Infinity;

    // Check for the closest enemy in the array
    for (let i = 0; i < this.enemiesClose.length; i++) {
      let enemyIndex = this.enemiesClose[i];
      let distFromEnemy = dist(
        this.pos.x,
        this.pos.y,
        enemies[enemyIndex].pos.x,
        enemies[enemyIndex].pos.y
      );

      if (distFromEnemy < closestDistance) {
        closestDistance = distFromEnemy;
        this.closestEnemy = enemyIndex;
      }
    }

    this.attackCooldown = millis() - this.lastAttack;

    if (this.attackCooldown >= this.attackSpeed) {
      this.canAttack = true;
    } else {
      this.canAttack = false;
    }

    for (let bearCave of bearCaves) {
      if (
        dist(this.pos.x, this.pos.y, bearCave.pos.x, bearCave.pos.y) <
          bearCave.attackRadius &&
        bearCave.mode == "tower"
      ) {
        this.attackDamage += bearCave.damageBuff;
        this.attackSpeed -= bearCave.speedBuff;
      }
    }
  }

  removeEnemiesClose(index) {
    let enemyIndex = this.enemiesClose.indexOf(index);
    if (enemyIndex !== -1) {
      this.enemiesClose.splice(enemyIndex, 1);
    }
  }

  attack() {
    if (this.enemiesClose.length > 0 && this.canAttack) {
      this.attacking = true;
      this.shoot();

      if (enemies[this.closestEnemy] != undefined) {
        this.removeEnemiesClose(this.closestEnemy);
      }

      this.attackCooldown = this.attackSpeed;
      this.closestEnemy = -1;
      this.lastAttack = millis();
      this.attackTime = millis();
    }
  }

  shoot() {
    let targetEnemy = enemies[this.closestEnemy];
    let targetWpNum = targetEnemy.wpNumber;
    let targetPos = paths[targetWpNum];

    let vel;

    let enemyVel = p5.Vector.copy(targetEnemy.vel);
    enemyVel.mult(7);
    let shootAt = p5.Vector.copy(targetEnemy.pos);
    shootAt = shootAt.add(enemyVel);
    vel = p5.Vector.sub(shootAt, this.pos);

    this.rotation = atan2(vel.y, vel.x);

    vel.mult(this.pongSpeed * 0.05);

    let ninjaPong = new NinjaPong(
      this.pos.x,
      this.pos.y,
      vel.x,
      vel.y,
      this.attackDamage,
      this.pongSharpness
    );
    pongs.push(ninjaPong);
    
    let pongText = new PongText(this.pos.x, this.pos.y);
    pongTexts.push(pongText);
  }

  towerMenu() {
    if (this.menuOpened) {
      towerMenu();
    }
  }
}
