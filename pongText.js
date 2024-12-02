class PongText {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.alphaVal = 255
  }
  
  show() {
    textAlign(CENTER, CENTER);
    fill(122, 103, 60, this.alphaVal)
    textSize(18);
    // stroke(0)
    // strokeWeight(1)
    noStroke()
    textFont(chewy)
    text("Pong!", this.pos.x, this.pos.y);
  }

  update() {
    this.pos.y -= 5
    this.alphaVal -= 5
  }
}
