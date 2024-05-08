let form = document.getElementById('loginForm');
let failTry = document.getElementById('failMessage');

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
    .then(data=>{
        if(data.check==true)
            window.location.href = data.redirect;
        else
        failTry.innerHTML = data.message;
    })
})