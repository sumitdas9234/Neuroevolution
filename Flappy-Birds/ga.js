//The newGeneration() to create a new generation
function newGeneration() {
  //DEBUG
  console.log("New Generation!");
  //calculate the fitness of the previus generation
  calcFitness();

  //create new birds
  for (let i = 0; i < TOTAL; i++) {
    //pick one of the birds from the savedBirds pool
    birds[i] = pickOne(savedBirds);
  }
  //clear the pool
  savedBirds = [];
}



//pickOne() function to select a random bird
function pickOne(savedBirds) {
  let index = 0;
  let r = random(1);
  while (r > 0 && index < savedBirds.length) {
    r = r - savedBirds[index].fitness;
    index++;
  }
  index--;
  //get the selected bird
  let bird = savedBirds[index];
  //create a new child with the selected bird's brain
  let child = new Bird(bird.brain);
  //copy the previous fitness, (NOT SURE WHETHER TO DO THIS OR NOT. MOST PROBABLY I SHOULDN'T!)
  // child.fitness = bird.fitness;
  //mutate the children with the function func()
  child.brain.mutate(func);
  //return child
  return child;
}


//the func() function to mutate the new created children
function func(x) {
  if (random(1) < 0.1) {
    let offset = randomGaussian() * 0.5;
    let newx = x + offset;
    return newx;
  } else {
    return x;
  }
}



//calculate the fitness of the saved Birds
function calcFitness() {
  let sum = 0;
  for (bird of savedBirds) {
    sum += bird.score;
  }
  for (bird of savedBirds) {
    bird.fitness = bird.score / sum;
  }
}