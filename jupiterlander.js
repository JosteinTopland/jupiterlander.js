/*
  Jupiter Lander JS
  jostein.topland@gmail.com
*/

var terrain = [];
var platforms = [];
var gravity = 0.004;
var keyX = 0;
var keyY = 0;
var restartTimer = -1;
var music;

function Ship(x, y, vx, vy) {
  this.direction = createVector(0, 0);
  this.velocity;
  this.position;
  this.sprite;
  this.sound = {};
  this.fuel = 100;
  this.boundingPoly = [];
  this.hasLanded = false;

  this.init = function() {
    this.sound["small"] = loadSound("thrust_small.ogg");
    this.sound["large"] = loadSound("thrust_large.ogg");
    this.sound["win"] = loadSound("win.ogg");
    this.sound["crash"] = loadSound("crash.ogg");
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
    if (this.hasLanded) {
      x = 0;
      y = 0;
    }

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
    if (this.hasLanded) return;

    this.velocity.y += gravity;
    this.velocity.add(this.direction.x, -this.direction.y);
    this.position.add(this.velocity);
    if (abs(this.direction.x) > 0 || this.direction.y > 0) {
      this.fuel = max(0, this.fuel - 0.2);
    }

    let shipShape = [];
    for (let i = 0; i < this.boundingPoly.length; i++) {
      shipShape.push(createVector(this.position.x + this.boundingPoly[i].x, this.position.y + this.boundingPoly[i].y));
    }

    if (collidePolyPoly(terrain, shipShape)) {
      this.hasLanded = true;
      this.sound['crash'].play();
    }

    for (let i = 0; i < platforms.length; i++) {
      if (collidePolyPoly(platforms[i], shipShape)) {
        this.hasLanded = true;
        this.velocity.x = 0;
        this.position.y = platforms[i][0].y - 21;
        if (this.velocity.y > 0.145) {
          this.sound['crash'].play();
        } else {
          this.sound['win'].play();
        }
      }
    }
  }

  this.draw = function() {
    noStroke();
    fill('red');
    push();
    translate(this.position.x, this.position.y);
    image(this.sprite, 0, 0, 24, 24, 0, 0, 24, 24);
    if (this.direction.x > 0) {
      push();
      translate(1, 4);
      triangle(0, 2, 2, 0, 2, 4);
      pop();
    }
    if (this.direction.x < 0) {
      push();
      translate(21, 4);
      triangle(0, 0, 0, 4, 2, 2);
      pop();
    }
    if (this.direction.y > 0) {
      push();
      translate(8, 18);
      triangle(0, 0, 8, 0, 4, 4);
      pop();
    }
    pop();
  }
}
var ship;

function restart() {
  delete ship;
  ship = new Ship(20, 10, 0.2, 0);
  restartTimer = -1;
}

function preload() {
  restart();
   music = loadSound("autechre_deco-loc.ogg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noSmooth();

  music.loop();

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
  terrain.push(createVector(63, 161));
  terrain.push(createVector(111, 161));
  terrain.push(createVector(111, 151));
  terrain.push(createVector(117, 142));
  terrain.push(createVector(117, 136));
  terrain.push(createVector(120, 134));
  terrain.push(createVector(121, 122));
  terrain.push(createVector(109, 110));
  terrain.push(createVector(108, 94));
  terrain.push(createVector(110, 89));
  terrain.push(createVector(150, 48));
  terrain.push(createVector(150, 58));
  terrain.push(createVector(200, 58));
  terrain.push(createVector(200, 48));
  terrain.push(createVector(233, 80));
  terrain.push(createVector(236, 90));
  terrain.push(createVector(239, 95));
  terrain.push(createVector(239, 105));
  terrain.push(createVector(234, 114));
  terrain.push(createVector(233, 118));
  terrain.push(createVector(215, 137));
  terrain.push(createVector(215, 159));
  terrain.push(createVector(215, 169));
  terrain.push(createVector(255, 169));
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

  platforms.push([ createVector(63, 151), createVector(63, 161), createVector(111, 161), createVector(111, 151) ]);
  platforms.push([ createVector(150, 48), createVector(150, 58), createVector(200, 58), createVector(200, 48) ]);
  platforms.push([ createVector(215, 159), createVector(215, 169), createVector(255, 169), createVector(255, 159) ]);
}

function draw() {
  scale(4);
  background('black');
  ship.update(0, 0);
  ship.draw();
  drawTerrain();
  drawStatus();

  if (ship.hasLanded) {
    if (restartTimer == -1) {
      restartTimer = Date.now() + 1000;
    } else {
      if (restartTimer < Date.now()) {
        restart();
      }
    }
  }
}

function drawTerrain() {
  noStroke();
  fill('darkred');

  beginShape();
  for (let i = 0; i < terrain.length; i++) {
    vertex(terrain[i].x, terrain[i].y);
  }
  endShape(CLOSE);

  for (let i = 0; i < platforms.length; i++) {
    beginShape();
    for (let j = 0; j < platforms[i].length; j++) {
      vertex(platforms[i][j].x, platforms[i][j].y);
    }
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
  if (keyCode == LEFT_ARROW) keyX = 0.02;
  if (keyCode == RIGHT_ARROW) keyX = -0.02;
  if (keyCode == DOWN_ARROW) keyY = 0.02;
  ship.move(keyX, keyY);
}

function keyReleased() {
  if (keyCode == LEFT_ARROW) keyX = 0;
  if (keyCode == RIGHT_ARROW) keyX = 0;
  if (keyCode == DOWN_ARROW) keyY = 0;
  ship.move(keyX, keyY);
}
