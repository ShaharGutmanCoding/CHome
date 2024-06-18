let profileTab = document.getElementById('nav-profile-tab');
let requestTab = document.getElementById('nav-request-tab');
let callsTab = document.getElementById('nav-calls-tab');

let requestsContainer = document.getElementById("requestContainer");
let callsContainer = document.getElementById("callsContainer");

let firstName = document.getElementById('firstName');
let lastName = document.getElementById('lastName');
let email = document.getElementById('email');
let phoneNum = document.getElementById('phoneNum');
let id = document.getElementById('id');
let city = document.getElementById('city');
let region = document.getElementById('region');
let requestLoading = document.getElementById('requestLoading');
let callsLoading = document.getElementById('callsLoading');
let save = document.getElementById('saveButton');
let requestErrorMessage = document.getElementById('requestErrorMessage');
let callsErrorMessage = document.getElementById('callsErrorMessage');
let confirmButton = document.getElementById('buttonTrue');
let confirmButton2 = document.getElementById('buttonTrue2');
let myModal = document.getElementById('UniqueModalId');

let user,request,calls;

getUserDetails();
async function getUserDetails(){
    requestLoading.style.display = 'block';
    callsLoading.style.display = 'block';
    requestsContainer.innerHTML = '';
    callsContainer.innerHTML = '';

    user = await fetch('/profilePage/profileDetails',{
        method: 'Get',
        Credential:'include',
        headers:{'Content-Type': 'application/x-www-form-urlencoded'},
    }).then(response => response.json())

    request = await fetch('/profilePage/request',{
        method: 'Get',
        Credential:'include',
        headers:{'Content-Type': 'application/x-www-form-urlencoded'},
    }).then(response => response.json())

    calls = await fetch('/profilePage/calls',{
        method: 'Get',
        Credential:'include',
        headers:{'Content-Type': 'application/x-www-form-urlencoded'},
    }).then(response => response.json())
    
    console.log(request);
    firstName.value = user.firstName;
    lastName.value = user.lastName;
    email.value = user.email;
    phoneNum.value = user.phoneNum;
    id.value = user.id;
    city.value = user.city;
    region.value = user.region;

    if (request.length > 0) {
        console.log('printing requests')
        requestsContainer.innerHTML = '';
        request.forEach(element => {
            // create delete button
            let deleteButtonDiv = document.createElement('div');
            deleteButtonDiv.style.justifyContent = "end";
            deleteButtonDiv.setAttribute('class',' col-1');
            let deleteButton = document.createElement('button');
            deleteButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/><path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/></svg>`
            deleteButton.setAttribute('class','btn btn-outline-danger');
            deleteButton.setAttribute('id',element._id);
            deleteButtonDiv.appendChild(deleteButton);
            deleteButton.setAttribute('data-bs-toggle', "modal")
            deleteButton.setAttribute('data-bs-target',"#UniqueModalId")
            deleteButton.onclick = function () {
                deleteRequest(element._id)
            }

            let div = document.createElement("div");
            div.style.textAlign = "center";
            div.style.justifyContent = "center";
            div.setAttribute('class','col-11');

            // Create a span for the prescription
            let prescription = document.createElement("span");
            prescription.textContent = element.category;
            prescription.style.display = "block"; 
            prescription.style.textAlign = "center";
            prescription.style.textDecoration = "underline"; 
            prescription.style.fontWeight = "bold";
            div.appendChild(prescription);
    
            // Create a span for the description
            let description = document.createElement("span");
            description.textContent = element.description;
            description.classList.add("description");
            description.style.textAlign = "center";
    
            // Check if the description is too long
            if (description.textContent.length > 100) {
                let shortText = description.textContent.substring(0, 100);
                let fullText = description.textContent;
    
                description.textContent = shortText + "...";
                
                let readMoreButton = document.createElement("span");
                readMoreButton.textContent = "המשך קריאה";
                readMoreButton.classList.add("show-more");
                
                readMoreButton.onclick = function() {
                description.textContent = fullText;
                readMoreButton.style.display = "none";
                };
    
                div.appendChild(description);
                div.appendChild(readMoreButton);
            } else {
                div.appendChild(description);
            }
    
            // Create a span for the date
            let date = document.createElement("span");
            date.textContent = element.date;
            date.style.display = "block"; 
            date.style.fontSize = "10px"; 
            date.style.textAlign = "center"; 
            div.appendChild(date);
    
            requestsContainer.appendChild(div);
            requestsContainer.appendChild(deleteButtonDiv);
            requestLoading.style.display = 'none';
    
        });
    }else{
        console.log('request not found');
        requestLoading.style.display = 'none';
        requestErrorMessage.style.display = 'block';
    }

    if (calls.length > 0) {
        console.log('printing calls')
        callsContainer.innerHTML = '';
        calls.forEach(element => {
            // create delete button
            let deleteButtonDiv = document.createElement('div');
            deleteButtonDiv.style.justifyContent = "end";
            deleteButtonDiv.setAttribute('class',' col-1');
            let deleteButton = document.createElement('button');
            deleteButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/><path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/></svg>`
            deleteButton.setAttribute('class','btn btn-outline-danger');
            deleteButton.setAttribute('id',element._id);
            deleteButtonDiv.appendChild(deleteButton);
            deleteButton.setAttribute('data-bs-toggle', "modal")
            deleteButton.setAttribute('data-bs-target',"#UniqueModalId2") 
            deleteButton.onclick = function () {
                deleteCall(element._id)
            }

            let div = document.createElement("div");
            div.style.textAlign = "center";
            div.style.justifyContent = "center";
            div.setAttribute('class','col-11');

            // Create a span for the prescription
            let prescription = document.createElement("span");
            prescription.textContent = element.category;
            prescription.style.display = "block"; 
            prescription.style.textAlign = "center";
            prescription.style.textDecoration = "underline"; 
            prescription.style.fontWeight = "bold";
            div.appendChild(prescription);
    
            // Create a span for the description
            let description = document.createElement("span");
            description.textContent = element.description;
            description.classList.add("description");
            description.style.textAlign = "center";
    
            // Check if the description is too long
            if (description.textContent.length > 100) {
                let shortText = description.textContent.substring(0, 100);
                let fullText = description.textContent;
    
                description.textContent = shortText + "...";
                
                let readMoreButton = document.createElement("span");
                readMoreButton.textContent = "המשך קריאה";
                readMoreButton.classList.add("show-more");
                
                readMoreButton.onclick = function() {
                description.textContent = fullText;
                readMoreButton.style.display = "none";
                };
    
                div.appendChild(description);
                div.appendChild(readMoreButton);
            } else {
                div.appendChild(description);
            }
    
            // Create a span for the date
            let date = document.createElement("span");
            date.textContent = element.date;
            date.style.display = "block"; 
            date.style.fontSize = "10px"; 
            date.style.textAlign = "center"; 
            div.appendChild(date);
    
            callsContainer.appendChild(div);
            callsContainer.appendChild(deleteButtonDiv);
            callsLoading.style.display = 'none';
    
        });
    }else{
        console.log('calls not found');
        callsLoading.style.display = 'none';
        callsErrorMessage.style.display = 'block';
    }

}

