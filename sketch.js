function Ship(x, y, vx, vy) {
  this.direction = createVector(0, 0);
  this.velocity;
  this.position;
  this.sprite;
  this.sound = {};
  this.fuel = 100;

  this.init = function() {
    this.sound["small"] = loadSound("thrust_small.ogg");
    this.sound["large"] = loadSound("thrust_large.ogg");
    this.sprite = loadImage("spritesheet.png");
    this.position = createVector(x, y);
    this.velocity = createVector(vx, vy);
  }
  this.init();

  this.move = function(x, y) {
    if (this.fuel <= 0) {
      x = 0;
      y = 0;
    }
    if (abs(x) > 0) {
      this.sound['small'].play();
    } else {
      this.sound['small'].stop();
    }
    if (y > 0) {
      this.sound['large'].play();
    } else {
      this.sound['large'].stop();
    }
    this.direction = createVector(x, y);
  }

  this.update = function() {
    this.velocity.y += 0.004;
    this.velocity.add(this.direction.x, -this.direction.y);
    this.position.add(this.velocity);
    if (abs(this.direction.x) > 0 || this.direction.y > 0) {
      this.fuel = max(0, this.fuel - 0.2);
    }
  }

  this.draw = function() {
    noStroke();
    fill('red');
    push();
    translate(this.position.x, this.position.y);
    image(this.sprite, 0, 0, 24, 24, 0, 0, 24, 24);
    if (this.direction.x > 0) {
      translate(1, 4);
      triangle(0, 2, 2, 0, 2, 4);
    }
    if (this.direction.x < 0) {
      translate(21, 4);
      triangle(0, 0, 0, 4, 2, 2);
    }
    if (this.direction.y > 0) {
      translate(8, 18);
      triangle(0, 0, 8, 0, 4, 4);
    }
    pop();
  }
}
var ship;

function preload() {
  ship = new Ship(20, 10, 0.2, 0);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noSmooth();
}

function draw() {
  scale(4);
  background('black');
  ship.update(0, 0);
  drawTerrain();
  ship.draw();
  drawStatus();
}

function drawTerrain() {
  noStroke();
  fill('darkred');
  beginShape();
  vertex(10, 10);

  vertex(30, 100);
  vertex(100, 100);
  vertex(270, 100);

  vertex(290, 10);
  vertex(290, 170);
  vertex(10, 170);
  endShape(CLOSE);
}

function drawStatus() {
  // right
  noStroke();
  fill('white');
  textFont('Courier New');
  textSize(6);
  text('m/s', 298, 44);
  textSize(4);
  text('±0', 294, 102);
  fill('lightgreen');
  rect(300, 50, 6, 100);
  fill('yellow');
  rect(300, 100, 6, 7);
  let y = max(-50, min(50, 50 * ship.velocity.y));
  stroke('black');
  line(300, 100 + y, 305, 100 + y);

  // bottom
  textSize(8);
  textFont('Courier New');
  textStyle(BOLD);
  noStroke();
  fill('lightgreen');
  text('SCORE:', 10, 180);
  fill('yellow');
  text('FUEL:', 10, 190);
  fill('blue');
  let w = ship.fuel * 260 / 100;
  rect(40, 185, w, 6);
  fill('purple');
  text('HI-SCORE:', 120, 180);
}

function keyPressed() {
  switch (keyCode) {
    case LEFT_ARROW:
      ship.move(0.02, 0);
      break;
    case RIGHT_ARROW:
      ship.move(-0.02, 0);
      break;
    case DOWN_ARROW:
      ship.move(0, 0.02);
      break;
    }
}

function keyReleased() {
  ship.move(0, 0);
}
