class Pipe {
  constructor() {
    this.top = random(40, height - 200);
    this.bottom = this.top + random(120, 200);
    this.speed = 2;
    this.x = width;
    this.width = 45;
    this.color = color(72, 84, 96);
  }
}

Pipe.prototype.show = function() {
  fill(this.color);
  noStroke();
  rect(this.x, 0, this.width, this.top);
  rect(this.x, this.bottom, this.width, height - this.bottom);
};

Pipe.prototype.update = function() {
  this.x -= this.speed;
};

Pipe.prototype.hits = function(bird) {
  return (bird.y < this.top || bird.y > this.bottom) && (bird.x > this.x && bird.x < this.x + this.width);
};