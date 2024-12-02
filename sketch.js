let waypoints = [];
let startPos, endPos;

let paths = [];
let pathThickness = 40;
let pathCompleted = false;

let enemies = [];

// 5 types of pings
// 1. (normal): 2 speed, 1 health, 1 damage
// 2. (good internet ping): 4 speed, 2 health, 3 damage
// 3. (clustered ping): 2 speed, 3 health, 6 damage
// 4. (vpn ping): 3 speed, 5 health, 10 damage, SPECIAL: requries certain kind of bears
// 5. (office ping): 1 speed, 40 health, 60 damage

let timeRoundStarted = 0;
let timeElapsed = 0;
let spawnDelay = 500;
let roundStarted = false;
let allSpawned = false;
let timeAllSpawned = null;

let pingVariables = [];
let p1 = {
  base: 6,
  maxNum: 0,
  generated: 0,
  genSpeed: 600,
  lastGen: 0,
  canGen: false,
  genDelay: 0,
  allSpawned: false,
};

let p2 = {
  base: 4,
  maxNum: 0,
  generated: 0,
  genSpeed: 300,
  lastGen: 0,
  canGen: false,
  genDelay: spawnDelay + 5000,
  allSpawned: false,
};

let p3 = {
  base: 4,
  maxNum: 0,
  generated: 0,
  genSpeed: 300,
  lastGen: 0,
  canGen: false,
  genDelay: spawnDelay + 5000,
  allSpawned: false,
};

let p4 = {
  base: 3,
  maxNum: 0,
  generated: 0,
  genSpeed: 1200,
  lastGen: 0,
  canGen: false,
  genDelay: spawnDelay + 8000,
  allSpawned: false,
};

let ping5 = {
  base: 0,
  maxNum: 0,
  generated: 0,
  genSpeed: 10000,
  lastGen: 0,
  canGen: false,
  genDelay: spawnDelay + 10000,
  allSpawned: false,
};

let round = 1;
let roundShown = 1;

let sidebarW = 140;
let currSidebarPos = 0;
let menuPadding = 10;
let menuW = sidebarW - menuPadding * 2;
let menuH = 0;

let mode = "mouse";

let mouseOutOfMenu = false;

let towerButtonW = 110;

let towers = [];

let pongBearButton;
let pongBears = [];

let iceBearButton;
let iceBears = [];

let ninjaBearButton;
let ninjaBears = [];

let bearCaveButton;
let bearCaves = [];

let pongs = [];

let towerMenuW = 210;
let towerMenuCloseButton;

let towerMenuTriggered = false;
let towerMenuOpened = "none";

let upgrade1, upgrade2, upgrade3;
let towerPicW = towerMenuW - menuPadding * 2;
let towerPicH = towerPicW;

let ugButtonW = towerPicW - 10;

let pongID = 0;

let money = 100;

let pbPrice = 50;
let ibPrice = 150;
let nbPrice = 200;
let bcPrice = 300;

let state = 0;
let startButton;

let health = 200;
let killed = 0;

let restartButton, returnToMenuButton;

let pongTexts = [];

let pingTowerW = 150;
let pingTowerH = (pingTowerW / 9) * 16;

let pings = [];
let pingMsgW = 300;
let pingMsgH = 50;

let randomName = "";
let randomHint = "This is the best TD game ever!";
let hintGenerated = false;
let lastPing = 0;
let pingIconR = 10;
let currPingType = 0;

