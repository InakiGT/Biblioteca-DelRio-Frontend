import { getQueryParams, checkAuth } from './halpers.js';
import { petitionGet } from './petitions.js';

const materialSearched = getQueryParams(window.location.href).id;

const createTop = data => {

    const img = document.getElementById('img');
    img.src = data.frontPage;

    const title = document.getElementById('title');
    const titleContent = document.createTextNode(data.title);
    title.append(titleContent);

    const tags = document.getElementById('tags');
    const tagsContent = document.createTextNode(`${data.autor}. Editorial: ${data.editorial}. Language: ${data.language}`);
    tags.appendChild(tagsContent);

}

const createContent = data => {

    const description = document.getElementById('description');
    const descriptionContent = document.createTextNode(data.description);
    description.append(descriptionContent);

    const format = document.getElementById('format');
    const formatContent = document.createTextNode(data.format);
    format.appendChild(formatContent);

    const hero = document.getElementById('hero');
    hero.style = `background-image: url(${data.backgroundImg})`;

    const button = document.getElementById('button');
    button.href = "1";

}

const getMaterial = async () => {

    const result = await petitionGet(`material/${materialSearched}`);
    
    if( !checkAuth(result.data) ) {
        return null;
    }

    createTop(result.data);
    createContent(result.data);
    console.log(result)

}

getMaterial();