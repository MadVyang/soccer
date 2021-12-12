class Renderer {
	constructor(ball) {
		this.canvas = document.querySelector('canvas');
		this.context = this.canvas.getContext('2d');

		this.ball = ball;
		this.origin = {
			x: this.canvas.width / 2,
			y: this.canvas.height
		}
	}

	showText() {
		this.context.font = '48px serif';
		this.context.fillText('Click to start', 110, 400);
	}

	showScore() {
		this.context.font = '20px serif';
		this.context.fillText('Max: ' + Math.round(maxScore), 10, 30);
		this.context.fillText(Math.round(score), 450, 30);
	}

	render() {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

		let ballX = this.ball.x + this.origin.x;
		let ballY = -this.ball.y + this.origin.y;

		this.context.save();
		this.context.translate(ballX, ballY);
		this.context.rotate(this.ball.rot);
		this.context.translate(-ballX, -ballY);
		this.context.drawImage(
			this.ball.image,
			ballX - this.ball.size / 2,
			ballY - this.ball.size / 2,
			this.ball.size,
			this.ball.size
		);
		this.context.restore();

		this.showScore();
	}
}

class Ball {
	constructor(size) {
		this.size = size;
		this.x = 0;
		this.y = -100;

		this.image = new Image();
		this.image.src = './img.png';

		this.speed = { x: 0, y: 0 };
		this.rot = 0;
	}

	setBound(bound) {
		this.bound = bound;
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


let timerHandler = (e) => {
	ball.move();
	renderer.render();
	if (!isPlaying)
		renderer.showText();
}
let clickHandler = (e) => {
	if (!isPlaying) {
		isPlaying = true;
		ball.x = 0; ball.y = 500; ball.speed.x = 0; ball.speed.y = 0;
		score = 0;
	}

	let clickX = e.offsetX - renderer.origin.x;
	let clickY = -e.offsetY + renderer.origin.y;
	if (ball.speed.y < 0) {
		if ((clickX - ball.x) * (clickX - ball.x) + (clickY - ball.y) * (clickY - ball.y)
			< (ball.size * 1.2) * (ball.size * 2)) {
			// ball.hit((clickX - ball.x) / (ball.size * 0.05), (clickY - ball.y) / (ball.size * 0.05));
			let rot = Math.atan2(ball.y - clickY, ball.x - clickX);
			ball.hit(Math.cos(rot), 1);
		}
	}
}

let maxScore = 0;
let score = 0;
let isPlaying = false;

let ball;
let renderer;
window.onload = () => {
	ball = new Ball(100);
	renderer = new Renderer(ball);
	ball.setBound(renderer.canvas.width);
	renderer.showText();

	window.addEventListener('click', clickHandler);
	setInterval(timerHandler, 20);
}