let gravity;
let particles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  menuH = height - menuPadding * 2;

  startPos = createVector(0, 0);
  endPos = createVector(0, 0);

  createTowerButtons();
  createTowerMenuButtons();

  startButton = createButton("Play");
  startButton.mouseClicked(() => {
    state = 1;
    generateWaypoints();
    pathCreator = new Enemy(startPos.x, startPos.y, "path");
    startButton.hide();
    link.hide();

    landingPageMusic.stop();
    gamePageMusic.loop();
    gamePageMusic.setVolume(0.05);
  });
  startButton.style("width", "200px");
  startButton.style("height", "80px");
  startButton.style("font-size", "50px");
  startButton.position(width / 2 - 100, (height / 3) * 2 - 40);
  startButton.class("start-button");

  restartButton = createButton("Play Again");
  restartButton.style("width", "220px");
  restartButton.style("height", "60px");
  restartButton.style("font-size", "25px");
  restartButton.position(width / 2 - 110, (height / 3) * 2 - 30);
  restartButton.mouseClicked(() => {
    killed = 0;
    state = 1;
    generateWaypoints();
    pathCreator = new Enemy(startPos.x, startPos.y, "path");
    restartButton.hide();
    returnToMenuButton.hide();
    gamePageMusic.stop();
    gamePageMusic.loop();
    gamePageMusic.setVolume(0.05);
  });
  restartButton.hide();
  restartButton.class("start-button");

  returnToMenuButton = createButton("Return to Menu");
  returnToMenuButton.style("width", "220px");
  returnToMenuButton.style("height", "60px");
  returnToMenuButton.style("font-size", "25px");
  returnToMenuButton.position(width / 2 - 110, (height / 3) * 2 - 30 + 60 + 5);
  returnToMenuButton.mouseClicked(() => {
    pathCreator = new Enemy(-pathThickness, startPos.y, "path");
    killed = 0;
    state = 0;
    restartButton.hide();
    returnToMenuButton.hide();
    gamePageMusic.stop();
    landingPageMusic.loop();
    landingPageMusic.setVolume(0.05);
  });
  returnToMenuButton.hide();
  returnToMenuButton.class("start-button");

  pingVariables.push(p1);
  pingVariables.push(p2);
  pingVariables.push(p3);
  pingVariables.push(p4);
  pingVariables.push(ping5); // p5 is a reserved word

  link = createA(
    "https://www.notion.so/daviercep/How-do-I-play-this-game-0ff541305af6442eb1c5d35896234892?pvs=4",
    "How do I play this?",
    "_blank"
  );
  link.position(
    width / 2 - textWidth("How do I play this?        ") / 2,
    (height / 3) * 2 + 30 + 15
  );
  link.hide();

  gravity = createVector(0, 1);

  landingPageMusic.loop();
  landingPageMusic.setVolume(0.05);
}

