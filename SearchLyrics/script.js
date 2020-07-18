const form = document.getElementById('form');
const search = document.getElementById('search');
const result = document.getElementById('result');
const nav = document.getElementById('nav');


async function getLyrics(artist,title) {
    const response = await fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`);
    const data = await response.json();

    nav.innerHTML = '';

    if(data.error){
        result.innerHTML = data.error;
        return ;
    }

    const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');

    result.innerHTML = `
        <h2><strong>${artist}</strong> - ${title}</h2>
        <span>${lyrics}</span>
    `;

    
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