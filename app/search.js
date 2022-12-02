import { getQueryParams } from './halpers.js';
import { petitionGet } from './petitions.js';
import { config } from './config.js';

const nameSearched = getQueryParams(window.location.href).name;
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const resultsNumber = document.getElementById('results-number');
searchInput.value = nameSearched;

searchButton.addEventListener('click', () => {
    const value = searchInput.value;
    if(!value) {
        return;
    }

    window.location.replace(`${config.url}/src/search.html?name=${value}`);
});

const createBiographyCard = data => {

    const section = document.getElementById('recomendations');

    const cardNode = document.createElement('div');
    cardNode.className = "recomendation-card";

    const contentNode = document.createElement('div');

    const resultTitle = document.createElement('p');
    const resultTitleContent = document.createTextNode(data.title);
    resultTitle.className = "subtitle";
    resultTitle.appendChild(resultTitleContent);
    

    const resultContent = document.createElement('p');
    const resultContentContent = document.createTextNode(data.description);
    resultContent.className = "card-text";
    resultContent.appendChild(resultContentContent);

    const link = document.createElement('a');
    const linkContent = document.createTextNode('Ver más');
    link.appendChild(linkContent);
    link.className = "simple-button";
    link.href = `${config.url}/src/element.html?id=${data.id}`;

    contentNode.appendChild(resultTitle);
    contentNode.appendChild(resultContent);
    contentNode.appendChild(link);

    const img = document.createElement('img');
    img.src = data.front_page;

    cardNode.appendChild(contentNode);
    cardNode.appendChild(img);

    section.appendChild(cardNode);

}

const createResultCard = data => {

    const section = document.getElementById('results');

    const cardNode = document.createElement('div');
    cardNode.className = "result";

    const cardTitleNode = document.createElement('div');
    cardTitleNode.className = "result-title";

    const resultType = document.createElement('p');
    const resultTypeContent = document.createTextNode(data.materialType);
    resultType.className = "result-type";
    resultType.appendChild(resultTypeContent);

    const resultTitle = document.createElement('p');
    const resultTitleContent = document.createTextNode(data.title);
    resultTitle.className = "result-name";
    resultTitle.appendChild(resultTitleContent);
    cardTitleNode.appendChild(resultType);
    cardTitleNode.appendChild(resultTitle);

    const description = document.createElement('p');
    const descriptionContent = document.createTextNode(data.description);
    description.className = "result-text";
    description.appendChild(descriptionContent);

    const link = document.createElement('a');
    const linkContent = document.createTextNode('Descubrir');
    link.className = "simple-button";
    link.href = `${config.url}/src/element.html?id=${data.id}`;
    link.appendChild(linkContent);

    cardNode.appendChild(cardTitleNode);
    cardNode.appendChild(description);
    cardNode.appendChild(link);
    section.appendChild(cardNode);

}

const busqueda = async () => {
    const result = await petitionGet(`/material?name=${nameSearched}`);

    const resultNumberNode = document.createTextNode(result.data.length);
    resultsNumber.appendChild(resultNumberNode);

    result.data.forEach(element => {
        if( element.materialType === 'biografia' ) {
            createBiographyCard(element);
        } else {
            console.log(element)
            createResultCard(element);
        }
    });
}

busqueda();