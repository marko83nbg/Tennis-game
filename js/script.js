let canvas;
let canvasContext;

let ballX = 40;
let ballSpeedX = 8;
let ballY = 40;
let ballSpeedY = 5;

let paddle1Y = 250;
let paddle2Y = 250;
const paddleHeight = 100;
const paddleThickness = 10;

let player1Score = 0;
let player2Score = 0;
const winningScore = 5;
let showWinScreen = false;

window.onload = function() {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');

    const framesPerSecond = 30;
    setInterval(function(){
        drawEverything(); 
        moveEverything();
    }, 1000/framesPerSecond);

    canvas.addEventListener('mousemove', function(e) {
        let mousePos = calculateMousePos(e);
        paddle1Y = mousePos.y - (paddleHeight / 2);
    });

    canvas.addEventListener('mousedown', handleMouseClick);
    
    
}

// Mouse click
function handleMouseClick(e) {
    if(showWinScreen) {
        player1Score = 0;
        player2Score = 0;
        showWinScreen = false;

    }
}

// Define rectangle drawing
function colorRect(leftX, topY, width, height, color) {
    canvasContext.fillStyle = color;
    canvasContext.fillRect(leftX, topY, width, height);
}

// Define circle drawing
function colorCircle(centerX, centerY, radius, color) {
    canvasContext.fillStyle = color;
    canvasContext.beginPath();
    canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
    canvasContext.fill();
}

// Calculate mouse position
function calculateMousePos(e) {
    let rec = canvas.getBoundingClientRect();
    let root = document.documentElement;
    let mouseX = e.clientX - rec.left - root.scrollLeft;
    let mouseY = e.clientY - rec.top - root.scrollTop;

    return {
        x: mouseX,
        y: mouseY
    }
}

// Draw net
function drawNet() {
    for(let i = 0; i < canvas.height; i += 40) {
        colorRect(canvas.width / 2 - 1, i, 2, 20, 'white');
    }
}

function drawEverything() {
    // Next line draws canvas
    colorRect(0, 0, canvas.width, canvas.height, 'black');

    // Next line writes message
    if (showWinScreen) {
        if (player1Score >= winningScore) {
            canvasContext.fillStyle = 'white';
            canvasContext.fillText("Left Player Win!", 370, 300);
        } else if (player2Score >= winningScore) {
            canvasContext.fillStyle = 'white';
            canvasContext.fillText("Right Player Win!", 370, 300);
        }
        canvasContext.fillStyle = 'white';
        canvasContext.fillText("CLICK TO CONTINUE", 350, 100);
        return;
    }

    // Next line draws net
    drawNet();
    
    
    // Next line draws left player paddle
    colorRect(0, paddle1Y, paddleThickness, paddleHeight, 'white');
    // Next line draws right player paddle
    colorRect(canvas.width - paddleThickness, paddle2Y, paddleThickness, paddleHeight, 'white');
    // Next lines draws ball
    colorCircle(ballX, ballY, 10, 'white');

    canvasContext.fillText(player1Score, 100, 100);
    canvasContext.fillText(player2Score, canvas.width - 100, 100);

}

// Computer paddle move 
function computerMovement() {
    let paddle2YCenter = paddle2Y + (paddleHeight / 2);
    if(paddle2YCenter < ballY - 35) {
        paddle2Y += 10;
    } else if(paddle2YCenter > ballY + 35) {
        paddle2Y -= 10;
    }
}

// Ball move
function moveEverything() {
    if(showWinScreen) {
        return;
    }
    computerMovement();

    ballX += ballSpeedX;
    ballY += ballSpeedY;
    
    if(ballY > canvas.height) {
        ballSpeedY = -ballSpeedY;
    }
    
    if(ballY < 0) {
        ballSpeedY = -ballSpeedY;
    }
    
    if(ballX > canvas.width) {
        if(ballY > paddle2Y && ballY < paddle2Y + paddleHeight) {
            ballSpeedX = -ballSpeedX;

            let deltaY = ballY - (paddle2Y + paddleHeight / 2);
            ballSpeedY = deltaY * 0.35;
        } else {
            player1Score++; // must be before ballReset()
            ballReset();
            
        }
    }
    
    if(ballX < 0) {
        if(ballY > paddle1Y && ballY < paddle1Y + paddleHeight) {
            ballSpeedX = -ballSpeedX;

            let deltaY = ballY - (paddle1Y + paddleHeight / 2);
            ballSpeedY = deltaY * 0.35;
        } else {
            player2Score++;// must be before ballReset()
            ballReset();
            
        } 
    }
}

// Ball reset
function ballReset() {
    if(player1Score >= winningScore || player2Score >= winningScore) {
        showWinScreen = true;
    }
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX = -ballSpeedX;
}





