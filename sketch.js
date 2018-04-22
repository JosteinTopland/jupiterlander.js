function Ship() {
	this.x;
	this.y;
	this.sprite;
	this.sound = {};
	this.init = function() {
	}
	this.draw = function() {
		image(this.sprite, 0, 0, 48, 48, 0, 0, 48, 48);
	}
	this.playSound = function(key) {
		this.sound[key].play();
	}
	this.stopSound = function() {
		for (i in this.sound) {
			this.sound[i].stop();
		}
	}
	this.init();
}
var ship;

function preload() {
	ship = new Ship();
	ship.sound["small"] = loadSound("thrust_small.ogg");
	ship.sound["large"] = loadSound("thrust_large.ogg");
	ship.sprite = loadImage("spritesheet.png");
}

function setup() {
	createCanvas(windowWidth, windowHeight);
}

function draw() {
	background('black');
	ship.draw();
}

function keyPressed() {
	switch (keyCode) {
		case LEFT_ARROW:
		case RIGHT_ARROW:
			ship.playSound("small");
			break;
		case DOWN_ARROW:
			ship.playSound("large");
			break;
	}
}

function keyReleased() {
	ship.stopSound();
}
