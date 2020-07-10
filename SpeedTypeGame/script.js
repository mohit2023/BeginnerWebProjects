const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endGame = document.getElementById('end-game');
const DifficultyEl = document.getElementById('difficulty');
const BeginBtn = document.getElementById('begin-btn');


let randomWord;
let time = 10;
let score = 0;
let difficulty;

async function getRandomWord() {
    const response = await fetch(`http://random-word-api.herokuapp.com/word?number=1`);
    
    const data = await response.json();

    randomWord = data[0];
    word.innerText = randomWord;
}

function updateScore() {
    score++;
    scoreEl.innerText = score;
}

function gameOver() {
    endGame.innerHTML = `
        <h2>Time ran out!</h2>
        <p>Your final score is ${score}</p>
        <button onclick="location.reload()">Reload</button>
    `;

    endGame.style.display = 'flex';
}

function updateTime() {
    time--;
    timeEl.innerText = time;

    if(time === 0){
        clearInterval(timeInterval);
        gameOver();
    }
}

difficulty = localStorage.getItem('difficulty') !==null ? localStorage.getItem('difficulty') : 'easy';

DifficultyEl.value = difficulty;

getRandomWord();


let timeInterval;

text.addEventListener('input',e => {
    if(e.target.value === randomWord){
        getRandomWord();
        updateScore();
        
        if(difficulty === 'hard'){
            time+=2;
        }
        else if(difficulty === 'medium'){
            time+=4;
        }
        else{
            time+=6;
        }

        e.target.value = '';
    }
});

settingsBtn.addEventListener('click',()=>settings.classList.toggle('hide'));

DifficultyEl.addEventListener('change', ()=>{
    difficulty = DifficultyEl.value;
    localStorage.setItem('difficulty',difficulty);
});

BeginBtn.addEventListener('click',()=>{
    clearInterval(timeInterval);
    text.focus();
    time = 10;
    score = 0;
    scoreEl.innerText = score;
    timeEl.innerText = time;
    timeInterval = setInterval(updateTime,1000);
})