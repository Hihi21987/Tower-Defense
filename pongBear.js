class PongBear {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.type = "pongBear";

    this.r = 20;
    this.rotation = PI / 2;

    this.pathTooClose = false;
    this.towerTooClose = false;
    this.withinBoundary = false;

    this.canPlace = false;

    this.attackRadius = 65;
    this.attackSpeed = 2000;
    this.lastAttack = 0;
    this.attackCooldown = 0;
    this.attackDamage = 1;
    this.canAttack = true;
    this.pongSpeed = 2;
    this.pongTTL = 200;

    // for animations
    this.attacking = false;
    this.attackTime = 0;

    this.buffed = false;

    this.ninjaPongs = false;

    this.enemiesClose = [];
    this.closestEnemy = -1;
    this.mode = "ghost";

    this.menuOpened = false;
    this.mouseHovered = false;

    // Stuff for first upgrade path
    this.ug1Level = 0;
    this.ug1Label = "Faster Pongs";
    this.ug1Desc = ["Shorter reload time!", "Even shorter reload time!"];
    this.ug1 = [2000, 1500, 600];
    this.ug1Price = [100, 200, 350];

    // Stuff for second upgrade path
    this.ug2Level = 0;
    this.ug2Label = "Stronger Pongs";
    this.ug2Desc = [
      "Pongs will travel further!",
      "Pongs will travel even further!",
    ];
    this.ug2 = [200, 1000, 2400];
    this.ug2Price = [50, 150, 250];

    // Stuff for third upgrade path
    this.ug3Level = 0;
    this.ug3Label = "Sharper Pongs";
    this.ug3Desc = ["Pongs deal 4 damgae!", "Pongs deal 7 damage!"];
    this.ug3 = [1, 4, 7];
    this.ug3Price = [200, 350, 500];

    this.price = 50;
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
    // fill("black");
    // textAlign(CENTER, CENTER);
    // noStroke();
    // circle(this.pos.x, this.pos.y, this.r * 2);
    image(
      pongBearIdle,
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
      // if (this.enemiesClose.length > 0) {
      //   fill("red");
      // } else {
      //   fill("black");
      // }
      // noStroke();
      // circle(this.pos.x, this.pos.y, this.r * 2);

      push();
      translate(this.pos.x, this.pos.y);
      rotate(this.rotation + (PI / 2) * 3);

      if (this.mouseHovered) {
        if (this.attacking) {
          image(
            pongBearAttackHovered,
            -this.r * 2,
            -this.r * 2 - 1,
            this.r * 4,
            this.r * 4
          );
        } else
          image(
            pongBearIdleHovered,
            -this.r * 2,
            -this.r * 2 - 1,
            this.r * 4,
            this.r * 4
          );
      } else {
        if (this.attacking) {
          image(
            pongBearAttack,
            -this.r * 2,
            -this.r * 2 - 1,
            this.r * 4,
            this.r * 4
          );
        } else {
          image(pongBearIdle, -this.r * 2, -this.r * 2, this.r * 4, this.r * 4);
        }
      }

      pop();
    }

    noStroke();
    fill("white");
    //text(this.attackCooldown, this.pos.x, this.pos.y);
  }

  update() {
    // Update upgrades
    this.attackSpeed = this.ug1[this.ug1Level];
    this.pongTTL = this.ug2[this.ug2Level];
    this.attackDamage = this.ug3[this.ug3Level];

    if (dist(mouseX, mouseY, this.pos.x, this.pos.y) < this.r) {
      this.mouseHovered = true;
    } else {
      this.mouseHovered = false;
    }

    if (millis() - this.attackTime >= 300) {
      this.attacking = false;
    }

    // Check if enemies are close
    //     for (let i = 0; i < enemies.length; i++) {
    //       let enemy = enemies[i];
    //       let distFromEnemy = dist(
    //         this.pos.x,
    //         this.pos.y,
    //         enemy.pos.x,
    //         enemy.pos.y
    //       );

    //       if (
    //         distFromEnemy < this.attackRadius &&
    //         this.enemiesClose.includes(i) == false
    //       ) {
    //         this.enemiesClose.push(i);
    //       }
    //     }

    // Instead of checking which enemiesa are close,
    // just push all of them in to an array and check which ones arent
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

    // if (frameCount % 30 == 0 && this.attackCooldown > 0) {
    //   this.attackCooldown -= 0.5;
    // }

    this.attackCooldown = millis() - this.lastAttack;

    if (this.attackCooldown >= this.attackSpeed) {
      this.canAttack = true;
    } else {
      this.canAttack = false;
    }

    // Failed rotation thing
    // if (this.closestEnemy != -1 && enemies[this.colosestEnemy]) {
    //   let y = enemies[this.closestEnemy].pos.y - this.pos.y;
    //   let x = enemies[this.closestEnemy].pos.x - this.pos.x;
    //   this.rotation = atan2(y, x);
    // }

    for (let bearCave of bearCaves) {
      if (
        dist(this.pos.x, this.pos.y, bearCave.pos.x, bearCave.pos.y) <
          bearCave.attackRadius &&
        bearCave.mode == "tower"
      ) {
        this.attackDamage += bearCave.damageBuff;
        this.attackSpeed -= bearCave.speedBuff;
        
        if (bearCave.seeVPN) {
          this.ninjaPongs = true
        }
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

    if (targetEnemy.maxSpeed > 1) {
      vel = p5.Vector.sub(targetPos, this.pos);
    } else {
      let enemyVel = p5.Vector.copy(targetEnemy.vel);
      enemyVel.mult(16);
      let shootAt = p5.Vector.copy(targetEnemy.pos);
      shootAt = shootAt.add(enemyVel);
      vel = p5.Vector.sub(shootAt, this.pos);
    }

    this.rotation = atan2(vel.y, vel.x);

    vel.mult(this.pongSpeed * 0.05);

    let pong = new Pong(
      this.pos.x,
      this.pos.y,
      vel.x,
      vel.y,
      this.attackDamage,
      this.pongTTL,
      this.ninjaPongs
    );
    pongs.push(pong);

    let pongText = new PongText(this.pos.x, this.pos.y);
    pongTexts.push(pongText);
  }

  towerMenu() {
    if (this.menuOpened) {
      towerMenu();
    }
  }
}
