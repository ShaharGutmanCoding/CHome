let form = document.getElementById('loginForm');

form.addEventListener('submit', async(event) => {
    let userName = document.getElementById('userName');
    let password = document.getElementById('password');
    event.preventDefault();
    await fetch('/loginSystem/login/checkIfExist', {
        method:'Post',
        Credential:'include',
        headers:{'Content-Type': 'application/x-www-form-urlencoded'},
        body:`userName=${userName},password=${password}`
    })
    .then(response=>response.json())
})