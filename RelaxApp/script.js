const text = document.getElementById('text');
const container = document.getElementById('container');

const totalTime = 7500;
const breatheTime = (totalTime * 2) / 5;
const holdTime = totalTime / 5;


function BreatheAnimation(){
    text.innerText = 'Breathe In!';
    container.className = 'container grow';

    setTimeout(()=>{
        text.innerText = 'Hold!!';
        setTimeout(()=>{
            text.innerText = 'Breathe Out!';
            container.className = 'container shrink';
        },holdTime);
    },breatheTime);
}

BreatheAnimation();
setInterval(BreatheAnimation,totalTime);
