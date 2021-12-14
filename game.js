class Ball {
	constructor(size, canvas) {
		this.size = size;
		this.bound = canvas.width;

		this.x = 0;
		this.y = -100;

		this.image = new Image();
		this.image.src = './img.png';

		this.speed = { x: 0, y: 0 };
		this.rot = 0;
	}

	move() {
		this.rot += this.speed.x * 0.01;
		this.x += this.speed.x;
		this.y += this.speed.y;
		if (this.x < -this.bound / 2 + this.size / 2) {
			this.x = -this.bound / 2 + this.size / 2;
			this.speed.x *= -1;
		}
		if (this.x > this.bound / 2 - this.size / 2) {
			this.x = this.bound / 2 - this.size / 2;
			this.speed.x *= -1;
		}

		this.speed.y -= 1.6;
		this.speed.x *= 0.98;


		if (this.y < -this.size) {
			isPlaying = false;
		}
	}

	hit(x, y) {
		this.speed.x += x * 25;
		this.speed.y += y * 55;

		score += 1;
		if (maxScore < score) maxScore = score;
	}
}