function draw() {
  background("rgb(227,212,178)");

  if (state == 0) {
    // landing page
    startButton.show();
    link.show();

    textAlign(CENTER, CENTER);
    textFont(gagalin);
    strokeWeight(8);
    stroke(255);
    fill("rgb(122,103,60)");

    let pongTextSize = 100 + width / 50;
    let tdTextSize = 40 + width / 50;

    textSize(pongTextSize);
    text("Pong", width / 2, height / 3 - pongTextSize + 30);
    textSize(tdTextSize);
    text("Tower Defence", width / 2, height / 3);
  } else if (state == 1) {
    // Put this in front so it will not cover others
    for (let path of paths) {
      fill("rgb(198,164,120)");
      noStroke();
      circle(path.x, path.y, pathThickness);
    }

    // Ping tower
    image(
      pingTower,
      20 + 9,
      startPos.y - pingTowerH + 32,
      pingTowerW,
      pingTowerH
    );

    if (!pathCompleted) {
      //pathCreator.show();
      pathCreator.update();
      paths.push(createVector(pathCreator.pos.x, pathCreator.pos.y));

      if (waypoints.length > 0) {
        pathCreator.gotoWp(waypoints[pathCreator.wpNumber].pos);
        pathCreator.checkWp(waypoints[pathCreator.wpNumber].pos, waypoints);
      }

      if (pathCreator.completedPath(waypoints)) {
        pathCompleted = true;
        //timeRoundStarted = millis();
        p1.lastGen = millis();
      }

      // Sidebar animation
      if (currSidebarPos < sidebarW) {
        currSidebarPos += (sidebarW - currSidebarPos) * 0.07;
      } else {
        currSidebarPos = sidebarW;
      }
      fill("rgb(155,136,93)");
      noStroke();
      rect(width - currSidebarPos, 0, sidebarW, height);
    } else if (pathCompleted) {
      if (!roundStarted) {
        // in between rounds
        // Set numer of pings for next round

        // Normal pings
        p1.maxNum = p1.base + 2 * (round - 1);

        // Fast pings
        if (round >= 3) {
          p2.maxNum = p2.base + 3 * (round - 3);
        } else {
          p2.maxNum = 0;
        }

        // Clustered pings
        if (round >= 6) {
          p3.maxNum = p3.base + 4 * (round - 6);
        } else {
          p3.maxNum = 0;
        }

        // VPN pings
        if (round >= 9) {
          p4.maxNum = p4.base + 2 * (round - 9);
        } else {
          p4.maxNum = 0;
        }

        // MOABs
        if (round % 10 == 0) {
          // MOAB spawns every 10 rounds
          ping5.maxNum = round / 10;
        } else {
          ping5.maxNum = 0;
        }

        // Make the pings clump together so each round doesnt take an hour
        for (let pingVar of pingVariables) {
          if (pingVar.maxNum < 20) {
            pingVar.genSpeed = 600;
          } else if (pingVar.maxNum < 50) {
            pingVar.genSpeed = 300;
          } else {
            pingVar.genSpeed = 100;
          }
        }

        // Start new round
        timeRoundStarted = millis();
        roundStarted = true;
        allSpawned = false;
        timeAllSpawned = null;

        // THIS TOOK OVER AN HOUR TO FIX
        for (let i = 0; i < pingVariables.length; i++) {
          pingVariables[i].allSpawned = false;
        }
      } else if (roundStarted) {
        timeElapsed = millis() - timeRoundStarted;

        // Generating pings as ronud goes on
        if (timeElapsed >= spawnDelay) {
          roundShown = round;
          for (let i = 0; i < pingVariables.length; i++) {
            let pingVar = pingVariables[i];
            // Generate pings
            if (
              pingVar.generated < pingVar.maxNum &&
              pingVar.canGen &&
              timeElapsed >= pingVar.genDelay
            ) {
              // Actually generate enemies here

              // let enemy = new Enemy(startPos.x, startPos.y, i + 1);
              // enemies.push(enemy);

              let ping = new Ping(i + 1);
              pings.push(ping);
              pingVar.generated++;
              pingVar.lastGen = millis();

              // name for the ping text
              randomName = random(names);
              lastPing = millis();
              currPingType = i + 1;
            }

            // Check pings' generation cooldown
            if (millis() - pingVar.lastGen >= pingVar.genSpeed) {
              pingVar.canGen = true;
            } else {
              pingVar.canGen = false;
            }

            // Check if all pings of that type is generated
            if (pingVar.generated == pingVar.maxNum) {
              pingVar.allSpawned = true;
            } else {
              pingVar.allSpanwed = false;
            }
          }

          // Check if all pings for that round has spawned
          allSpawned = pingVariables.every((pingVar) => pingVar.allSpawned);

          // Check if round is over - now a round is over when all pings are spawned
          if (allSpawned) {
            if (!hintGenerated) {
              randomHint = random(hints);
              hintGenerated = true;
            }
            if (timeAllSpawned == null) {
              timeAllSpawned = millis();
            } else {
              if (millis() - timeAllSpawned >= 8000) {
                // Reset stuff
                for (let i = 0; i < pingVariables.length; i++) {
                  pingVariables[i].generated = 0;
                }
                round++;
                roundStarted = false;
                allSpawned = false;
                currSidebarPos = 0;
                hintGenerated = false;
              }
            }
          }
        }
      }

      // Tower placing stuff
      if (mode != "mouse") {
        // user has clikced a tower button
        if (!mouseOutOfMenu) {
          // mouse is still within tower menu
          if (mouseX < width - sidebarW) {
            mouseOutOfMenu = true;
          }
        } else if (mouseOutOfMenu) {
          // mouse left tower menu
          if (mouseX > width - sidebarW) {
            // mouse left tower menu but came back
            // cancel placing
            towers.splice(towers[towers.length - 1], 1);

            if (mode == "pongBear") {
              pongBears.splice(pongBears.length - 1, 1);
            } else if (mode == "iceBear") {
              iceBears.splice(iceBears.length - 1, 1);
            } else if (mode == "ninjaBear") {
              ninjaBears.splice(ninjaBears.length - 1, 1);
            } else if (mode == "bearCave") {
              bearCaves.splice(bearCaves.length - 1, 1);
            }

            mode = "mouse";
          }
        }
      }

      for (let ping of pings) {
        ping.show();
        ping.update();
      }

      for (let i = pings.length - 1; i >= 0; i--) {
        if (pings[i].checkReached()) {
          let enemy = new Enemy(startPos.x, startPos.y, pings[i].type);
          enemies.push(enemy);

          pings.splice(i, 1);
        }
      }

      for (let enemy of enemies) {
        enemy.updateType();
        enemy.checkPonged();

        enemy.gotoWp(paths[enemy.wpNumber]);
        enemy.checkWp(paths[enemy.wpNumber], paths);

        enemy.update();
        enemy.show();
      }

      for (let i = enemies.length - 1; i >= 0; i--) {
        if (enemies[i].completedPath(paths)) {
          if (health > 0) {
            health -= enemies[i].damage;
            healthLost();
          } else {
            state = 2;
          }
          enemies.splice(i, 1);
        } else if (enemies[i].alive == false) {
          enemies.splice(i, 1);
          pongSound.play();
          killed++;
        }
      }

      if (health <= 0) {
        state = 2;
      }

      for (let pongBear of pongBears) {
        if (pongBear.mode == "tower") {
          pongBear.show();
          pongBear.update();
          pongBear.attack();
          pongBear.towerMenu();
        }
      }

      for (let iceBear of iceBears) {
        if (iceBear.mode == "tower") {
          iceBear.show();
          iceBear.update();
          iceBear.attack();
          iceBear.towerMenu();
        }
      }

      for (let ninjaBear of ninjaBears) {
        if (ninjaBear.mode == "tower") {
          ninjaBear.show();
          ninjaBear.update();
          ninjaBear.attack();
          ninjaBear.towerMenu();
        }
      }

      for (let bearCave of bearCaves) {
        if (bearCave.mode == "tower") {
          bearCave.show();
          bearCave.update();
          bearCave.towerMenu();
          //bearCave.buffBears()
        }
      }

      for (let pong of pongs) {
        pong.show();
        pong.update();
      }

      for (let pongText of pongTexts) {
        pongText.show();
        pongText.update();
      }

      for (let i = pongTexts.length - 1; i > 0; i--) {
        let pongText = pongTexts[i];
        if (pongText.alphaVal < 0) {
          pongTexts.splice(i, 1);
        }
      }

      for (let i = pongs.length - 1; i >= 0; i--) {
        //console.log(pongs[i].checkTTL())
        if (pongs[i].checkOut()) {
          pongs.splice(i, 1);
        }
      }

      // Particles
      for (let ball of particles) {
        ball.applyForce(gravity);
        ball.show();
        ball.update();
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        if (particles[i].checkOut()) {
          particles.splice(i, 1);
        }
      }

      // Ping messages
      if (millis() - lastPing >= 2500) {
        randomName = "";
        currPingType = 0;
      }

      // put this in front to calculate its textWidth()
      let pingType = "";
      let pingColour = color(0);
      if (currPingType == 1) {
        pingColour = color("red");
        pingType = "Normal";
      } else if (currPingType == 2) {
        pingColour = color("blue");
        pingType = "Good Internet";
      } else if (currPingType == 3) {
        pingColour = color("rgb(0,213,28)");
        pingType = "Clustered";
      } else if (currPingType == 4) {
        pingColour = color(0);
        pingType = "VIP";
      } else if (currPingType == 5) {
        pingColour = color("rgb(156,0,156)");
        pingType = "Office";
      }

      let pingText = "";
      if (randomName == "") {
        pingText = "Hint: " + randomHint;
      } else {
        pingText = `${pingType} Ping from ${randomName} incoming!`;
      }

      // Ping icon stuff
      if (currPingType != 0) {
        // Background rectangle
        fill("rgb(155,136,93)");
        stroke(255);
        strokeWeight(1);
        textSize(20);
        rect(
          10,
          10,
          25 + pingIconR * 2 + textWidth(pingText) + 20,
          pingMsgH,
          10
        );

        noStroke();
        fill(pingColour);
        circle(25 + pingIconR, 10 + pingMsgH / 2, pingIconR * 2);

        // ping texts
        stroke(0);
        fill(255);
        textAlign(LEFT, CENTER);
        textSize(20);
        textFont(chewy);
        text(pingText, 25 + pingIconR + 20, 7 + pingMsgH / 2);
      } else {
        // Background rectangle
        fill("rgb(155,136,93)");
        stroke(255);
        strokeWeight(1);
        textSize(20);
        rect(10, 10, 20 + textWidth(pingText) + 20, pingMsgH, 10);

        stroke(0);
        fill(255);
        textAlign(LEFT, CENTER);
        textSize(20);
        textFont(chewy);
        text(pingText, 25, 7 + pingMsgH / 2);
      }

      // Player stats stuff
      textFont(chewy);
      fill("rgb(122,103,60)");
      textSize(20 + width / 120);
      stroke(255);
      strokeWeight(2);

      // Texts in the centre of screen
      textAlign(CENTER, TOP);
      let moneyHealthText = "$" + money + "    Health: " + health;
      text(moneyHealthText, (width - sidebarW) / 2, 20);

      // Texts in the top right
      textAlign(RIGHT, TOP);
      let roundText = "Round: " + roundShown;

      if (towerMenuOpened == "none") {
        text(roundText, width - sidebarW - 20, 20);
      } else {
        text(roundText, width - sidebarW - 20 - towerMenuW, 20);
      }
      

      // Tower menu
      // menu after the tower stuff so it covers the towers

      fill("rgb(155,136,93)");
      noStroke();
      rect(width - sidebarW, 0, sidebarW, height);

      fill("rgb(122,103,60)");
      noStroke();
      rect(width - menuW - menuPadding, menuPadding, menuW, menuH, 30);

      pongBearButton.show();
      iceBearButton.show();
      ninjaBearButton.show();
      bearCaveButton.show();

      if (money >= pbPrice) {
        pongBearButton.class("tower-button");
      } else {
        pongBearButton.class("tower-button-disabled");
      }

      if (money >= ibPrice) {
        iceBearButton.class("tower-button");
      } else {
        iceBearButton.class("tower-button-disabled");
      }

      if (money >= nbPrice) {
        ninjaBearButton.class("tower-button");
      } else {
        ninjaBearButton.class("tower-button-disabled");
      }

      if (money >= bcPrice) {
        bearCaveButton.class("tower-button");
      } else {
        bearCaveButton.class("tower-button-disabled");
      }

      if (towerMenuOpened != "none") {
        if (money >= towerMenuOpened.ug1Price[towerMenuOpened.ug1Level]) {
          if (towerMenuOpened.ug1Level >= 2) {
            upgrade1.class("upgrade-button-maxed");
          } else {
            upgrade1.class("upgrade-button");
          }
        } else {
          upgrade1.class("upgrade-button-disabled");
        }

        if (money >= towerMenuOpened.ug2Price[towerMenuOpened.ug2Level]) {
          if (towerMenuOpened.ug2Level >= 2) {
            upgrade2.class("upgrade-button-maxed");
          } else {
            upgrade2.class("upgrade-button");
          }
        } else {
          upgrade2.class("upgrade-button-disabled");
        }

        if (money >= towerMenuOpened.ug3Price[towerMenuOpened.ug3Level]) {
          if (towerMenuOpened.ug3Level >= 2) {
            upgrade3.class("upgrade-button-maxed");
          } else {
            upgrade3.class("upgrade-button");
          }
        } else {
          upgrade3.class("upgrade-button-disabled");
        }
      }

      // Placing should be after tower menu so we can see the dude after the button is clicked
      if (mode == "pongBear") {
        pongBears[pongBears.length - 1].placing();
      } else if (mode == "iceBear") {
        iceBears[iceBears.length - 1].placing();
      } else if (mode == "ninjaBear") {
        ninjaBears[ninjaBears.length - 1].placing();
      } else if (mode == "bearCave") {
        bearCaves[bearCaves.length - 1].placing();
      }
    }

    //quickly trigger end game for testing
    // if (timeElapsed > 1000) {
    //   state = 2;
    // }
  } else if (state == 2) {
    // Game over page
    pongBearButton.hide();
    iceBearButton.hide();
    ninjaBearButton.hide();
    bearCaveButton.hide();

    restartButton.show();
    returnToMenuButton.show();

    // Reset all stuff
    waypoints = [];
    paths = [];
    pathCompleted = false;
    enemies = [];
    timeRoundStarted = 0;
    timeElapsed = 0;
    roundStarted = false;
    allSpanwed = false;
    round = 1;
    mode = "mouse";
    towers = [];
    pongBears = [];
    iceBears = [];
    ninjaBears = [];
    bearCaves = [];
    pongs = [];
    towerMenuTriggered = false;
    towerMenuOpened = "none";
    pongID = 0;
    money = 100;
    health = 200;
    towerMenuCloseButton.hide();
    upgrade1.hide();
    upgrade2.hide();
    upgrade3.hide();

    textAlign(CENTER, CENTER);

    fill("rgb(122,103,60)");
    stroke(255);
    strokeWeight(8);
    textFont(gagalin);

    let gameOverSize = 70 + width / 50;
    textSize(gameOverSize);
    text("Game Over!", width / 2, height / 3);

    textFont(chewy);
    textSize(20 + width / 50);
    text(
      "You ponged " + killed + " pings!",
      width / 2,
      height / 3 + gameOverSize
    );
  }

  // Hide all waypoints
  // for (let wp of waypoints) {
  //   wp.show();
  // }
}

