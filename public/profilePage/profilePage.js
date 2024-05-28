let profileTab = document.getElementById('nav-profile-tab');
let requestTab = document.getElementById('nav-request-tab');
let callsTab = document.getElementById('nav-calls-tab');

profileTab.addEventListener('click', async() => {
    await fetch('/profilePage/profileDetails',{
        method: 'Get',
        Credential:'include',
        headers:{'Content-Type': 'application/x-www-form-urlencoded'},
    })
})

let div = document.createElement("div");
