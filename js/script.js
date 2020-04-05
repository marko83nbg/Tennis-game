let canvas;
let canvasContext;
let ballX = 40;
let ballY;

window.onload = function() {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');

    const framesPerSecond = 30;
    // setInterval(function(){
    //     drawEverything(); 
    //     moveEverything();
    // }, 1000/framesPerSecond);
    
    
}

function drawEverything() {
    canvasContext.fillStyle = 'black';
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);

    canvasContext.fillStyle = 'red';
    canvasContext.fillRect(ballX, 200, 10, 10);

    canvasContext.fillStyle = 'white';
    canvasContext.fillRect(20, 250, 5, 100);

}

function moveEverything() {
    ballX += 5;

}





