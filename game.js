class Ball {
	constructor(size, canvas) {
		this.size = size;
		this.bound = { x: canvas.width, y: canvas.height };
		this.image = new Image();
		this.image.src = './img.png';

		this.init();
	}

	init() {
		this.x = 0;
		this.y = this.bound.y;
		this.speed = { x: 0, y: 0 };
		this.rot = 0;
	}

	move() {
		this.rot += this.speed.x * 0.01;
		this.x += this.speed.x;
		this.y += this.speed.y;
		if (this.x < -this.bound.x / 2 + this.size / 2) {
			this.x = -this.bound.x / 2 + this.size / 2;
			this.speed.x *= -1;
		}
		if (this.x > this.bound.x / 2 - this.size / 2) {
			this.x = this.bound.x / 2 - this.size / 2;
			this.speed.x *= -1;
		}

		this.speed.y -= 1.25;
		this.speed.x *= 0.98;


		if (this.y < -this.size) {
			isPlaying = false;
		}
	}

	hit(x, y) {
		this.speed.x *= 0.5;
		this.speed.y *= 0.5;

		this.speed.x += x * 20;
		this.speed.y += y * 40;
	}
}
