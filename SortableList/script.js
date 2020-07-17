const draggableList = document.getElementById('draggable-list');
const check = document.getElementById('check');

const richest = [
    "Jeff Bezos",
    "Bill Gates",
    "Mark Zuckerberg",
    "Bernard Arnault",
    "Warren Buffett",
    "Larry Ellison",
    "Amancio Ortega",
    "Jim Walton",
    "Alice Walton",
    "Rob Walton"
];

let dragStartIndex;
let dragEndIndex;

let listItems = [];



function dragStart() {
    dragStartIndex = this.closest('li').getAttribute('data-index');
}

function dragDrop() {
    dragEndIndex = this.getAttribute('data-index');
    this.classList.remove('over');

    const startEl = listItems[dragStartIndex].querySelector('.draggable');
    const endEl = listItems[dragEndIndex].querySelector('.draggable');

    listItems[dragStartIndex].appendChild(endEl);
    listItems[dragEndIndex].appendChild(startEl);

}

function dragEnter() {
    this.classList.add('over');
}

function dragLeave() {
    this.classList.remove('over');
}

function dragOver(e) {
    e.preventDefault();
}

function addEventListeners() {
    const draggables = document.querySelectorAll('.draggable');

    const draggableListItems = document.querySelectorAll('.draggable-list li');

    draggables.forEach(item => item.addEventListener('dragstart',dragStart));

    draggableListItems.forEach(item => item.addEventListener('dragenter',dragEnter));
    draggableListItems.forEach(item => item.addEventListener('dragover',dragOver));
    draggableListItems.forEach(item => item.addEventListener('dragleave',dragLeave));
    draggableListItems.forEach(item => item.addEventListener('drop',dragDrop));
}

function createList() {
    [...richest].map(name=> ({value: name , num: Math.random()})).sort((a,b)=>a.num-b.num).forEach((obj,index) => {
        const li = document.createElement('li');
        li.setAttribute('data-index',index);
        li.innerHTML = `
            <span class="number">${index+1}</span>
            <div class="draggable" draggable=true>
                <p class="name">${obj.value}</p>
                <i class="fas fa-grip-lines"></i>
            </div>
        `;

        draggableList.appendChild(li);
        listItems.push(li);
    });

    addEventListeners();
}

function checkOrder() {
    listItems.forEach((item,index) => {
        const name = item.querySelector('.name').innerText.trim();

        console.log(name);

        if(name === richest[index]){
            item.classList.remove('wrong');
            item.classList.add('right');
        }
        else{
            item.classList.remove('right');
            item.classList.add('wrong');
        }
    });
}

createList();

check.addEventListener('click',checkOrder);