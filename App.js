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

// Create the user padle

const user = {
    x: (cvs.width - 60)/2, //in the middle of the screen
    y: cvs.height - 30, // on the bottom of the screen
    width: 60,
    height: 10,
    color: "WHITE",
    score: 0
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

// control the user paddles
function movePaddle(evt) {
    let rect = cvs.getBoundingClientRect();

    user.x = evt.clientX - rect.top - user.width/2;
}
cvs.addEventListener("mousemove", movePaddle);

// colission detection
function collision(ball, user) {
    ball.top = ball.y - ball.radius;
    ball.bottom = ball.y + ball.radius;
    ball.right = ball.x + ball.radius;
    ball.left = ball.x - ball.radius;

    user.top = user.y;
    user.bottom = user.y + user.height;
    user.left = user.x;
    user.right = user.x + user.width;

    return ball.right > user.left && ball.bottom > user.top && ball.left < user.right && ball.top < user.bottom;
}

// Render the game function

function render() {
    // render the canvas
    drawRect(0, 0, cvs.width, cvs.height, "BLACK");
    // render the ball
    drawCircle(ball.x, ball.y, ball.radius, ball.color);
    // draw user's paddle
    drawRect(user.x, user.y, user.width, user.height, user.color);
}

// update: position, move, ...
function update() {

    // the ball velocity
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;

    // collision with canvas walls

    if(ball.y + ball.radius > cvs.height || ball.y - ball.radius < 0){
        ball.velocityY = -ball.velocityY;
    }
    if(ball.x + ball.radius > cvs.width || ball.x - ball.radius < 0){
        ball.velocityX = -ball.velocityX;
    }


    if(collision(ball, user)){
        // where the ball hit the player
        let collidePoint = ball.y - (user.y + user.height/2);
        // normalization 
        collidePoint = collidePoint/(user.height/2);
        // calculate angle in Radians 
        let angleRad = collidePoint * (Math.PI/4);
        // X direction of the ball its hit 
        let direction = (ball.x + ball.radius < cvs.width/2) ? 1 : -1;

        //change velocity X and Y 
        ball.velocityX = direction * ball.speed * Math.cos(angleRad);
        ball.velocityY = direction * ball.speed * Math.sin(angleRad);
        // every time the ball hit the paddle increase its speed
        ball.speed += 0.1;
    }

}
// Game init function
function game() {
    render();
    update();
}

// Number of frames per second
let framePerSecond = 50;

// call the funcyion 50 times every 1 sec
let loop = setInterval(game, 1000/framePerSecond);