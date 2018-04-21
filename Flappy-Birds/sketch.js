const TOTAL = 500; //Individual birds per generation
var canvas, counter = 0; //counter to generate pipes per 120th frame, also resets the game after a generation
var birds = []; //save the current alive birds
var pipes = []; //save the pipes on screen
let inputs = []; //inputs to the neural network aka bird's brain
let savedBirds = []; // save the dead birds for next generation's pool selection


//the setup() runs only once before the game renders
function setup() {
  //create the canvas with desired size
  canvas = createCanvas(900, 600);
  //generate new Birds for initial population
  for (let i = 0; i < TOTAL; i++) {
    birds.push(new Bird());
  }
}


//the draw function runs every frame. e.g 30fps or 60fps
function draw() {
  //draw the background
  background(color(247, 215, 148));


  //create new pipes every 120th frame
  (counter % 120 == 0) && pipes.push(new Pipe());
  //increase the counter
  counter++;
  //display the birds score
  showScore(birds[0]); // TODO: create a function to find the bird with highest score and should be alive/should be in the birds[]


  //for every pipe in pipes
  for (let i = pipes.length - 1; i > 0; i--) {
    //find the pipes which are offscreen and remove it
    (pipes[i].x < (0 - pipes[i].width)) && pipes.splice(i, 1);
    //for every bird in biords
    for (let j = 0; j < birds.length; j++) {
      //increase the score
      birds[j].score++;
      //if bird hits any pipe, remove it and save it to savedBirds
      pipes[i].hits(birds[j]) && savedBirds.push(birds.splice(j, 1)[0]);
    }
    //show the pipes
    pipes[i].show();
    //update the pipes
    pipes[i].update();
  }



  // A small workaround to get the nearest pipe to the bird
  let closest = null;
  let dis = Infinity;
  for (pipe of pipes) {
    if (pipe.x - 150 < dis && pipe.x - 150 > 0) {
      closest = pipe;
      distance = pipe.x - 150;
    }
  }

  //pass the inputs for the bird to predict its movement
  for (bird of birds) {
    inputs[0] = bird.y / height; //normalized bird's current height
    inputs[1] = closest.x / width; //normalized closest pipe's x position
    inputs[2] = closest.top / height; //normalized closest opening's top positon
    inputs[3] = closest.bottom / height; //normalized closest opening's bottom positon

    //let the bird predict the movement
    bird.think(inputs);
    bird.update(); //update the position of the bird
    bird.show(); //show the bird
  }


  //when there is no live bird left, create the new generation
  if (birds.length === 0) {
    pipes = []; //clear the pipes
    newGeneration(); //new generation
    counter = 0; //reset the game
  }
}


//Utility function to display the score
function showScore(bird) {
  var scoreElement = document.getElementById('currentScore');
  scoreElement.innerHTML = bird.score;
}