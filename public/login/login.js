let form = document.getElementById('loginForm');
let failTry = document.getElementById('failMessage');

function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
      const [cookieName, cookieValue] = cookie.trim().split('=');
      if (cookieName === name) {
        return cookieValue;
      }
    }
    return null; 
  }
  

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
        if(data.flag){
            window.location.href = data.router;
console.log(getCookie('firstName'));
        }
        else
        failTry.textContent = data.error;
    })
})