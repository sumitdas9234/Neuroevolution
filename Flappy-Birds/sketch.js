var canvas;
var bird;
var pipes = [];

function setup() {
  canvas = createCanvas(900, 600);
  bird = new Bird();
  let pipe = new Pipe();
  pipes.push(pipe);
}

function draw() {
  background(color(247, 215, 148));
  showScore(bird);
  for (let i = pipes.length - 1; i > 0; i--) {
    (pipes[i].x < (0 - pipes[i].width)) && pipes.splice(i, 1);
    (pipes[i].hits(bird)) && (pipes[i].color = color(255, 63, 52)) && (noLoop());
    pipes[i].show();
    pipes[i].update();
  }

  (frameCount % 135 == 0) && pipes.push(new Pipe()) && (bird.score += 10);

  bird.update();
  bird.show();
}

function keyPressed() {
  if (key == ' ') {
    bird.up();
  }

}

function showScore(bird) {
  var scoreElement = document.getElementById('currentScore');
  scoreElement.innerHTML = bird.score;
}