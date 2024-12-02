function createTowerButtons() {
  //pongBearButton = createButton("Pong Bear: $" + pbPrice);

  pongBearButton = createImg("/assets/pongBear/price.png", "Pong Bear: $50");
  pongBearButton.style("width", towerButtonW + "px");
  pongBearButton.position(width - sidebarW / 2 - towerButtonW / 2, 20);
  pongBearButton.mouseClicked(() => {
    if (mode == "mouse" && pathCompleted) {
      if (money >= pbPrice) {
        mode = "pongBear";
        let pongBear = new PongBear(mouseX, mouseY);
        pongBears.push(pongBear);
        towers.push(pongBear);
        mouseOutOfMenu = false
      } else {
        notEnoughMoney();
      }
    }
  });
  pongBearButton.hide();

  // iceBearButton = createButton("Ice Bear: $" + ibPrice);

  iceBearButton = createImg("/assets/iceBear/price.png", "Ice Bear: $150");

  iceBearButton.style("width", towerButtonW + "px");
  iceBearButton.position(width - sidebarW / 2 - towerButtonW / 2, 20 + towerButtonW * 0.9);
  iceBearButton.mouseClicked(() => {
    if (mode == "mouse" && pathCompleted) {
      if (money >= ibPrice) {
        mode = "iceBear";
        let iceBear = new IceBear(mouseX, mouseY);
        iceBears.push(iceBear);
        towers.push(iceBear);
        mouseOutOfMenu = false
      } else {
        notEnoughMoney();
      }
    }
  });
  iceBearButton.hide();

  // ninjaBearButton = createButton("Ninja Bear: $" + nbPrice);
  ninjaBearButton = createImg(
    "/assets/ninjaBear/price.png",
    "Ninja Bear: $200"
  );

  ninjaBearButton.style("width", towerButtonW + "px");
  ninjaBearButton.position(
    width - sidebarW / 2 - towerButtonW / 2,
    20 + (towerButtonW * 0.9) * 2
  );
  ninjaBearButton.mouseClicked(() => {
    if (mode == "mouse" && pathCompleted) {
      if (money >= nbPrice) {
        mode = "ninjaBear";
        let ninjaBear = new NinjaBear(mouseX, mouseY);
        ninjaBears.push(ninjaBear);
        towers.push(ninjaBear);
        mouseOutOfMenu = false
      } else {
        notEnoughMoney();
      }
    }
  });
  ninjaBearButton.hide();

  // bearCaveButton = createButton("Bear Cave: $" + bcPrice);

  bearCaveButton = createImg("/assets/bearCave/price.png", "Bear Cave: $50");
  bearCaveButton.style("width", towerButtonW + "px");
  bearCaveButton.position(
    width - sidebarW / 2 - towerButtonW / 2,
    20 + (towerButtonW * 0.9) * 3 - 5
  );
  bearCaveButton.mouseClicked(() => {
    if (mode == "mouse" && pathCompleted) {
      if (money >= bcPrice) {
        mode = "bearCave";
        let bearCave = new BearCave(mouseX, mouseY);
        bearCaves.push(bearCave);
        towers.push(bearCave);
        mouseOutOfMenu = false
      } else {
        notEnoughMoney();
      }
    }
  });
  bearCaveButton.hide();
}
