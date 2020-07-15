const balance = document.getElementById('balance');
const expense = document.getElementById('expense');
const income = document.getElementById('income');
const list = document.getElementById('list');
const form = document.getElementById('form');
const amount = document.getElementById('amount');
const text = document.getElementById('text');



const localStorageTransaction = JSON.parse(localStorage.getItem('transactions'));
const localStorageBalance = JSON.parse(localStorage.getItem('balance'));
const localStorageIncome = JSON.parse(localStorage.getItem('income'));
const localStorageExpense = JSON.parse(localStorage.getItem('expense'));

let transactions = localStorage.getItem('transactions') !==null ? localStorageTransaction : [];

let balanceAmount = localStorage.getItem('balance') !==null ? localStorageBalance : 0;
let incomeAmount = localStorage.getItem('income') !==null ? localStorageIncome : 0;
let expenseAmount = localStorage.getItem('expense') !==null ? localStorageExpense : 0;



function updateValues() {
    balance.innerText = `$${balanceAmount.toFixed(2)}`;
    income.innerText = `$${incomeAmount.toFixed(2)}`;
    expense.innerText = `$${expenseAmount.toFixed(2)}`;

    localStorage.setItem('balance', JSON.stringify(balanceAmount));
    localStorage.setItem('income', JSON.stringify(incomeAmount));
    localStorage.setItem('expense', JSON.stringify(expenseAmount));
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

function generateID() {
    let dt = new Date().getTime();
    let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        let r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}

function removeTransaction(id,value) {
    transactions = transactions.filter(transaction => transaction.id !== id);
    
    balanceAmount -= value;
    if(value < 0){
        expenseAmount += value;
    }
    else{
        incomeAmount -= value;
    }

    init();
}

function populateDOM(transaction) {
    const li = document.createElement('li');

    const sign = transaction.amount < 0 ? '-' : '+';

    li.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

    const id = transaction.id;

    li.innerHTML = `
    ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span> <button class="delete-btn" onclick="removeTransaction('${id}',${transaction.amount})">X</button>
    `;

    list.appendChild(li);
}

function addTransaction(evt) {
    evt.preventDefault();

    if(text.value.trim() === '' || amount.value === ''){
        alert('Fill amount and text fields');
        return ;
    }

    const transaction = {
        id: generateID(),
        text: text.value,
        amount: +amount.value
    };

    transactions.push(transaction);
    populateDOM(transaction);

    balanceAmount += transaction.amount;
    if(transaction.amount < 0){
        expenseAmount -= transaction.amount;
    }
    else{
        incomeAmount += transaction.amount;
    }

    updateValues();

    text.value = '';
    amount.value = '';
}

function init() {

    list.innerHTML = '';

    transactions.forEach(populateDOM);
    updateValues();
}

init();

form.addEventListener('submit',addTransaction);