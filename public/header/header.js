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
let logout = document.getElementById('logout');
console.log(getCookie('isLogged'));
if (getCookie('isLogged')) {
    login.textContent = 'הפרופיל שלי';
    logout.textContent= 'התנתקות';
    login.setAttribute('href', '/profilePage');
    logout.setAttribute('href', '/loginSystem/login');
    register.textContent = "";
} else {
    login.textContent = 'התחברות';
    login.setAttribute('href', '/loginSystem/login');
    register.textContent = 'הרשמה';
    register.setAttribute('href', '/loginSystem/register');
}

function logOut(){
  document.cookie = "email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  document.cookie = "isLogged=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  document.cookie = "firstName=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}