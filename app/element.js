import { getQueryParams, checkAuth } from './helpers.js';
import { petitionGet, petitionPost } from './petitions.js';

const materialSearched = getQueryParams(window.location.href).id;
const card = document.getElementById("card");
const button = document.getElementById("button");
const close = document.getElementById("close");
const prestamo = document.getElementById("prestamo");

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

}

const createCard = data => {

    const frontPage = document.getElementById("front");
    frontPage.src = data.frontPage;

    const title = document.getElementById("title2");
    const titleTextNode = document.createTextNode(data.title);
    title.appendChild(titleTextNode);

    const content = document.getElementById("content");
    const contentTextNode = document.createTextNode(`${data.autor} Editorial: ${data.editorial} Language: ${data.language}`);
    content.appendChild(contentTextNode);

    const download = document.getElementById("download");
    download.href = data.contentUrl;

}

const showCard = () => {
    card.style = "display: block";
}

const unshowCard = () => {
    card.style = "display: none";
}


const getMaterial = async () => {
    
    const result = await petitionGet(`material/${materialSearched}`);
    
    if( !checkAuth(result?.response?.data) ) {
        window.location.href = "./login.html";
        return;
    }

    if(result.data.materialType === "biografia") {
        button.style = "display: none";
    }
    createTop(result.data);
    createContent(result.data);
    createCard(result.data);
    
}

const createPrestamo = async () => {

    const data = {
        materialId: parseInt(materialSearched), 
    }
    const result = await petitionPost('/prestamos', data);
    const qr = document.getElementById("qr");
    qr.innerHTML = "";

    new QRCode(qr, result.data.code);

}

button.addEventListener('click', showCard);
close.addEventListener('click', unshowCard);
prestamo.addEventListener('click', createPrestamo);
getMaterial();