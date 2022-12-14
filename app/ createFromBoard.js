import petitions from './petitions.js';
import { showError, getQueryParams } from './helpers.js';

const createForm = document.getElementById('create-form');
const endpoint = createForm.name;
const id = getQueryParams(window.location.href).id;
let petitionType = "petitionPost";

const getValues = async () => {
    return await petitions.petitionGet(endpoint === "users" || endpoint === "gaceta" ? endpoint : "material", id);
}

const setForm = values => {

    createForm.childNodes.forEach( item => {
        if(item.tagName === "DIV") {
            item.childNodes.forEach( input => {
                if(input.tagName === "INPUT" && input.id !== "password") {
                    input.value = values[input.name];
                }
            })
        }
    });

}

if(id) {
    petitionType = "petitionPatch";
    const result = await getValues();
    setForm(result.data);
}


const getData = () => {
    const formData = new FormData(createForm);
    
    const obj = {};

    for (const pair of formData.entries()) {
        if(pair[1] !== "") {
            obj[pair[0]] = pair[1];
        }
    }

    return obj;
}

const sendForm = async e => {
    e.preventDefault();

    const data = getData();

    const result = await petitions[petitionType]( (petitionType === "petitionPost" || endpoint === "users") ? endpoint : "material", id ? id : data, data );

    if(!result) {
        const node = document.getElementById("err");
        showError( node, "Algo salió mal" );

        setTimeout(() => {
            node.innerHTML = "";
        }, 5000);

        return;
    }

    window.location.href = `./board.html?type=${createForm.name}`;

}

createForm.addEventListener('submit', sendForm);