const canvas = document.getElementById('pingPongCanvas');
const context = canvas.getContext('2d');

const paddleWidth = 10, paddleHeight = 100, ballRadius = 10;
let upArrowPressed = false, downArrowPressed = false;

const player = {
    x: 10,
    y: canvas.height / 2 - paddleHeight / 2,
    width: paddleWidth,
    height: paddleHeight,
    color: '#fff',
    dy: 5
};

const computer = {
    x: canvas.width - paddleWidth - 10,
    y: canvas.height / 2 - paddleHeight / 2,
    width: paddleWidth,
    height: paddleHeight,
    color: '#fff',
    dy: 5
};

const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: ballRadius,
    speed: 4,
    dx: 4,
    dy: 4,
    color: '#05edff'
};

function drawRect(x, y, w, h, color) {
    context.fillStyle = color;
    context.fillRect(x, y, w, h);
}

function drawArc(x, y, r, color) {
    context.fillStyle = color;
    context.beginPath();
    context.arc(x, y, r, 0, Math.PI * 2, false);
    context.closePath();
    context.fill();
}

function movePaddles() {
    if (upArrowPressed && player.y > 0) {
        player.y -= player.dy;
    } else if (downArrowPressed && (player.y < canvas.height - player.height)) {
        player.y += player.dy;
    }

    if (ball.y < computer.y + computer.height / 2) {
        computer.y -= computer.dy;
    } else {
        computer.y += computer.dy;
    }
}

function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.dx = -ball.dx;
    ball.speed = 4;
}

function update() {
    movePaddles();

    ball.x += ball.dx;
    ball.y += ball.dy;

    if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
        ball.dy *= -1;
    }

    let playerPaddle = (ball.x < canvas.width / 2) ? player : computer;

    if (ball.x + ball.radius > playerPaddle.x && ball.x - ball.radius < playerPaddle.x + playerPaddle.width &&
        ball.y + ball.radius > playerPaddle.y && ball.y - ball.radius < playerPaddle.y + playerPaddle.height) {
        ball.dx *= -1;
    }

    if (ball.x - ball.radius < 0) {
        resetBall();
    } else if (ball.x + ball.radius > canvas.width) {
        resetBall();
    }
}

function render() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    drawRect(0, 0, canvas.width, canvas.height, '#000');
    drawRect(player.x, player.y, player.width, player.height, player.color);
    drawRect(computer.x, computer.y, computer.width, computer.height, computer.color);
    drawArc(ball.x, ball.y, ball.radius, ball.color);
}

function gameLoop() {
    update();
    render();
}

setInterval(gameLoop, 1000 / 60);

window.addEventListener('keydown', (event) => {
    switch (event.keyCode) {
        case 38:
            upArrowPressed = true;
            break;
        case 40:
            downArrowPressed = true;
            break;
    }
});

window.addEventListener('keyup', (event) => {
    switch (event.keyCode) {
        case 38:
            upArrowPressed = false;
            break;
        case 40:
            downArrowPressed = false;
            break;
    }
});