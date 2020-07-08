const container = document.getElementById('container');
const days = document.getElementById('days');
const hours = document.getElementById('hours');
const min = document.getElementById('min');
const sec = document.getElementById('sec');
const year = document.getElementById('year');
const loader = document.getElementById('loader');

let currentYear = new Date().getFullYear();
let newYearTime = new Date(`January 01 ${currentYear+1} 00:00:00`);


function updateCountdown() {
    const currentTime = new Date();

    const diff = newYearTime - currentTime;

    const d = Math.floor(diff / 1000 / 60 / 60 / 24);
    const h = Math.floor(diff / 1000 / 60 / 60) % 24;
    const m = Math.floor(diff / 1000 / 60) % 60;
    const s = Math.floor(diff / 1000) % 60;

    if(d===0 && h===0 && m===0 && s===0){
        currentYear = new Date().getFullYear();
        newYearTime = new Date(`January 01 ${currentYear+1} 00:00:00`);
        year.innerText = currentYear + 1;
    }

    days.innerText = d;
    hours.innerText = h < 10 ? '0' + h : h ;
    min.innerText = m < 10 ? '0' + m : m ;
    sec.innerText = s < 10 ? '0' + s : s ;
}

setTimeout(() => {
    loader.remove();
    container.style.display = 'flex';
    year.innerText = currentYear + 1;
}, 1000);

setInterval(updateCountdown,1000);