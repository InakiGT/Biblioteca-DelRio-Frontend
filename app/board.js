import { showError, getQueryParams } from './helpers.js';
import { petitionGet, petitionDelete } from './petitions.js';

let type = getQueryParams(window.location.href).type || "users";
const board = document.getElementById('board');
const boardTitle = document.getElementById('board-title');
const boardTitleContent = document.createTextNode(type);
const createButton = document.getElementById('create-button');
createButton.href = `./create-${type}.html`;
boardTitle.appendChild(boardTitleContent);



const deleteElement = async id => {
    type = (type === "libros" || type === "videos" || type === "revistas" || type === "tesis" || type === "biografias") ? "material" : type;
    const result = await petitionDelete( type, parseInt(id) );
    console.log(result)
    // window.location.reload();
}

const createCard = data => {

    const title = data.username || data.title;
    const frontPage = data.frontPage || data.imageUrl || "https://cdn-icons-png.flaticon.com/512/149/149071.png";

    const boardContent = document.getElementById('board-content');
    const boardCard = document.createElement('div');
    boardCard.className = "board-card";

    const content = document.createElement('div');

    const titleElement = document.createElement('p');
    const titleContent = document.createTextNode(title);
    titleElement.appendChild(titleContent);

    const imgElement = document.createElement('img');
    imgElement.src = frontPage;
    
    content.appendChild(imgElement);
    content.appendChild(titleElement);

    const buttons = document.createElement('div');
    const editButton = document.createElement('a');
    const editContent = document.createTextNode('Editar');
    editButton.append(editContent);
    editButton.classList = "main-button table-button yellow-button";
    editButton.value = "Editar";
    editButton.href = `../src/create-${type}.html?id=${data.id}`;
    buttons.className = "options-buttons";

    const deleteButton = document.createElement('button');
    deleteButton.classList = "main-button table-button red-button";
    const deleteContent = document.createTextNode('Eliminar');
    deleteButton.appendChild(deleteContent);
    deleteButton.onclick = () => deleteElement(data.id);
  

    buttons.appendChild(editButton);
    buttons.appendChild(deleteButton);


    boardCard.appendChild(content);
    boardCard.appendChild(buttons);
    boardContent.appendChild(boardCard);

}

const createRegisterCard = data => {

    const boardContent = document.getElementById('board-content');
    const card = document.createElement("div");
    card.className = "board-card";

    const content = document.createElement("div");

    const imgElement = document.createElement('img');
    imgElement.src = data.material.frontPage;

    const title = document.createElement("p");
    const titleTextNode = document.createTextNode(data.material.title);
    title.appendChild(titleTextNode);

    content.appendChild(imgElement);
    content.appendChild(title);

    const consultas = document.createElement("p");
    const consultasTextNode = document.createTextNode(`Consultas: ${data.count}`);
    consultas.appendChild(consultasTextNode);

    card.appendChild(content);
    card.appendChild(consultas);
    boardContent.appendChild(card);

}

const checkRole = async () => {
    const id = await localStorage.getItem('userId');
    if(!id) {
        document.getElementById('board-top').innerHTML = "";
        await showError( board, "No puedes hacer esto" );
        return;
    }

    getData();
}

const getData = async () => {
    const result = await petitionGet(type);

    result.data.forEach(element => {
        if( type !== 'registros' ) {
            createCard(element);
        } else {
            createRegisterCard(element);
        }
    });
}

checkRole();
