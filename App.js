//Select canvas from html
const cvs = document.getElementById("Arcanoid");
//Using 2d tool for graphics from canvas
const ctx = cvs.getContext("2d");

// Create the  ball

const ball = {
    x: cvs.width/2,
    y: cvs.height/2,
    radius: 6,
    speed: 5,
    velocityX: 5,
    velocityY: 5,
    color: "WHITE"
}

// Draw circle function to draw ball

function drawCircle(x,y,r,color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x,y,r,0,Math.PI*2,true);
    ctx.closePath();
    ctx.fill();
}

// Draw rect to fill canvas 

function drawRect(x,y,w,h,color) {
    ctx.fillStyle = color;
    ctx.fillRect(x,y,w,h);
}

// Render the game function

function render() {
    // render the canvas
    drawRect(0, 0, cvs.width, cvs.height, "BLACK");
    // render the ball
    drawCircle(ball.x, ball.y, ball.radius, ball.color);
}

// Game init function
function game() {
    render();
}

// Number of frames per second
let framePerSecond = 50;

// call the funcyion 50 times every 1 sec
let loop = setInterval(game, 1000/framePerSecond);