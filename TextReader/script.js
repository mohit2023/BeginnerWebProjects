const main = document.querySelector('main');
const toggle = document.getElementById('toggle');
const textBox = document.getElementById('text-box');
const closeBtn = document.getElementById('close');
const VoiceOptions = document.getElementById('voice-options');
const text = document.getElementById('text');
const readText = document.getElementById('read-text');


const data = [
    {
        image: 'img/hungry.jpg',
        text: "I'm Hungry"
    },
    {
        image: 'img/drink.jpg',
        text: "I'm Thirsty"
    },
    {
        image: 'img/bored.jpg',
        text: "I'm Bored"
    },
    {
        image: 'img/tired.jpg',
        text: "I'm Tired"
    },
    {
        image: 'img/hurt.jpg',
        text: "I'm Hurt"
    },
    {
        image: 'img/happy.jpg',
        text: "I'm Happy"
    },
    {
        image: 'img/sad.jpg',
        text: "I'm Sad"
    },
    {
        image: 'img/angry.jpg',
        text: "I'm Angry"
    },
    {
        image: 'img/scared.jpg',
        text: "I'm Scared"
    },
    {
        image: 'img/outside.jpg',
        text: "I want to go Outside"
    },
    {
        image: 'img/home.jpg',
        text: "I want to go Home"
    },
    {
        image: 'img/school.jpg',
        text: "I'm want to go to School"
    },
    {
        image: 'img/grandmas.jpg',
        text: "I'm want to go to Grandmas"
    }
];

const synth = window.speechSynthesis; 

let voices = [];

const utterThis = new SpeechSynthesisUtterance();


function speakText(text) {
    utterThis.text = text;
    synth.speak(utterThis);
}

function setVoice(e) {
    utterThis.voice = voices.find(voice => voice.name === e.target.value);
}

function populateVoiceList() {
    voices = synth.getVoices();
    voices.forEach(voice => {
        const option = document.createElement('option');
        option.value = voice.name;

        option.innerText = voice.name + '(' + voice.lang + ')';

        VoiceOptions.appendChild(option);
    });  

}

data.forEach((item)=> {
    const box = document.createElement('div');
    const {image , text} = item;

    box.innerHTML = `
        <img src="${image}">
        <p>${text}</p>
    `;

    box.addEventListener('click',()=>{
        box.classList.add('active');
        setTimeout(()=>box.classList.remove('active'),1500);
        speakText(text);
    });

    main.appendChild(box);
});

toggle.addEventListener('click',()=>textBox.classList.toggle('show'));

closeBtn.addEventListener('click',()=>textBox.classList.remove('show'));

readText.addEventListener('click',()=>speakText(text.value));

synth.addEventListener('voiceschanged',populateVoiceList);

VoiceOptions.addEventListener('change',setVoice);