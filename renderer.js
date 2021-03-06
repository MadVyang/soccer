class Renderer {
	constructor(ball, canvas) {
		this.canvas = canvas;
		this.context = canvas.getContext('2d');

		this.ball = ball;
		this.origin = {
			x: this.canvas.width / 2,
			y: this.canvas.height
		}
	}

	showText() {
		this.context.font = '48px serif';
		this.context.textAlign = 'center';
		this.context.fillText('Touch to start', this.canvas.width / 2, this.canvas.height / 2);
	}

	showScore() {
		this.context.font = '20px serif';
		this.context.textAlign = 'left';
		this.context.fillText('Max: ' + Math.round(maxScore), 10, 30);
		this.context.textAlign = 'right';
		this.context.fillText(Math.round(score), this.canvas.width - 10, 30);
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