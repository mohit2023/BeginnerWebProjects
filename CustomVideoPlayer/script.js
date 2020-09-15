const video = document.getElementById('video');
const play = document.getElementById('play');
const stop = document.getElementById('stop');
const curtime = document.getElementById('curtime');
const duration = document.getElementById('duration');
const rwd = document.getElementById('rwd');
const fwd = document.getElementById('fwd');
const progress = document.getElementById('progress');
const mute = document.getElementById('mute');

let intervalRwd;
let intervalFwd;

function DeactivateFwd(){
    clearInterval(intervalFwd);
    fwd.classList.remove('active');
}
function DeactivateRwd(){
    clearInterval(intervalRwd);
    rwd.classList.remove('active');
}

function toggleVideoStatus(){
    if(video.paused){
        DeactivateFwd();
        DeactivateRwd();
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
        DeactivateFwd();
        DeactivateRwd();
        play.innerHTML = '<i class="fa fa-pause fa-lg"></i>';
    }
}

function StopVideo() {
    DeactivateRwd();
    DeactivateFwd();
    video.currentTime = 0;
    video.pause();
}

function toggleMuteIcon(){
    if(video.muted){
        mute.innerHTML = '<i class="fa fa-volume-up fa-lg" aria-hidden="true"></i>'
        video.muted = false;
    }
    else{
        mute.innerHTML = '<i class="fa fa-volume-off fa-lg" aria-hidden="true"></i>';
        video.muted = true;
    }
}


function firstload() {

    let totalTime = video.duration;
    let minutes = Math.floor(totalTime / 60);
    let seconds = Math.floor(totalTime - minutes*60);
    
    if(minutes<10){
        minutes = '0' + minutes;
    }

    if(seconds<10){
        seconds = '0' + seconds;
    }

    let videoTime= minutes + ':' + seconds;

    duration.innerText = videoTime;

    if(video.muted){
        mute.innerHTML = '<i class="fa fa-volume-off fa-lg" aria-hidden="true"></i>';
    }
}

function updateProgress(){
    progress.value = (video.currentTime / video.duration) * 100;

    let totalTime = video.currentTime;
    let minutes = Math.floor(totalTime / 60);
    let seconds = Math.floor(totalTime - minutes*60);
    
    if(minutes<10){
        minutes = '0' + minutes;
    }

    if(seconds<10){
        seconds = '0' + seconds;
    }

    let videoTime= minutes + ':' + seconds;

    curtime.innerText = videoTime;

}

function setVideoProgress(evt){
    let flag=false;
    if(video.paused){
        flag=true;
    }
    video.pause();
    let value= evt.offsetX/progress.clientWidth;
    let temp = (value * video.duration);
    video.currentTime=temp;

    if(!flag){
        video.play();
    }
}



function windBackward(){
    if(video.currentTime<=3){
        StopVideo();
    }
    else{
        video.currentTime -= 3;
    }
}
function windForward(){
    if(video.duration-video.currentTime<=3){
        StopVideo();
    }
    else{
        video.currentTime += 3;
    }
}

function VideoBackward(){
    DeactivateFwd();
    if(rwd.classList.contains('active')){
        video.play();
    }
    else{
        rwd.classList.add('active');
        video.pause();
        intervalRwd = setInterval(windBackward,200);
    }
}

function VideoForward(){
    DeactivateRwd();
    if(fwd.classList.contains('active')){
        video.play();
    }
    else{
        fwd.classList.add('active');
        video.pause();
        intervalFwd = setInterval(windForward,200);
    }
}


video.addEventListener('click',toggleVideoStatus);
video.addEventListener('pause',updatePlayIcon);
video.addEventListener('play',updatePlayIcon);

play.addEventListener('click',toggleVideoStatus);
stop.addEventListener('click',StopVideo);
video.addEventListener('ended',StopVideo);

video.addEventListener('timeupdate',updateProgress);
progress.addEventListener('click', setVideoProgress);

rwd.addEventListener('click',VideoBackward);
fwd.addEventListener('click',VideoForward);

mute.addEventListener('click',toggleMuteIcon);

video.addEventListener('canplaythrough',firstload);
