let form = document.getElementById('passwordForm');
let codeForm = document.getElementById('codeForm');
let failTry = document.getElementById('failMessage'); 
let email = document.getElementById('email');
let modalFailMessage = document.getElementById('modalFailMessage');

form.addEventListener('submit', async(event) => {
    let email = document.getElementById('email').value;
    event.preventDefault();
    await fetch('/loginSystem/forgetPassword/sendEmail', {
        method:'Post',
        Credential:'include',
        headers:{'Content-Type': 'application/x-www-form-urlencoded'},
        body:`email=${email}`
    })
    .then(response => response.text())
    .then((response) => {
        if (response === 'email sent successfully'){
            var myModal = new bootstrap.Modal(document.getElementById('staticBackdrop'), {  keyboard: false });
            myModal.show();
        }else{
            failTry.textContent = response;
        }
    })
})

codeForm.addEventListener('submit', async(event) => {
    let code = document.getElementById('codeInput').value;
    event.preventDefault();

    await fetch('/loginSystem/forgetPassword/checkCode',{
        method:'Post',
        Credential:'include',
        headers:{'Content-Type': 'application/x-www-form-urlencoded'},
        body:`code=${code}`,
    }).then(response => response.json())
    .then((response) => {
        if(response.message == 'code is valid'){
            window.location.href = '/loginSystem/changePassword';
        }else{
            modalFailMessage.textContent = response.message;
        }
    })
})

