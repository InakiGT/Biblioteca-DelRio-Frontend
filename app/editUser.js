import { petitionGet, petitionPatch } from './petitions.js';

const form = document.getElementById('edit-user-form');
const username = document.getElementById('username'); 
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirm-password');
const userId = await localStorage.getItem('userId');
const logoutButton = document.getElementById('logout');

const getUserData = async () => {
    
    if(!userId) {
        window.location.href = '/';
    }

    const result = await petitionGet(`/users/${userId}`);

    username.value = result.data.username;

}

form.addEventListener('submit', async e => {
    e.preventDefault();

    let data;

    if( password.value !== confirmPassword.value ) {
        console.log("Las contraseñas deben de coincidir");
        return;
    }

    if( username.value.trim() === "" ) {
        console.log("El usuario no puede ir vacio");
        return;
    }

    if(password.value.trim()) {
        data = {
            username: username.value,
            password: password.value,
        }
    } else {
        data = {
            username: username.value,
        }
    }

    const result = await petitionPatch( '/users', userId, data ) || false;

    if(!result) {
        console.log('Invalid data');
        return;
    }

    window.location.href = '/';

});

logoutButton.addEventListener('click', async () => {
    await localStorage.removeItem('id');
    await localStorage.removeItem('token');

    window.location.href = "/";
});

getUserData();