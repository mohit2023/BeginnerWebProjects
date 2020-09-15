const form = document.getElementById('form');
const search = document.getElementById('search');
const result = document.getElementById('result');
const nav = document.getElementById('nav');
const lyricsContainer = document.getElementById('lyrics-container');
const back = document.getElementById('back');


async function getLyrics(artist,title) {
    const response = await fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`);
    const data = await response.json();

    lyricsContainer.innerHTML = '';

    if(data.error){
        lyricsContainer.innerHTML = data.error;
        return ;
    }

    const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');

    lyricsContainer.innerHTML = `
        <h2><strong>${artist}</strong> - ${title}</h2>
        <span>${lyrics}</span>
    `;

    lyricsContainer.classList.add('show');
    back.classList.add('show');
    nav.classList.add('hide');
    result.classList.add('hide');
    
}

async function fetchMoreSongs(url) {
    const response = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
    const data = await response.json();

    DisplaySongs(data);
}

function DisplaySongs(data) {

    const ul = document.createElement('ul');
    data.data.forEach(song => {
        const artist = song.artist.name.trim();
        const title = song.title.trim();
        const li = document.createElement('li');
        li.innerHTML = `
            <p><strong>${artist}</strong> - ${title}</p>
            <button onclick="getLyrics('${artist}','${title}')">GET LYRICS</button>
        `;

        ul.appendChild(li);
    });

    result.innerHTML = '';
    result.appendChild(ul);


    nav.innerHTML = '';
    if(data.prev) {
        nav.innerHTML += `<button onclick="fetchMoreSongs('${data.prev}')">Prev</button>`;
    }
    if(data.next) {
        nav.innerHTML += `<button onclick="fetchMoreSongs('${data.next}')">Next</button>`;
    }
}

async function fetchSongs(value) {
    const response = await fetch(`https://api.lyrics.ovh/suggest/${value}`);

    const data = await response.json();
    
    DisplaySongs(data);
}



form.addEventListener('submit',(evt)=>{
    evt.preventDefault();
    const value = search.value.trim();
    if(!value){
        alert('Type something to search');
        return ;
    }
    fetchSongs(value);
});

back.addEventListener('click', ()=>{
    lyricsContainer.classList.remove('show');
    back.classList.remove('show');
    nav.classList.remove('hide');
    result.classList.remove('hide');
});