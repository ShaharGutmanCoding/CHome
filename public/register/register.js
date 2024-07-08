let form = document.getElementById('registerForm');
let failTry = document.getElementById('failMessage');
let loadingSpinners = document.getElementById('loadingSpinners');

form.addEventListener('submit', async(event) => {
    let firstName = document.getElementById('firstName').value;
    let lastName = document.getElementById('lastName').value;
    let password = document.getElementById('password').value;
    let confirmPassword = document.getElementById('confirmPassword').value;
    let id = document.getElementById('id').value;
    let region = document.getElementById('region').value;
    let city = document.getElementById('city').value;
    let phoneNum = document.getElementById('phoneNumber').value;
    let email = document.getElementById('email').value;
    
    loadingSpinners.style.display = 'block';
    event.preventDefault();
    
    if (password == confirmPassword) {
        await fetch('/loginSystem/register/createUser', {
            method:'Post',
            Credential:'include',
            headers:{'Content-Type': 'application/x-www-form-urlencoded'},
            body:`firstName=${firstName}&lastName=${lastName}&password=${password}&region=${region}&city=${city}&id=${id}&phoneNum=${phoneNum}&email=${email}`
        })
        .then(response => response.text())
        .then((response) => {
            loadingSpinners.style.display = 'none';
            if (response == 'user created successfully') {
                window.location.href = '/loginSystem/login'
            } else {
                failTry.textContent = response;
            }
        })
    }
});

