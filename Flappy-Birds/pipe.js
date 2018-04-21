//The Pipe class to create and update the pipes
class Pipe {
  //the constructor function to initialize
  constructor() {
    //get a random value between 0 and height of canvas
    this.top = random(40, height - 200);
    //get a random value for bottom, making sure the gap is enough for the bird to pass
    this.bottom = this.top + random(120, 180);
    //speed for the movement of pipes
    this.speed = 7;
    //the x position of the pipes
    this.x = width;
    //the width of the pipes
    this.width = 45;
    //the color of the pipes
    this.color = color(72, 84, 96);
  }
}


//the show() function to render the pipes
Pipe.prototype.show = function() {
  fill(this.color);
  noStroke();
  rect(this.x, 0, this.width, this.top);
  rect(this.x, this.bottom, this.width, height - this.bottom);
};


//the update() function to make the pipes move
Pipe.prototype.update = function() {
  this.x -= this.speed;
};


//the hits() function to check if bird hits pipe
Pipe.prototype.hits = function(bird) {
  return (bird.y < this.top || bird.y > this.bottom) && (bird.x > this.x && bird.x < this.x + this.width);
};