function notEnoughMoney() {}

function generateWaypoints() {
  let wpInterval = 50;
  let sideBuffer = 70;
  let maxWp = (width - sidebarW - pingTowerW / 2 - 20) / wpInterval;
  let wpHeights = [];

  let randomAmt = random(100, 140);

  for (let i = 0; i < maxWp; i++) {
    let x =
      (i * (width - sidebarW - pingTowerW / 2 - 20)) / maxWp +
      pingTowerW / 2 +
      20;
    let mappedNoise = map(noise(i * 0.3), 0, 1, -height * 0.3, height * 1.3);
    let y = 0;

    if (i == 0) {
      // Make sure the whole tower can fit
      y = constrain(mappedNoise, pingTowerH * 1.3, height - sideBuffer * 2);
    } else {
      y = constrain(mappedNoise, sideBuffer * 2, height - sideBuffer * 2);
    }

    waypoints.push(new Waypoint(x, y));
    wpHeights.push(y);
  }

  let finalWpX = waypoints[waypoints.length - 1].pos.x + pathThickness * 1.5;
  let finalWpY = waypoints[waypoints.length - 1].pos.y;
  waypoints.push(new Waypoint(finalWpX, finalWpY));

  // Change second waypoint so the path always starts by going dowwards
  if (waypoints[0].pos.y > height - randomAmt - sideBuffer * 2) {
    waypoints[0].pos.y -= randomAmt;
  }

  waypoints[1].pos.y = waypoints[0].pos.y + randomAmt;
  waypoints[1].pos.y = constrain(
    waypoints[1].pos.y,
    sideBuffer * 2,
    height - sideBuffer * 2
  );

  startPos.x = waypoints[0].pos.x;
  startPos.y = waypoints[0].pos.y;

  endPos.x = waypoints[waypoints.length - 1].pos.x;
  endPos.y = waypoints[waypoints.length - 1].pos.y;
}

