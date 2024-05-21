let form = document.getElementById('registerForm');

form.addEventListener('submit', async(event) => {
    let userName = document.getElementById('userName').value;
    let password = document.getElementById('password').value;
    let id = document.getElementById('id').value;
    let phoneNum = document.getElementById('phoneNumber').value;
    let email = document.getElementById('email').value;
    event.preventDefault();
    await fetch('/loginSystem/register/createUser', {
        method:'Post',
        Credential:'include',
        headers:{'Content-Type': 'application/x-www-form-urlencoded'},
        body:`userName=${userName}&password=${password}&id=${id}&phoneNum=${phoneNum}&email=${email}`
    })
    .then(()=> window.location.href = '/loginSystem/login')
});
