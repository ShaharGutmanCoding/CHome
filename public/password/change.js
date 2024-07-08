let form = document.getElementById('passwordForm');
let failTry = document.getElementById('failMessage'); 
let newPassword = document.getElementById('newPassword');
let newPasswordVarification = document.getElementById('newPasswordVarification');

form.addEventListener('submit', async(event) => {
    let newPassword = document.getElementById('newPassword').value;
    let newPasswordVarification = document.getElementById('newPasswordVarification').value;
    event.preventDefault();
    if(newPassword !== newPasswordVarification){
        failTry.textContent = 'אימות סיסמה אינו זהה לסיסמה שנבחרה אנא נסה שנית'
    }else{
        await fetch('/loginSystem/changePassword/changePassword', {
            method:'Post',
            Credential:'include',
            headers:{'Content-Type': 'application/x-www-form-urlencoded'},
            body:`newPassword=${newPassword}`
        })
        .then(response => response.json())
        .then((response) => {
            if(response.flag){
                failTry.textContent = response.error;
            }else{
                window.location.href = '/loginSystem/login';
            }
        });
    }
});


