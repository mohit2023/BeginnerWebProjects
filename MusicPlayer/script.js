const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');
const progress = document.getElementById('progress');
const musicContainer = document.getElementById('music-container');
const title = document.getElementById('title');
const audio = document.getElementById('audio');
const img = document.getElementById('cover');
const progressContainer = document.getElementById('progress-container');

const songs = ['hey','summer','ukulele'];
let songIndex;

function load(songIndex) {
    title.innerText = songs[songIndex];
    img.src = `img/${songs[songIndex]}.jpg`;
    audio.src = `music/${songs[songIndex]}.mp3`;
}

function playNextSong() {
    songIndex++;

    if(songIndex === songs.length){
        songIndex=0;
    }

    load(songIndex);
    if(musicContainer.classList.contains('play')){
        audio.play();
    }
}

function playPrevSong() {
    songIndex--;

    if(songIndex === -1){
        songIndex=songs.length-1;
    }

    load(songIndex);
    if(musicContainer.classList.contains('play')){
        audio.play();
    }
}

function updateProgress(e) {
    const {duration , currentTime} = e.srcElement;

    let progressPercent = (currentTime/duration)*100;

    progress.style.width = `${progressPercent}%`;
}

function songStatusUpdate(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    
    const songFraction = (clickX/width);

    audio.currentTime = songFraction* audio.duration;

}


songIndex=0;
load(songIndex);

playBtn.addEventListener('click',() =>{
    const icon = playBtn.querySelector('i.fa');
    const flag = icon.classList.contains('fa-play');

    musicContainer.classList.toggle('play');
    if(flag){
        icon.classList.add('fa-pause');
        icon.classList.remove('fa-play');
        audio.play();
    }
    else{
        icon.classList.remove('fa-pause');
        icon.classList.add('fa-play');
        audio.pause();
    }
});

nextBtn.addEventListener('click',playNextSong);
prevBtn.addEventListener('click',playPrevSong);
audio.addEventListener('ended',playNextSong);

audio.addEventListener('timeupdate',updateProgress);
progressContainer.addEventListener('click',songStatusUpdate);
