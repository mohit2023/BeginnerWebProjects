const rulesBtn = document.getElementById('rules-btn');
const rules =document.getElementById('rules');
const closeBtn = document.getElementById('close');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const scoreEl = document.getElementById('score');
const highestScoreEl = document.getElementById('highestscore');
const highScoreVal = document.getElementById('high-score-value');
const newHighestScore = document.getElementById('new-highest-score');
const gameWon = document.getElementById('won-game');
const left = document.getElementById('left');
const right = document.getElementById('right');

let score = 0;
let totalwidth = canvas.width;
let totalheight = canvas.height;
let highestScore = localStorage.getItem('highestScore') ? JSON.parse(localStorage.getItem('highestScore')) : 0;
highestScoreEl.innerText = highestScore;

const ball = {
    x : totalwidth / 2,
    y : totalheight / 2 + 10,
    radius : 5,
    speed : 2,
    dx : 2,
    dy : 2,
    visible : true,
    color: '#9e0ffd'
}

const paddle = {
    x : totalwidth / 2 - 20,
    y : totalheight - 8,
    w : 40,
    h : 3,
    speed : 3,
    dx : 0,
    visible : true,
    color : '#fa0418'
}

const brickLayout = {
    w : 25,
    h : 6,
    gx : 8,
    gy : 5,
    offsetx : 20,
    offsety : 10,
    color: '#10bb3b',
    visible : true
}

let bricks = [];
let row = Math.floor((totalwidth) / 42);
let col = Math.floor((totalheight / 2 -25) / 9);

for(let i=0 ; i <= row ; i++) {
    bricks[i] = [];
    for(let j=0 ; j <= col ;j++) {
        const x = i*(brickLayout.w + brickLayout.gx) + brickLayout.offsetx;
        const y = j*(brickLayout.h + brickLayout.gy) + brickLayout.offsety;
        bricks[i][j] = {x,y, ...brickLayout} ;
    }
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x,ball.y,ball.radius, 0, 2 * Math.PI);
    ctx.fillStyle = ball.visible ? ball.color : 'transparent';
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddle.x,paddle.y,paddle.w,paddle.h);
    ctx.fillStyle = paddle.visible ? paddle.color : 'transparent';
    ctx.fill();
    ctx.closePath();
}

function drawScore() {
    scoreEl.innerText = score;
}

function drawBricks() {
    bricks.forEach(brickRow => {
        brickRow.forEach(brick => {
            ctx.beginPath();
            ctx.rect(brick.x,brick.y,brick.w,brick.h);
            ctx.fillStyle = brick.visible ? brick.color : 'transparent';
            ctx.fill();
            ctx.closePath();
        });
    });
}


function draw() {
    ctx.clearRect(0,0,totalwidth,totalheight);
    drawBall();
    drawPaddle();
    drawScore();
    drawBricks();
}

function increaseScore() {

    score++;

    if(score == (row+1)*(col+1)) {

        highestScore = score;
        localStorage.setItem('highestScore',JSON.stringify(highestScore));
        highestScoreEl.innerText = highestScore;

        gameWon.classList.add('show');
        setTimeout(()=>{
            showAllBricks();
            score = 0;
            paddle.x = canvas.width / 2 - 40;
            paddle.y = canvas.height - 20;
            ball.x = canvas.width / 2;
            ball.y = canvas.height / 2;
            gameWon.classList.remove('show');
        },2000);
    }
}

function showAllBricks() {
    bricks.forEach(brickrow => {
        brickrow.forEach(brick => {
            brick.visible= true;
        });
    });
}

function movepaddle() {
    paddle.x += paddle.dx;
    
    if(paddle.x > totalwidth - paddle.w){
        paddle.x=totalwidth - paddle.w;
    }
    if(paddle.x < 0){
        paddle.x = 0;
    }
}

function moveball() {
    ball.x += ball.dx;
    ball.y += ball.dy;


    if(ball.x + ball.radius > totalwidth || ball.x - ball.radius < 0){
        ball.dx *= -1;
    }
    if(ball.y + ball.radius > totalheight || ball.y - ball.radius < 0){
        ball.dy *= -1;
    }

    if(ball.x+ball.radius >= paddle.x && ball.x-ball.radius <= paddle.x + paddle.w && ball.y + ball.radius >= paddle.y ){
        if(ball.dy > 0){
            ball.dy *= -1;
        }
    }

    bricks.forEach(brickrow => {
        brickrow.forEach(brick => {
            if(brick.visible){
                if(ball.x+ball.radius>=brick.x && ball.x-ball.radius<=brick.x+brick.w && ball.y+ball.radius>=brick.y && ball.y-ball.radius<=brick.y+brick.h){
                    brick.visible = false;
                    ball.dy *= -1;

                    increaseScore();
                }
            }
        });
    });

    if(ball.y + ball.radius >= totalheight){
        
        if(score>highestScore){
            highestScore = score;
            localStorage.setItem('highestScore',JSON.stringify(highestScore));
            highestScoreEl.innerText = highestScore;
            highScoreVal.innerText = highestScore;

            newHighestScore.classList.add('show');
            setTimeout(()=>{
                newHighestScore.classList.remove('show');
            },2000);

        }

        score=0;
        showAllBricks();
    }


}

function keydown(evt) {
    const key = evt.key;
    if(key == "ArrowRight"){
        paddle.dx = paddle.speed;
    }
    if(key == "ArrowLeft"){
        paddle.dx = -paddle.speed;
    }
}

function keyup(evt) {
    const key = evt.key;
    if(key == "ArrowRight" || key == "ArrowLeft"){
        paddle.dx = 0;
    }
}

function update() {
    movepaddle();
    moveball();

    draw();

    requestAnimationFrame(update);
}


update();

rulesBtn.addEventListener('click',()=>rules.classList.add('show'));
closeBtn.addEventListener('click',()=>rules.classList.remove('show'));

window.addEventListener('keydown',keydown);
window.addEventListener('keyup',keyup);

left.addEventListener('click',()=>{
    if(paddle.dx >= 0){
        paddle.dx = -paddle.speed;
    }
    else{
        paddle.dx = 0;
    }
});
right.addEventListener('click',()=>{
    if(paddle.dx <= 0){
        paddle.dx = paddle.speed;
    }
    else{
        paddle.dx = 0;
    }
});