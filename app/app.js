
import { petitionGet } from './petitions.js';
import { config } from './config.js';

const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');


searchButton.addEventListener('click', () => {
    const value = searchInput.value;
    if(!value) {
        return;
    }

    window.location.replace(`${config.url}/src/search.html?name=${value}`);
});

const createRecomendationCard = data => {
    const section = document.getElementById('recomendatios');

    const linkContainer = document.createElement('a');
    linkContainer.href = `${config.url}/src/element.html?id=${data.id}`;
    linkContainer.className = "item-card"

    const img = document.createElement('img');
    img.src = data.frontPage;

    linkContainer.appendChild(img);

    section.appendChild(linkContainer);
}

const getGaceta = async () => {
    const gaceta = document.getElementById('gaceta');
    const result = await petitionGet('gaceta');
    const url = result.data[0].imageUrl;
    const alt = result.data[0].title;

    gaceta.src = url;
    gaceta.alt = alt;
}

const getRecomendations = async () => {
    const result = await petitionGet('libros');

    result.data.forEach(element => {
        createRecomendationCard(element);
    });
}

getGaceta();
getRecomendations();