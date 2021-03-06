const main = document.getElementById('main');
const addUserBtn = document.getElementById('add');
const showMillionaireBtn = document.getElementById('filter');
const doubleBtn = document.getElementById('double');
const sortBtn = document.getElementById('sort');
const wealthBtn = document.getElementById('total');

let data = [];
let millionaire = [];

function formatMoney(number){
    return number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

function updateDOM(array = data) {

    main.innerHTML = '<h2><strong>Person</strong>Wealth</h2>';
    array.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('person');

        div.innerHTML = `<strong>${item.name}</strong>$${formatMoney(item.money)}`;

        main.appendChild(div);
    });
}

function addInData(obj) {
    data.push(obj);

    updateDOM();
}

async function getRandomUser(){
    const response = await fetch('https://cors-anywhere.herokuapp.com/https://randomuser.me/api/');

    const data = await response.json();

    const user = data.results[0];

    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.random() * 1000000
    };

    showMillionaireBtn.classList.remove('active');

    addInData(newUser);

}

function doubleMoney(){
    showMillionaireBtn.classList.remove('active');
    data = data.map(item => {
        return {...item,money:item.money * 2};
    });

    updateDOM();
}

function filterMillionaire(){
    showMillionaireBtn.classList.toggle('active');
    if(!showMillionaireBtn.classList.contains('active')){
        updateDOM();
        return ;
    }
    millionaire = data.filter(item => item.money>1000000);
    updateDOM(millionaire);
}

function sortByRichest(){
    if(showMillionaireBtn.classList.contains('active')){
        millionaire = millionaire.sort((a,b) => b.money-a.money);
        updateDOM(millionaire);
        return ;
    }
    data = data.sort((a,b) => b.money-a.money);
    updateDOM();
}

function calculateWealth(){

    const check = document.getElementById('wealth');
    if(check != null){
        return;
    }

    let current;
    if(showMillionaireBtn.classList.contains('active')){
        current = millionaire;
    }
    else{
        current = data;
    }

    const wealth = current.reduce((acc,item) => (acc+=item.money),0);

    const total = document.createElement('h3');
    total.id = 'wealth';
    total.innerHTML = `Total Wealth:<strong>$${formatMoney(wealth)}</strong>`;

    main.appendChild(total);
}


addUserBtn.addEventListener('click',getRandomUser);
doubleBtn.addEventListener('click',doubleMoney);
showMillionaireBtn.addEventListener('click',filterMillionaire);
sortBtn.addEventListener('click',sortByRichest);
wealthBtn.addEventListener('click',calculateWealth);
/*showMillionaireBtn.addEventListener('focusout',function(){
    showMillionaireBtn.classList.remove('active');
    updateDOM();
});*/

getRandomUser();
getRandomUser();
getRandomUser();