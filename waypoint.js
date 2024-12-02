class Waypoint {
  constructor(x, y) {
    this.pos = createVector(x, y)
  }
  
  show() {
    fill("magenta")
    circle(this.pos.x, this.pos.y, 10)
  }
}