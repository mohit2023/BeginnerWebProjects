const showBtn = document.getElementById('show');
const hideBtn = document.getElementById('hide');
const addContainer = document.getElementById('add-container');
const addCard = document.getElementById('add-card');
const questionEl = document.getElementById('Question');
const answerEl = document.getElementById('Answer');
const clearBtn = document.getElementById('clear');
const cardsContainer = document.getElementById('cards-container');
const currentNav = document.getElementById('current');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

let cardsEl;
let currentActiveCard;
let cardsData;

function setLocalStorage() {
    localStorage.setItem('cards', JSON.stringify(cardsData));
}

function updateCurrentNav() {
    currentNav.innerText = `${currentActiveCard+1}/${cardsData.length}`;
}

function createCardInDOM(item , index) {
    const card = document.createElement('div');
    card.classList.add('card');

    
    if(currentActiveCard === index) {
        card.classList.add('active');
    }

    card.innerHTML = `
    <div class="inner-card">
        <div class="inner-card-front">
            <p>${item.question}</p>
        </div>
        <div class="inner-card-back">
            <p>${item.answer}</p>
        </div>
    </div>
    `;

    card.addEventListener('click',()=>card.classList.toggle('show-answer'));

    cardsEl.push(card);
    console.log(cardsEl[index]);
    cardsContainer.appendChild(card);


}

function CallOnLoad() {
    cardsData = JSON.parse(localStorage.getItem('cards'));
    cardsData = cardsData === null ? [] : cardsData;
    currentActiveCard = 0;
    cardsEl = [];

    cardsData.forEach(createCardInDOM);

    if(cardsData.length > 0){
        updateCurrentNav();
    }

}

CallOnLoad();

showBtn.addEventListener('click',()=> addContainer.classList.add('show'));

hideBtn.addEventListener('click',()=> addContainer.classList.remove('show'));

addCard.addEventListener('click', ()=> {
    const question = questionEl.value;
    const answer = answerEl.value;

    if(question.trim() === '' || answer.trim() === ''){
        alert('Type question and answer both');
        return ;
    }

    const newCard = {question , answer};
    cardsData.push(newCard);
    setLocalStorage();
    createCardInDOM(newCard,cardsData.length-1);
    updateCurrentNav();

    questionEl.value = '';
    answerEl.value = '';
    addContainer.classList.remove('show');

});

clearBtn.addEventListener('click', ()=>{
    cardsData = [];
    setLocalStorage();
    window.location.reload();
});

nextBtn.addEventListener('click',()=> {
    if(currentActiveCard === cardsData.length-1){
        return ;
    }
    cardsEl[currentActiveCard].className = 'card left';
    currentActiveCard += 1;
    cardsEl[currentActiveCard].className = 'card active';
    updateCurrentNav();

});

prevBtn.addEventListener('click',()=> {
    if(currentActiveCard === 0){
        return ;
    }
    cardsEl[currentActiveCard].className = 'card';
    currentActiveCard -= 1;
    cardsEl[currentActiveCard].className = 'card active';
    updateCurrentNav();

});