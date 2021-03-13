
const query = new URLSearchParams(window.location.search)
const heroName = query.get('name')
const setHeroCards = (heroes) => {
    const main =  document.getElementById('main');
    // clean the content of main
    main.innerHTML = '';
    if (heroes.length < 1) {
        // Message of error in case there are nor heros after searching
        if(!document.getElementById('hero__error')){
            
            const heroError = document.createElement('div');
            heroError.className = 'hero__error';
            heroError.id = 'hero__error';
            heroError.innerHTML = `
            <h3> Hero not found</h3>
            `;
            main.appendChild(heroError);
        }
    }else{

        if(heroName){
            main.innerHTML = `
                <p class="search__res">Results of the search: <strong>${heroName}</strong></p>
            `;
        }
        // create the cards container and fill it whit cards about the heroes
        const cardsContainer = document.createElement('div');
        cardsContainer.className = 'cards__container';
        heroes.forEach(hero => {
            const card = document.createElement('div');
            card.className = 'card animate__animated animate__fadeInUp';
            const html = ` 
                    <a href="/hero.html?id=${hero.id}">
                     <div class="card__image">
                     <img  src="${hero.thumbnail.path}.${hero.thumbnail.extension}"
                     </div>
                     <div class="card__body">
                        <h3 class="card__title">${hero.name}</h3>
                     </div>
                     </a>
                 `;
            card.innerHTML = html;
            cardsContainer.appendChild(card);
        });

        main.appendChild(cardsContainer);
    }


}
const getSuperHeroes = async () => {

    const credentials = authentication();
    document.getElementById('main').innerHTML = `
    <h3> Please wait...</h3>
    `;
    try {
        let resp;
        if(heroName){
            // get character base on a name if the param name contains something
            resp = await fetch(`${baseURL}/characters?name=${heroName}&${credentials}&limit=90`);
        }else{
            // get characters
            resp = await fetch(`${baseURL}/characters?${credentials}&limit=90&offset=100`);
        }
        
        let { data } = await resp.json();

        if(data.results < 1){
            // If after searching by a name I got no heroes, I search by the first letter of the search
            resp = await fetch(`${baseURL}/characters?nameStartsWith=${heroName.charAt(0)}&${credentials}&limit=90`);
            const respJson = await resp.json();
            data = respJson.data;
        }
        setHeroCards(data.results);
    } catch (error) {
        console.log(error);
    }

}

getSuperHeroes();

// Catch the event of submit of the input of search
document.getElementById('searcher').addEventListener('submit', (e) => {
    e.preventDefault();
    const hero = e.target.children[0].value;
    if( hero != ""){
        window.location = `?name=${hero}`;
    }
    return   
});

