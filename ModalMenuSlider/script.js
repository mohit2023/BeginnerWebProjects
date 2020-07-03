const toggle = document.getElementById('show-nav');
const open = document.getElementById('open');
const close = document.getElementById('close')
const modal = document.getElementById('modal');
const navbar = document.getElementById('nav-bar');

toggle.addEventListener('click',() => {
    document.body.classList.toggle('shift-right');
});

open.addEventListener('click', () => {
    modal.classList.add('show-nav');
});

close.addEventListener('click',() => {
    modal.classList.remove('show-nav');
});

window.addEventListener('click',e =>{
    if(document.body.classList.contains('shift-right') && e.target!=toggle && !toggle.contains(e.target) && e.target!=navbar && !navbar.contains(e.target)){
        console.log(1);
        document.body.classList.remove('shift-right');
    }
    e.target == modal ? modal.classList.remove('show-nav') : false;
});






//////---------///////////

const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const pass1 = document.getElementById('password1');
const pass2 = document.getElementById('password2');
const vp1 = document.getElementById('vp1');
const vp2 = document.getElementById('vp2');
let flag=true;


function showError(input){
    input.className = 'error';
    flag=false;
}

function showSuccess(input){
    input.className = 'success';
}

function is_empty(input){
    if(input.value.length == 0){
        console.log(input);
        console.log(input.value);
        showError(input);
    }
    else{
        showSuccess(input);
    }
}

function checkPassmatch(input1,input2){
    if(input1.value === input2.value){
        showSuccess(input2);
    }
    else{
        showError(input2);
    }
}

function changeType(evt){
    const obj = evt.target;
    const input= obj.parentElement.querySelector('input');
    if(input.type === 'text'){
        input.type = 'password';
        obj.className = 'fa fa-eye'
    }
    else{
        input.type = 'text';
        obj.className = 'fa fa-eye-slash'
    }    
}



form.addEventListener('submit', function(evt){
    
    flag = true;

    is_empty(username);
    is_empty(email);
    is_empty(pass2);
    is_empty(pass1);

    checkPassmatch(pass1,pass2);

    if(flag === false){
        evt.preventDefault();
    }

});


vp1.addEventListener('click',changeType);
vp2.addEventListener('click',changeType);

