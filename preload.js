function preload() {
    pongBearPFP = loadImage("/assets/pongBear/5.png");
    pongBearIdle = loadImage("/assets/pongBear/1.png");
    pongBearAttack = loadImage("/assets/pongBear/2.png");
    pongBearIdleHovered = loadImage("/assets/pongBear/3.png");
    pongBearAttackHovered = loadImage("/assets/pongBear/4.png");
  
    iceBearPFP = loadImage("/assets/iceBear/10.png");
    iceBearIdle = loadImage("/assets/iceBear/6.png");
    iceBearAttack = loadImage("/assets/iceBear/7.png");
    iceBearIdleHovered = loadImage("/assets/iceBear/8.png");
    iceBearAttackHovered = loadImage("/assets/iceBear/9.png");
  
    ninjaBearPFP = loadImage("/assets/ninjaBear/15.png");
    ninjaBearIdle = loadImage("/assets/ninjaBear/11.png");
    ninjaBearAttack = loadImage("/assets/ninjaBear/12.png");
    ninjaBearIdleHovered = loadImage("/assets/ninjaBear/13.png");
    ninjaBearAttackHovered = loadImage("/assets/ninjaBear/14.png");
  
    bearCavePFP = loadImage("/assets/bearCave/cave.png");
    bearCavePFPHovered = loadImage("/assets/bearCave/caveHovered.png");
  
    pongSound = loadSound("/assets/pop.mp3");
    iceSound = loadSound("/assets/ice.mp3");
    placeSound = loadSound("/assets/place.mp3");
    
    chewy = loadFont("/assets/fonts/Chewy-Regular.ttf")
    gagalin = loadFont("/assets/fonts/Gagalin-Regular.otf")

    pingTower = loadImage("/assets/pingTower.png")

    landingPageMusic = loadSound("/assets/music/landingPage.mp3");
    gamePageMusic = loadSound("/assets/music/gamePage.mp3")
  }