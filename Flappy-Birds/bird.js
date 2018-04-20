const FLAPPY = "res/bird.png";

class Bird {
  constructor() {
    this.x = 100;
    this.y = 300;
    this.image = loadImage(FLAPPY);
    this.gravity = 0.6;
    this.velocity = 0;
    this.lift = -10;
    this.score = 0;
  }
}
Bird.prototype.show = function() {
  imageMode(CENTER);
  image(this.image, this.x, this.y, 61, 55);
};

Bird.prototype.update = function() {
  this.velocity += this.gravity;
  this.y += this.velocity;
  if (this.y <= 60 / 2) {
    this.y = 60 / 2;
  } else if (this.y >= height - 60 / 2) {
    this.y = height - 60 / 2;
  }
};


Bird.prototype.up = function() {
  this.velocity = this.lift;
};