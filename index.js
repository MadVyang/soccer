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
	ball.y = -ball.size;
	renderer = new Renderer(ball, canvas);
	renderer.showText();

	window.addEventListener('click', clickHandler);
	window.addEventListener('touchstart', touchHandler);
	window.addEventListener('touchend', touchHandler);
	window.addEventListener('touchmove', touchHandler);
	setInterval(timerHandler, 15);
}

let timerHandler = (e) => {
	ball.move();
	renderer.render();
	if (!isPlaying)
		renderer.showText();
}

let clickHandler = (e) => {
	tryStartGame();
	tryHitBall(e.offsetX, e.offsetY);
}

let touchHandler = (e) => {
	tryStartGame();
	for (let touch of e.touches) {
		if (tryHitBall(touch.pageX, touch.pageY)) break;
	}
}

let tryStartGame = () => {
	if (!isPlaying) {
		isPlaying = true;
		score = 0;
		ball.init();
	}
}

let tryHitBall = (x, y) => {
	let hitX = x - renderer.origin.x;
	let hitY = -y + renderer.origin.y;

	if (ball.speed.y < 0 &&
		(hitX - ball.x) * (hitX - ball.x) +
		(hitY - ball.y) * (hitY - ball.y)
		< (ball.size) * (ball.size)
	) {
		let rot = Math.atan2(ball.y - hitY, ball.x - hitX);
		ball.hit(Math.cos(rot), 1);
		score += 1;
		if (maxScore < score) maxScore = score;

		return true;
	}
	return false;
}