function mouseClicked() {
  towerMenuTriggered = false;

  if (mode == "pongBear") {
    if (pongBears[pongBears.length - 1].canPlace == true) {
      placeSound.play();
      pongBears[pongBears.length - 1].mode = "tower";
      money -= pbPrice;
      mode = "mouse";
      genParticles(pongBears[pongBears.length - 1]);
    }
  } else if (mode == "iceBear") {
    if (iceBears[iceBears.length - 1].canPlace == true) {
      placeSound.play();
      iceBears[iceBears.length - 1].mode = "tower";
      money -= ibPrice;
      mode = "mouse";
      genParticles(iceBears[iceBears.length - 1]);
    }
  } else if (mode == "ninjaBear") {
    if (ninjaBears[ninjaBears.length - 1].canPlace == true) {
      placeSound.play();
      ninjaBears[ninjaBears.length - 1].mode = "tower";
      money -= nbPrice;
      mode = "mouse";
      genParticles(ninjaBears[ninjaBears.length - 1]);
    }
  } else if (mode == "bearCave") {
    if (bearCaves[bearCaves.length - 1].canPlace == true) {
      placeSound.play();
      bearCaves[bearCaves.length - 1].mode = "tower";
      money -= bcPrice;
      mode = "mouse";
      genParticles(bearCaves[bearCaves.length - 1]);
    }
  } else if (mode == "mouse") {
    for (let pongBear of pongBears) {
      if (pongBear.mode == "tower" && pongBear.mouseHovered) {
        closeTowerMenu();
        pongBear.menuOpened = true;
        towerMenuCloseButton.show();
        towerMenuTriggered = true;
        towerMenuOpened = pongBear;
        changeUgButtons(pongBear);
        upgrade1.show();
        upgrade2.show();
        upgrade3.show();
      }
    }

    for (let iceBear of iceBears) {
      if (iceBear.mode == "tower" && iceBear.mouseHovered) {
        closeTowerMenu();
        iceBear.menuOpened = true;
        towerMenuCloseButton.show();
        towerMenuTriggered = true;
        towerMenuOpened = iceBear;
        changeUgButtons(iceBear);
        upgrade1.show();
        upgrade2.show();
        upgrade3.show();
      }
    }

    for (let ninjaBear of ninjaBears) {
      if (ninjaBear.mode == "tower" && ninjaBear.mouseHovered) {
        closeTowerMenu();
        ninjaBear.menuOpened = true;
        towerMenuCloseButton.show();
        towerMenuTriggered = true;
        towerMenuOpened = ninjaBear;
        changeUgButtons(ninjaBear);
        upgrade1.show();
        upgrade2.show();
        upgrade3.show();
      }
    }

    for (let bearCave of bearCaves) {
      if (bearCave.mode == "tower" && bearCave.mouseHovered) {
        closeTowerMenu();
        bearCave.menuOpened = true;
        towerMenuCloseButton.show();
        towerMenuTriggered = true;
        towerMenuOpened = bearCave;
        changeUgButtons(bearCave);
        upgrade1.show();
        upgrade2.show();
        upgrade3.show();
      }
    }

    if (mouseX < width - sidebarW - towerMenuW && towerMenuTriggered == false) {
      closeTowerMenu();
    }
  }
}

