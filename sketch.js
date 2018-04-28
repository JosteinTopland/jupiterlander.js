var terrain = [];
var gravity = 0.004;

function Ship(x, y, vx, vy) {
  this.direction = createVector(0, 0);
  this.velocity;
  this.position;
  this.sprite;
  this.sound = {};
  this.fuel = 100;
  this.boundingPoly = [];

  this.init = function() {
    this.sound["small"] = loadSound("thrust_small.ogg");
    this.sound["large"] = loadSound("thrust_large.ogg");
    this.sprite = loadImage("spritesheet.png");
    this.position = createVector(x, y);
    this.velocity = createVector(vx, vy);
    this.boundingPoly = [
      createVector(3, 0),
      createVector(3, 1),
      createVector(5, 3),
      createVector(4, 4),
      createVector(4, 8),
      createVector(2, 10),
      createVector(2, 14),
      createVector(3, 16),
      createVector(0, 20),
      createVector(0, 21),
      createVector(6, 21),
      createVector(7, 18),
      createVector(17, 18),
      createVector(18, 21),
      createVector(24, 21),
      createVector(24, 20),
      createVector(21, 16),
      createVector(22, 15),
      createVector(22, 10),
      createVector(20, 6),
      createVector(20, 4),
      createVector(23, 4),
      createVector(23, 0),
      createVector(19, 0),
      createVector(19, 2),
      createVector(15, 1),
      createVector(9, 1),
      createVector(6, 2),
      createVector(4, 0)
    ]
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
    this.velocity.y += gravity;
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

  terrain.push(createVector(0, 0));
  terrain.push(createVector(7, 9));
  terrain.push(createVector(7, 21));
  terrain.push(createVector(10, 25));
  terrain.push(createVector(16, 40));
  terrain.push(createVector(65, 88));
  terrain.push(createVector(68, 97));
  terrain.push(createVector(71, 103));
  terrain.push(createVector(71, 113));
  terrain.push(createVector(66, 122));
  terrain.push(createVector(66, 126));
  terrain.push(createVector(63, 129));
  terrain.push(createVector(63, 151));
  terrain.push(createVector(111, 151));
  terrain.push(createVector(117, 142));
  terrain.push(createVector(117, 136));
  terrain.push(createVector(120, 134));
  terrain.push(createVector(121, 122));
  terrain.push(createVector(109, 110));
  terrain.push(createVector(108, 94));
  terrain.push(createVector(110, 89));
  terrain.push(createVector(150, 48));
  terrain.push(createVector(200, 48));
  terrain.push(createVector(233, 80));
  terrain.push(createVector(236, 90));
  terrain.push(createVector(239, 95));
  terrain.push(createVector(239, 105));
  terrain.push(createVector(234, 114));
  terrain.push(createVector(233, 118));
  terrain.push(createVector(215, 137));
  terrain.push(createVector(215, 159));
  terrain.push(createVector(255, 159));
  terrain.push(createVector(260, 152));
  terrain.push(createVector(260, 144));
  terrain.push(createVector(262, 136));
  terrain.push(createVector(269, 127));
  terrain.push(createVector(268, 111));
  terrain.push(createVector(270, 105));
  terrain.push(createVector(273, 102));
  terrain.push(createVector(272, 81));
  terrain.push(createVector(269, 77));
  terrain.push(createVector(268, 55));
  terrain.push(createVector(270, 49));
  terrain.push(createVector(291, 28));
  terrain.push(createVector(293, 18));
  terrain.push(createVector(299, 9));
  terrain.push(createVector(304, 0));
  terrain.push(createVector(304, 184));
  terrain.push(createVector(0, 184));
}

function draw() {
  scale(4);
  background('black');
  ship.update(0, 0);
  ship.draw();
  drawTerrain();
  drawStatus();
}

function drawTerrain() {
  let shipShape = [];
  for (let i = 0; i < ship.boundingPoly.length; i++) {
    shipShape.push(createVector(ship.position.x + ship.boundingPoly[i].x, ship.position.y + ship.boundingPoly[i].y));
  }

  noStroke();
  fill('darkred');
  beginShape();
  for (let i = 0; i < terrain.length; i++)
    vertex(terrain[i].x, terrain[i].y);
  endShape(CLOSE);

  if (collidePolyPoly(terrain, shipShape)) {
    fill('red');
    beginShape();
    for (let i = 0; i < shipShape.length; i++)
      vertex(shipShape[i].x, shipShape[i].y);
    endShape(CLOSE);
  }
}

function drawStatus() {
  // right
  noStroke();
  fill('white');
  textFont('Courier New');
  textSize(10);
  text('m/s', 306, 15);
  textSize(4);
  text('±0', 305, 98);
  text('-10', 304, 159);
  fill('lightgreen');
  rect(312, 30, 8, 132);
  fill('yellow');
  rect(312, 96, 8, 8);
  let y = max(-50, min(50, 50 * ship.velocity.y));
  stroke('black');
  line(312, 96 + y, 320, 96 + y);

  // bottom
  textSize(10);
  textFont('Courier New');
  textStyle(BOLD);
  noStroke();
  fill('lightgreen');
  text('SCORE  :', 7, 191);
  fill('yellow');
  text('FUEL  :', 7, 199);
  fill('blue');
  let w = ship.fuel * 256 / 100;
  rect(64, 192, w, 8);
  fill('purple');
  text('HI-SCORE  :', 143, 191);
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
