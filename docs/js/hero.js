
const query = new URLSearchParams(window.location.search);
const heroId = query.get('id');

const getHeroById = async () => {
    const credentials = authentication();
    const resp = await fetch(`${baseURL}/characters/${heroId}?${credentials}`);
    const { data } = await resp.json();

    const container = document.getElementById('container__hero');
    data.results.forEach( ({name, description, thumbnail, comics, urls}) => {
        const desc = description === "" ? "No description available :(" : description;
        
        const heroImage = document.getElementById('heroImage');
        heroImage.innerHTML = `
            <img src="${thumbnail.path}.${thumbnail.extension}" />
        `;
        const heroData = document.getElementById('heroData');
        heroData.innerHTML = `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Description: </strong>${desc}</p>
        <p><strong>Comics in which it appears:</strong></p>
        `;
        const {items } = comics;
        if (items.length >= 1) {
            const listComics = document.createElement('ul');
            for (let index = 0; index < 5 ; index++) {
                if(items[index]){
                    const listComicsItem = document.createElement('li');
                    listComicsItem.innerHTML = "-"+items[index].name;
                    listComics.appendChild(listComicsItem);
                }
            }
            heroData.appendChild(listComics);
        }else{
            const listComicsError = document.createElement('p');
            listComicsError.innerHTML = 'No comics available';
            heroData.appendChild(listComicsError);
        }
    
        const btnBio = document.createElement('div');
        const urlBio = urls.find( element => element.type === 'wiki')
        if(urlBio){
            // wiki url
            btnBio.innerHTML = `<a href=${urlBio.url}>See more</a>`;
        }else{
            // details url
            btnBio.innerHTML = `<a href=${urls[0].url}>See more</a>`;
        }
        btnBio.className = 'btn';
        heroData.appendChild(btnBio);


        for (let index = 0; index < heroData.children.length; index++) {
            heroData.children.item(index).style.margin = '20px';
        }
        container.appendChild(heroData);
    });

}

getHeroById();

// Catch the event of submit of the input of search
document.getElementById('searcher').addEventListener('submit', (e) => {
    e.preventDefault()
    const hero = e.target.children[0].value
    if( hero != ""){
        window.location = `http://localhost:5500/index.html?name=${hero}`;
    }
    return
    
});