function closeTowerMenu() {
  if (towerMenuOpened != "none") {
    towerMenuOpened.menuOpened = false;
    towerMenuCloseButton.hide();
    towerMenuOpened = "none";
    upgrade1.hide();
    upgrade2.hide();
    upgrade3.hide();
  }
}

function changeUgButtons(tower) {
  let ug1Label = tower.ug1Label;
  let ug1Desc = "Maxed";
  let ug1Price = "";

  if (tower.ug1Level < 2) {
    ug1Desc = tower.ug1Desc[tower.ug1Level];
    ug1Price = ": $" + tower.ug1Price[tower.ug1Level];
  }

  let ug2Label = tower.ug2Label;
  let ug2Desc = "Maxed";
  let ug2Price = "";

  if (tower.ug2Level < 2) {
    ug2Desc = tower.ug2Desc[tower.ug2Level];
    ug2Price = ": $" + tower.ug2Price[tower.ug2Level];
  }

  let ug3Label = tower.ug3Label;
  let ug3Desc = "Maxed";
  let ug3Price = "";

  if (tower.ug3Level < 2) {
    ug3Desc = tower.ug3Desc[tower.ug3Level];
    ug3Price = ": $" + tower.ug3Price[tower.ug3Level];
  }

  upgrade1.html(`
<div class="upgrade-button-content">
    <div class="upgrade-button-heading">${ug1Label}${ug1Price}</div>
    <div class="upgrade-button-desc">${ug1Desc}</div>
<div>
  `);

  upgrade2.html(`
<div class="upgrade-button-content">
    <div class="upgrade-button-heading">${ug2Label}${ug2Price}</div>
    <div class="upgrade-button-desc">${ug2Desc}</div>
<div>
  `);

  upgrade3.html(`
<div class="upgrade-button-content">
    <div class="upgrade-button-heading">${ug3Label}${ug3Price}</div>
    <div class="upgrade-button-desc">${ug3Desc}</div>
<div>
  `);

  if (tower.ug1Level >= 2) {
    upgrade1.class("upgrade-button-maxed");
  } else {
    upgrade1.class("upgrade-button");
  }

  if (tower.ug2Level >= 2) {
    upgrade2.class("upgrade-button-maxed");
  } else {
    upgrade2.class("upgrade-button");
  }

  if (tower.ug3Level >= 2) {
    upgrade3.class("upgrade-button-maxed");
  } else {
    upgrade3.class("upgrade-button");
  }
}

