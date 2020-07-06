const postsContainer = document.querySelector('.posts-container');
const loader = document.querySelector('.loader');
const filter = document.getElementById('filter');

let limit = 5;
let page = 1;

let loading = false;
let filterOn = false;

async function getPosts(){
    const response = await fetch(`http://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`);
    const data = await response.json();
    return data;
}

async function showPosts(){
    const posts = await getPosts();

    posts.forEach(item => {
        const post = document.createElement('div');
        post.classList.add('post');
        post.innerHTML = `
        <div class="number">${item.id}</div>
        <div class="post-info">
            <h2 class="post-title">${item.title}</h2>
            <p class="post-body">${item.body}</p>
        </div>
        `;

        postsContainer.appendChild(post);
    });

}

function filterPosts(evt) {
    const posts = postsContainer.querySelectorAll('.post');
    const value = evt.target.value.toUpperCase();
    if(!(value.trim().length > 0)){
        filterOn = false;
        return ;
    }
    filterOn = true;
    posts.forEach(post => {
        const title = post.querySelector('.post-title').innerText.toUpperCase();
        const body = post.querySelector('.post-body').innerText.toUpperCase();

        if(title.indexOf(value) > -1 || body.indexOf(value) > -1){
            post.style.display = 'flex';
        }
        else{
            post.style.display = 'none';
        }
    });
}

showPosts();
window.addEventListener('scroll',evt => {

    if(loading || filterOn) {
        return ;
    }
    loading=true;

    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;

    if(scrollTop + clientHeight >= scrollHeight - 2){
        loader.classList.add('show');

        setTimeout(()=>{
            page++;
            showPosts();
        },1000);

        setTimeout(()=>{
            loader.classList.remove('show');
        },3000);
    }
    loading = false;
});

filter.addEventListener('input',filterPosts);