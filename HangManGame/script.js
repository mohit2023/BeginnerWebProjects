const playAgain = document.getElementById('play-again');
const notify = document.getElementById('already-choosen');
const wrongContainer = document.getElementById('wrong');
const popup = document.getElementById('result');
const finalMsg = document.getElementById('final-msg')
const wordDisplay = document.getElementById('word');
const answer = document.getElementById('answer');

let selectedWord;
const word = ['application','wizard','interface','programming'];

const correctLetters = [];
const wrongLetters = [];

let gameOn = true;

const figurepart = document.querySelectorAll('.figure-part');

function wait(ms) {
    let start = new Date().getTime();
    var end = start;
    while(end < start+ms){
        end = new Date().getTime();
    }
}

function winPopup() {
    gameOn = false;
    //wait(1000);
    finalMsg.innerText = `Hurrayyy!!!  You Won!  🎉🎉🥳`;
    popup.style.display = 'flex';
}
function loosePopup() {
    gameOn = false;
    //wait(1000);
    finalMsg.innerText = `Oops!!  You Lost  😭😭`;
    answer.innerText = `...the word was ${selectedWord}`;
    popup.style.display = 'flex';
}

function showNotification() {
    notify.classList.add('show');

    setTimeout(()=>{
        notify.classList.remove('show');
    },2000);
}

function displayWrongContainer() {
    wrongContainer.innerHTML = 
    `${wrongLetters.length > 0 ? `<p>Wrong</p>` : '' }
    <span>${wrongLetters.map(letter => `${letter}`)}</span>`;

    figurepart.forEach((part,index) => {
        if(index < wrongLetters.length){
            part.style.display = 'block';
        }
        else{
            part.style.display = 'none';
        }
    });
    
    if(figurepart.length === wrongLetters.length ){
        loosePopup();
    }

}


function displayWord() {
    wordDisplay.innerHTML = `
    ${selectedWord.split('').map(letter => `<span class="letter">${correctLetters.includes(letter) ? letter : ''}</span>` ).join('')} `;
    
    const text = wordDisplay.innerText.replace(/\n/g,'');

    if(text === selectedWord){
        winPopup();
    }
}

selectedWord = word[Math.floor(Math.random() * word.length)];
displayWord();

playAgain.addEventListener('click',() => {
    gameOn = true;
    selectedWord = word[Math.floor(Math.random() * word.length)];
    correctLetters.splice(0);
    wrongLetters.splice(0);
    displayWord();
    displayWrongContainer();

    popup.style.display = 'none';
});

window.addEventListener('keydown', e => {
    if(!gameOn){
        return;
    }
    if(e.keyCode>=65 && e.keyCode<=90){
        const letter = e.key;
        if(selectedWord.includes(letter)){
            if(correctLetters.includes(letter)){
                showNotification();
            }
            else{
                correctLetters.push(letter);
                displayWord();
            }
        }
        else{
            if(wrongLetters.includes(letter)){
                showNotification();
            }
            else{
                wrongLetters.push(letter);
                displayWrongContainer();
            }
        }
    }
});