import { petitionPost } from './petitions.js';
import { showError } from './helpers.js';

const loginForm = document.getElementById('login-form');

if(await localStorage.getItem('token')) {
    window.location.href = "./edit-users.html";
}

const errors = () => {
    const node = document.getElementById('error');
    node.style = "display: block";
    showError( node, "Algo salió mal" );
    
    setTimeout(() => {
        node.style = "display: none";
        node.innerHTML = "";
    }, 5000);
}

loginForm.addEventListener('submit', async e => {
    
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if( !email.trim()|| !password.trim() ) {
        errors();
        return;
    }

    const data = {
        email,
        password,
    }


    const result = await petitionPost( "/auth/login", data ) || false;

    if( !result || !result.data.token ) {
        errors();
        return;
    }
    
    await localStorage.setItem('token', result.data.token);
    await localStorage.setItem('userId', result.data.user.id);
    window.location.href = "/";
    
});