let form = document.getElementById('loginForm');
let failTry = document.getElementById('failMessage');

form.addEventListener('submit', async(event) => {
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    event.preventDefault();
    await fetch('/loginSystem/login/checkIfExist', {
        method:'Post',
        Credential:'include',
        headers:{'Content-Type': 'application/x-www-form-urlencoded'},
        body:`email=${email}&password=${password}`
    })
    .then(response=>response.json())
    .then(data=>{
        if(data.flag)
            window.location.href = data.router;
        else
        failTry.textContent = data.error;
    })
})