function createTowerMenuButtons() {
  towerMenuCloseButton = createButton("x");
  towerMenuCloseButton.style("width", "30px");
  towerMenuCloseButton.position(
    width - sidebarW - 30 - menuPadding,
    menuPadding
  );
  towerMenuCloseButton.mouseClicked(closeTowerMenu);
  towerMenuCloseButton.hide();
  towerMenuCloseButton.class("close-button");

  upgrade1 = createButton("Upgrade 1");
  upgrade1.style("width", ugButtonW + "px");
  upgrade1.position(
    width - sidebarW - towerMenuW + (towerMenuW - ugButtonW) / 2,
    towerPicH + menuPadding + 50
  );
  upgrade1.mouseClicked(() => {
    let price = towerMenuOpened.ug1Price[towerMenuOpened.ug1Level];

    if (towerMenuOpened.ug1Level < 2 && money >= price) {
      towerMenuOpened.ug1Level += 1;
      changeUgButtons(towerMenuOpened);
      genParticles(towerMenuOpened);
      money -= price;
    }
  });
  upgrade1.hide();

  upgrade2 = createButton("Upgrade 2");
  upgrade2.style("width", ugButtonW + "px");
  upgrade2.position(
    width - sidebarW - towerMenuW + (towerMenuW - ugButtonW) / 2,
    towerPicH + menuPadding + 50 + 75
  );
  upgrade2.mouseClicked(() => {
    let price = towerMenuOpened.ug2Price[towerMenuOpened.ug2Level];

    if (towerMenuOpened.ug2Level < 2 && money >= price) {
      towerMenuOpened.ug2Level += 1;
      changeUgButtons(towerMenuOpened);
      genParticles(towerMenuOpened);
      money -= price;
    }

    if (towerMenuOpened.ug2Level >= 2) {
      upgrade2.class("upgrade-button-maxed");
    } else {
      upgrade2.class("upgrade-button");
    }
  });
  upgrade2.hide();

  upgrade3 = createButton("Upgrade 3");
  upgrade3.style("width", ugButtonW + "px");
  upgrade3.position(
    width - sidebarW - towerMenuW + (towerMenuW - ugButtonW) / 2,
    towerPicH + menuPadding + 50 + 75 + 75
  );
  upgrade3.mouseClicked(() => {
    let price = towerMenuOpened.ug3Price[towerMenuOpened.ug3Level];

    if (towerMenuOpened.ug3Level < 2 && money >= price) {
      towerMenuOpened.ug3Level += 1;
      changeUgButtons(towerMenuOpened);
      genParticles(towerMenuOpened);
      money -= price;
    }

    if (towerMenuOpened.ug3Level >= 2) {
      upgrade3.class("upgrade-button-maxed");
    } else {
      upgrade3.class("upgrade-button");
    }
  });
  upgrade3.hide();

  upgrade1.class("upgrade-button");
  upgrade2.class("upgrade-button");
  upgrade3.class("upgrade-button");
}

function genParticles(target) {
  for (let i = 0; i < random(10, 20); i++) {
    let colour = color(244, 252, 3);

    let ball = new Particle(
      target.pos.x,
      target.pos.y,
      colour
    );

    ball.vel.y = random(-10, -15);
    ball.vel.x = random(-8, 8);
    ball.r = random(4, 6);
    particles.push(ball);
  }
}
