let maxScore = 0;
let score = 0;
let isPlaying = false;

let canvas;
let ball;
let renderer;

window.onload = () => {
	canvas = document.querySelector('canvas');
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	ball = new Ball(100, canvas);
	renderer = new Renderer(ball, canvas);
	renderer.showText();

	window.addEventListener('click', clickHandler);
	setInterval(timerHandler, 20);
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
			let rot = Math.atan2(ball.y - clickY, ball.x - clickX);
			ball.hit(Math.cos(rot), 1);
		}
	}
}