save.addEventListener('click', async(event) => {
    let firstName = document.getElementById('firstName').value;
    let lastName = document.getElementById('lastName').value;
    let id = document.getElementById('id').value;
    let region = document.getElementById('region').value;
    let city = document.getElementById('city').value;
    let phoneNum = document.getElementById('phoneNum').value;
    let email = document.getElementById('email').value;

    console.log(firstName, lastName, id, region, city, phoneNum, email);
    event.preventDefault();
    
    let changeUserDetails = await fetch('/profilePage/changeUserDetails', {
        method:'Post',
        Credential:'include',
        headers:{'Content-Type': 'application/x-www-form-urlencoded'},
        body:`firstName=${firstName}&lastName=${lastName}&region=${region}&city=${city}&id=${id}&phoneNum=${phoneNum}&email=${email}`
    })
    .then(response => console.log(response.text()))

    getUserDetails();
})

async function deleteRequest(givenId){
    confirmButton.addEventListener('click', async()=>{
        await fetch('/profilePage/deleteRequest', {
         method: 'Post',
         Credentials:'include',
         headers:{'Content-Type': 'application/x-www-form-urlencoded'},
         body:`_id=${givenId}`,
        }).then(response => response.text())
        
        getUserDetails();
    });
}

async function deleteCall(givenId){
    confirmButton2.addEventListener('click', async()=>{
        await fetch('/profilePage/deleteCall', {
         method: 'Post',
         Credentials:'include',
         headers:{'Content-Type': 'application/x-www-form-urlencoded'},
         body:`_id=${givenId}`,
        }).then(response => response.text())
        
        getUserDetails();
    });
}


//קריאות