function towerMenu() {
  // Menu background
  noStroke();
  fill("rgb(140,123,84)");
  rect(width - sidebarW - towerMenuW, 0, towerMenuW, height);

  noStroke();
  fill("rgb(122,103,60)");
  rect(
    width - sidebarW - towerMenuW + menuPadding,
    menuPadding,
    towerMenuW - menuPadding * 2,
    height - menuPadding * 2,
    30
  );

  stroke("rgb(75,59,44)");
  strokeWeight(1);
  line(width - sidebarW, 0, width - sidebarW, height);

  // Actual menu stuff

  // bear name
  textFont(gagalin);
  textSize(towerMenuW / 7);
  fill(255);
  stroke(0);
  strokeWeight(5);
  textAlign(CENTER, TOP);

  let bearName;

  if (towerMenuOpened.type == "pongBear") {
    bearName = "Pong Bear";
  } else if (towerMenuOpened.type == "iceBear") {
    bearName = "Ice Bear";
  } else if (towerMenuOpened.type == "ninjaBear") {
    bearName = "Ninja Bear";
  } else if (towerMenuOpened.type == "bearCave") {
    bearName = "Bear Cave";
  }

  text(bearName, width - sidebarW - towerMenuW / 2, menuPadding * 2.5);

  // bear image
  let pfp;
  if (towerMenuOpened.type == "pongBear") {
    pfp = pongBearPFP;
  } else if (towerMenuOpened.type == "iceBear") {
    pfp = iceBearPFP;
  } else if (towerMenuOpened.type == "ninjaBear") {
    pfp = ninjaBearPFP;
  } else if (towerMenuOpened.type == "bearCave") {
    pfp = bearCavePFP;
  }
  image(
    pfp,
    width - sidebarW - towerMenuW + menuPadding,
    menuPadding,
    towerPicW,
    towerPicH
  );

  textFont(chewy);
  textAlign(LEFT, TOP);
  textSize(towerMenuW / 12);
  fill(255);
  stroke(0);
  strokeWeight(1);

  text(
    "Atk Cooldown: " + towerMenuOpened.attackSpeed + " ms",
    width - sidebarW - towerMenuW + menuPadding * 2,
    towerPicH
  );
  text(
    "Atk Damage: " + towerMenuOpened.attackDamage,
    width - sidebarW - towerMenuW + menuPadding * 2,
    towerPicH + 20
  );
}

function healthLost() {}
