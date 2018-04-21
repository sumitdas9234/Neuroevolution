//A constant to store the bird sprite
const FLAPPY = "res/bird.png";

//The Bird class to store the state of a bird
class Bird {
  //the constructor function
  constructor(brain) {
    //static x position
    this.x = 150;
    //starting value for the bird, center of the screen vertically
    this.y = 300;
    //load the bird sprite
    this.image = loadImage(FLAPPY);
    //the gravity or the downwards force
    this.gravity = 0.6;
    //the velocity of the bird
    this.velocity = 0;
    //the uplift force applied when the bird is pushed up()
    this.lift = -10;
    //the score of the bird
    this.score = 0;
    //the fitness of the bird in range of 0-1
    this.fitness = 0;
    //if a NeuralNetwork object is passed to the constructor, it gets copied
    //to the bird's brain.
    //important for mutation and crossover
    (brain) && (this.brain = brain.copy());
    //if no brain is passed, create a new brain
    this.brain = new NeuralNetwork(4, 4, 1);
  }
}


//show() to render bird on screen
Bird.prototype.show = function() {
  imageMode(CENTER);
  image(this.image, this.x, this.y, 61, 55);
};


//update() to update the position of bird per frame
Bird.prototype.update = function() {
  //increase the velocity by gravity
  this.velocity += this.gravity;
  //increase the y position by velocity
  this.y += this.velocity;

  //Confine the bird between the boundaries
  if (this.y <= 60 / 2) {
    this.y = 60 / 2;
  } else if (this.y >= height - 60 / 2) {
    this.y = height - 60 / 2;
  }
};

//up() function to move the bird upwards
Bird.prototype.up = function() {
  //increase the velociyt by the lift value
  this.velocity = this.lift;
};


//think() function to make the bird take decision on its own
Bird.prototype.think = function(inputs) {
  //using the nn.js library
  let output = this.brain.predict(inputs);
  //if output > 0.5 then move the bird up
  (output[0] > 0.5) && this.up();
};