const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const pass1 = document.getElementById('pass1');
const pass2 = document.getElementById('pass2');
const vp1 = document.getElementById('vp1');
const vp2 = document.getElementById('vp2');
let flag=true;

function showError(input,msg){
    flag=false;
    const formfield = input.parentElement;
    formfield.className = 'form-field error';
    const small = formfield.querySelector('small');
    small.innerText = msg;
}

function showSuccess(input){
    const formfield = input.parentElement;
    formfield.className = 'form-field success';
}

function checkLength(input,min,max){
    if(input.value.trim().length < min){
        showError(input,`${input.name} must have atleast ${min} characters`)
    }
    else if(input.value.trim().length > max){
        showError(input,`${input.name} must have less than ${max} characters`)
    }
    else{
        showSuccess(input);
    }
}

function checkEmail(input){
    const format = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    if(format.test(input.value)){
        showSuccess(input);
    }
    else{
        showError(input,'Invalid Email');
    }
}

function checkPassmatch(input1,input2){
    if(input1.value === input2.value){
        showSuccess(input2);
    }
    else{
        showError(input2,`${input2.name} did not match`);
    }
}

form.addEventListener('submit', function(evt){
    
    flag = true;
    checkLength(username,3,15);
    checkLength(pass1,6,20);

    checkEmail(email);

    checkPassmatch(pass1,pass2);

    if(flag === false){
        evt.preventDefault();
    }

});


function changeType(evt){
    const obj = evt.path[0];
    let str= '#pass' + obj.id[obj.id.length - 1];
    const formfield = obj.parentElement.parentElement.parentElement;
    const input = formfield.querySelector(str);
    console.log(input);

    if(input.type === 'text'){
        input.type = 'password';
    }
    else{
        input.type = 'text';
    }
}




vp1.addEventListener('change',changeType);
vp2.addEventListener('change',changeType);