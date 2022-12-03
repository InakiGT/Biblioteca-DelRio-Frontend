import { petitionPost } from './petitions.js';
const loginForm = document.getElementById('login-form');

if(await localStorage.getItem('token')) {
    window.location.href = "./edit-user.html";
}

loginForm.addEventListener('submit', async e => {
    
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if( !email.trim()|| !password.trim() ) {
        console.log("Cannot do that");
        return;
    }

    const data = {
        email,
        password,
    }


    const result = await petitionPost( "/auth/login", data ) || false;

    if( !result || !result.data.token ) {
        console.log("Datos invalidos");
        return;
    }
    
    await localStorage.setItem('token', result.data.token);
    await localStorage.setItem('userId', result.data.user.id);
    window.location.href = "/";
    
});