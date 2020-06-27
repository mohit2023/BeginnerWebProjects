const video = document.getElementById('video');
const play = document.getElementById('play');
const stop = document.getElementById('stop');
const curtime = document.getElementById('curtime');
const duration = document.getElementById('duration');
const rwd = document.getElementById('rwd');
const fwd = document.getElementById('fwd');

function toggleVideoStatus(){
    if(video.paused){
        video.play();
    }
    else{
        video.pause();
    }
}

function updatePlayIcon() {
    if(video.paused){
        play.innerHTML = '<i class="fa fa-play fa-lg"></i>'
    }
    else{
        play.innerHTML = '<i class="fa fa-pause fa-lg"></i>';
    }
}

function StopVideo() {
    video.currentTime = 0;
    video.pause();
}


function firstload() {

    let totalTime = video.duration;
    console.log(totalTime);
    let minutes = Math.floor(totalTime / 60);
    let seconds = Math.floor(totalTime - minutes*60);
    console.log(minutes);
    console.log(seconds);
    
    let minutesValue;
    if(minutes<10){
        minutesValue = '0' + minutes;
    }
    else{
        minutesValue = minutes;
    }

    let secondsValue;
    if(seconds<10){
        secondsValue = '0' + seconds;
    }
    else{
        secondsValue = seconds;
    }

    let videoTime= minutesValue + ':' + secondsValue;

    duration.innerText = videoTime;
}


video.addEventListener('click',toggleVideoStatus);
video.addEventListener('pause',updatePlayIcon);
video.addEventListener('play',updatePlayIcon);

play.addEventListener('click',toggleVideoStatus);
stop.addEventListener('click',StopVideo);

firstload();
