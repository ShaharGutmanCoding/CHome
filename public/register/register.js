let form = document.getElementById('registerForm');

form.addEventListener('submit', async(event) => {
    let userName = document.getElementById('userName');
    let password = document.getElementById('password');
    let id = document.getElementById('id');
    let phoneNumber = document.getElementById('phoneNumber');
    let email = document.getElementById('email');
    event.preventDefault();
    await fetch('/loginSystem/register/createUser', {
        method:'Post',
        Credential:'include',
        headers:{'Content-Type': 'application/x-www-form-urlencoded'},
        body:`userName=${userName},password=${password},id=${id},phoneNumber=${phoneNumber},email=${email}`
    })
    .then(response=>response.json())
    .then(()=> window.location.href = '/loginSystem/login')
});