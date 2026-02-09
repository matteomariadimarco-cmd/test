let canvas = document.getElementById("gameCanvas");
let ctx = canvas.getContext("2d");

// Game variables
let ballRadius = 10;
let x = canvas.width / 2;
let y = canvas.height / 2;
let dx = 2; // Ball speed
let dy = 2;
let paddleHeight = 75;
let paddleWidth = 10;
let playerPaddleY = (canvas.height - paddleHeight) / 2;
let aiPaddleY = (canvas.height - paddleHeight) / 2;
let playerScore = 0;
let aiScore = 0;

document.addEventListener("mousemove", mouseMoveHandler, false);

function mouseMoveHandler(e) {
    let relativeY = e.clientY - canvas.getBoundingClientRect().top;
    if (relativeY > 0 && relativeY < canvas.height) {
        playerPaddleY = relativeY - paddleHeight / 2;
    }
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawPaddle(x, y) {
    ctx.beginPath();
    ctx.rect(x, y, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Player: " + playerScore, 8, 20);
    ctx.fillText("AI: " + aiScore, canvas.width - 50, 20);
}

function collisionDetection() {
    if (y + dy > canvas.height - ballRadius || y + dy < ballRadius) {
        dy = -dy;
    }
    
    if (x + dx < paddleWidth) {
        if (y > playerPaddleY && y < playerPaddleY + paddleHeight) {
            dx = -dx;
        } else if (x + dx < 0) {
            aiScore++;
            resetBall();
        }
    } else if (x + dx > canvas.width - ballRadius - paddleWidth) {
        if (y > aiPaddleY && y < aiPaddleY + paddleHeight) {
            dx = -dx;
        } else if (x + dx > canvas.width) {
            playerScore++;
            resetBall();
        }
    }
}

function resetBall() {
    x = canvas.width / 2;
    y = canvas.height / 2;
    dx = -dx; // Change direction
}

function aiMovement() {
    if (aiPaddleY + paddleHeight / 2 < y) {
        aiPaddleY += 4; // AI speed
    } else {
        aiPaddleY -= 4;
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle(0, playerPaddleY);
    drawPaddle(canvas.width - paddleWidth, aiPaddleY);
    drawScore();
    collisionDetection();
    
    x += dx;
    y += dy;
    aiMovement();

    requestAnimationFrame(draw);
}

// Start the game loop
draw();