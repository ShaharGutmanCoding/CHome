let form = document.getElementById('registerForm');

form.addEventListener('submit', async(event) => {
    let firstName = document.getElementById('firstName').value;
    let lastName = document.getElementById('lastName').value;
    let password = document.getElementById('password').value;
    let id = document.getElementById('id').value;
    let region = document.getElementById('region').value;
    let city = document.getElementById('city').value;
    let phoneNum = document.getElementById('phoneNumber').value;
    let email = document.getElementById('email').value;
    event.preventDefault();
    await fetch('/loginSystem/register/createUser', {
        method:'Post',
        Credential:'include',
        headers:{'Content-Type': 'application/x-www-form-urlencoded'},
        body:`firstName=${firstName}&lastName=${lastName}&password=${password}&region=${region}&city=${city}&id=${id}&phoneNum=${phoneNum}&email=${email}`
    })
    .then(()=> window.location.href = '/loginSystem/login')
});
