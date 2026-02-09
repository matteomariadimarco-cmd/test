// Pong Game Logic

// Canvas and context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game variables
let ballRadius = 10;
let x = canvas.width / 2;
let y = canvas.height / 2;
let dx = 2; // Ball speed in x
let dy = -2; // Ball speed in y
let paddleHeight = 75;
let paddleWidth = 10;
let playerPaddleY = (canvas.height - paddleHeight) / 2;
let aiPaddleY = (canvas.height - paddleHeight) / 2;
let playerScore = 0;
let aiScore = 0;
const paddleSpeed = 4;

// Controls
document.addEventListener('mousemove', (e) => {
    const mouseY = e.clientY - canvas.getBoundingClientRect().top;
    playerPaddleY = mouseY - paddleHeight / 2;
});

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = '#0095DD';
    ctx.fill();
    ctx.closePath();
}

function drawPaddle(x, y) {
    ctx.beginPath();
    ctx.rect(x, y, paddleWidth, paddleHeight);
    ctx.fillStyle = '#0095DD';
    ctx.fill();
    ctx.closePath();
}

function drawScoreboard() {
    ctx.font = '16px Arial';
    ctx.fillStyle = '#0095DD';
    ctx.fillText(`Player: ${playerScore}`, 8, 20);
    ctx.fillText(`AI: ${aiScore}`, canvas.width - 50, 20);
}

function collisionDetection() {
    // Ball collision with paddles
    if (x + ballRadius > canvas.width - paddleWidth && y > aiPaddleY && y < aiPaddleY + paddleHeight) {
        dx = -dx;
    } else if (x - ballRadius < paddleWidth && y > playerPaddleY && y < playerPaddleY + paddleHeight) {
        dx = -dx;
    }

    // Ball collision with top and bottom walls
    if (y + ballRadius > canvas.height || y - ballRadius < 0) {
        dy = -dy;
    }

    // Ball goes out of bounds
    if (x + ballRadius > canvas.width) {
        playerScore++;
        resetBall();
    } else if (x - ballRadius < 0) {
        aiScore++;
        resetBall();
    }
}

function resetBall() {
    x = canvas.width / 2;
    y = canvas.height / 2;
    dx = 2;
    dy = -2;
}

function aiMovement() {
    // Simple AI follows the ball
    if (y < aiPaddleY + paddleHeight / 2) {
        aiPaddleY -= paddleSpeed;
    } else {
        aiPaddleY += paddleSpeed;
    }

    // Keep AI paddle within canvas
    if (aiPaddleY < 0) aiPaddleY = 0;
    if (aiPaddleY > canvas.height - paddleHeight) aiPaddleY = canvas.height - paddleHeight;
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle(0, playerPaddleY);
    drawPaddle(canvas.width - paddleWidth, aiPaddleY);
    drawScoreboard();
    collisionDetection();
    aiMovement();
    x += dx;
    y += dy;
}

setInterval(draw, 10);