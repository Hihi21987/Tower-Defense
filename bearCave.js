class BearCave {
  // started on friday
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.type = "bearCave";

    this.r = 25;

    this.pathTooClose = false;
    this.towerTooClose = false;
    this.withinBoundary = false;

    this.canPlace = false;

    this.attackRadius = 80;

    this.damageBuff = 1;
    this.speedBuff = 100;
    this.seeVPN = false;

    this.mode = "ghost";
    this.colour = color("rgb(134,86,12)");

    this.menuOpened = false;
    this.mouseHovered = false;

    // Stuff for first upgrade path
    this.ug1Level = 0;
    this.ug1Label = "Bigger Cave";
    this.ug1Desc = [
      "Bears further away will get boosted!",
      "Bear even further away will get boosted!",
    ];
    this.ug1 = [80, 100, 120];
    this.ug1Price = [80, 130, 200]

    // Stuff for second upgrade path
    this.ug2Level = 0;
    this.ug2Label = "Scary Cave";
    this.ug2Desc = [
      "Increases damage of nearby bears!",
      "Further increases damage of nearby bears!",
    ];
    this.ug2 = [1, 2, 4];
    this.ug2Price = [100, 200, 300]

    // Stuff for third upgrade path
    this.ug3Level = 0;
    this.ug3Label = "Comfy Cave";
    this.ug3Desc = [
      "Nearby bears attack faster!",
      "Nearby bears attack faster and can detect VPN Pings!",
    ];
    this.ug3 = [100, 300, 500];
    this.ug3Price = [200, 300, 500]
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
      bearCavePFP,
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

      if (this.mouseHovered) {
        image(
          bearCavePFPHovered,
          this.pos.x - this.r * 2,
          this.pos.y - this.r * 2,
          this.r * 4,
          this.r * 4
        );
      } else {
        image(
          bearCavePFP,
          this.pos.x - this.r * 2,
          this.pos.y - this.r * 2,
          this.r * 4,
          this.r * 4
        );
      }
    }
  }

  update() {
    // Update upgrades
    // this.pongSharpness = this.ug1[this.ug1Level];
    // this.attackDamage = this.ug2[this.ug2Level];
    // this.attackRadius = this.ug3[this.ug3Level];

    this.attackRadius = this.ug1[this.ug1Level];
    this.damageBuff = this.ug2[this.ug2Level];
    this.speedBuff = this.ug3[this.ug3Level];

    if (this.ug3Level == 3) {
      this.seeVPN = true;
    } else {
      this.seeVPN = false;
    }

    if (dist(mouseX, mouseY, this.pos.x, this.pos.y) < this.r) {
      this.mouseHovered = true;
    } else {
      this.mouseHovered = false;
    }
  }

  towerMenu() {
    if (this.menuOpened) {
      towerMenu();
    }
  }
}
