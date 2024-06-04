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
let login = document.getElementById('login');
let register = document.getElementById('register');
console.log(getCookie('isLogged'));
if (getCookie('isLogged')) {
    login.textContent = 'my Profile';
    login.setAttribute('href', '/profilePage');
} else {
    login.textContent = 'login';
    login.setAttribute('href', '/loginSystem/login');
    register.textContent = 'register';
    register.setAttribute('href', '/loginSystem/register');
}