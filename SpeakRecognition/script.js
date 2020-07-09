const msg = document.getElementById('msg');

const randomNumber = Math.floor(Math.random()*100) + 1;

let flag=true;

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new window.SpeechRecognition();

function writeMsg(speech) {
    msg.innerHTML = `
        <h2>You Said:</h2>
        <span class="box">${speech}</span>
    `;
}

function checkNumber(speech) {
    const num = +speech;

    if(Number.isNaN(num)){
        msg.innerHTML += `<p>This is not a valid Number</p>`;
        return ;
    }

    if(num<1 || num>100){
        msg.innerHTML += `<p>Number must be between 1 and 100</p>`;
        return ;
    }

    if(num == randomNumber){
        document.body.innerHTML = `<div class="container">
            <h2>Congrats! You guessed the number!
                <br><br>
                It was ${num}
            </h2>
            <button class="play-again" id="play-again">
                Play Again
            </button>
        </div>`;

        flag = false;
    }
    else if(num < randomNumber){
        msg.innerHTML += `<p>GO HIGHER !!</p>`;
    }
    else{
        msg.innerHTML += `<p>GO LOWER !!</p>`;
    }
}

function onSpeak(evt) {
    const speech = evt.results[0][0].transcript;

    writeMsg(speech);
    checkNumber(speech);
}


recognition.start();
recognition.addEventListener('result',onSpeak);
recognition.addEventListener('end',()=>{
    if(!flag){
        return ;
    }
    recognition.start();
});

window.addEventListener('click',(e)=>{
    if(e.target.id=='play-again'){
        window.location.reload();
    }
});