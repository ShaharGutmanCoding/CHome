

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
let reset = document.getElementById('resetButton');
let requestErrorMessage = document.getElementById('requestErrorMessage');
let callsErrorMessage = document.getElementById('callsErrorMessage');
let confirmButton = document.getElementById('buttonTrue');
let confirmButton2 = document.getElementById('buttonTrue2');
let myModal = document.getElementById('UniqueModalId');

let user,request,calls;

//Call user details on page load
getUserDetails();


save.addEventListener('click', async(event) => {
    event.preventDefault();
    await fetch('/profilePage/changeUserDetails', {
        method:'Post',
        Credential:'include',
        headers:{'Content-Type': 'application/x-www-form-urlencoded'},
        body:`firstName=${firstName.value}&lastName=${lastName.value}&region=${region.value}&city=${city.value}&id=${id.value}&phoneNum=${phoneNum.value}&email=${email.value}`
    })
    .then(response => console.log(response.text()))
    await updateUserValues();
})

reset.addEventListener('click', async(event) => {
    event.preventDefault();
    await updateUserValues();
})

async function getUserDetails(){

    //Update user tab
    await updateUserValues();

    await updateRequestTab();

    await updateCallsTab();

}

async function updateRequestTab(){

    requestLoading.style.display = 'block';
    requestsContainer.innerHTML = '';
    request = await fetch('/profilePage/request',{
        method: 'Get',
        Credentials:'include',
        headers:{'Content-Type': 'application/x-www-form-urlencoded'},
    }).then(response => response.json())
    console.log(request);
    
    if (request.length > 0) {
        requestsContainer.innerHTML = '';
        request.forEach(element => {
            let div = createTicket(element,"#UniqueModalId1",requestsContainer,deleteRequest,"request")
            if (element.helpers.length>0) {
                console.log("in")
                let displayHelpersButton = document.createElement('button');
                displayHelpersButton.textContent = "הצג רשימת העוזרים";
                displayHelpersButton.classList.add("btn", "btn-success", "btn-sm", "mt-2");
                displayHelpersButton.onclick = () => { displayHelpers(element.helpers,element._id); };
                div.appendChild(displayHelpersButton);
            }
            else
            console.log("out");

            requestLoading.style.display = 'none';
        });

    }else{
        console.log('request not found');
        requestLoading.style.display = 'none';
        requestErrorMessage.style.display = 'block';
    }
}

async function updateCallsTab(){
    callsLoading.style.display = 'block';
    callsContainer.innerHTML = '';

    calls = await fetch('/profilePage/calls',{
        method: 'Get',
        credentials:'include',
        headers:{'Content-Type': 'application/x-www-form-urlencoded'},
    }).then(response => response.json())

    if (calls.length > 0) {

        callsContainer.innerHTML = '';
        calls.forEach(element => {
            createTicket(element,"#UniqueModalId2",callsContainer,deleteCall,"call");
            callsLoading.style.display = 'none';
    
        });
        }else{
            console.log('calls not found');
            callsLoading.style.display = 'none';
            callsErrorMessage.style.display = 'block';
        }
}


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

function displayHelpers(helpers,ticketId) {
    let modalContent = document.getElementById('modalContent');
    modalContent.innerHTML = ''; 

    if (helpers && helpers.length > 0) {
        helpers.forEach(async (helper) => {
            try {
                let tzadik = await fetch('/profilePage/getUser', {
                    method: 'Post',
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: `email=${helper}`
                }).then(response => response.json());

                console.log(tzadik);

                let helperDiv = document.createElement('div');
                helperDiv.classList.add('helper-entry', 'mt-2', 'p-2', 'border', 'rounded');

                let helperName = document.createElement('span');
                helperName.textContent = `שם: ${tzadik.firstName + " " + tzadik.lastName}`;
                helperName.classList.add('helper-name', 'd-block');

                let helperRegisterDate = document.createElement('span');
                helperRegisterDate.textContent = `הצטרף לצוות העוזרים בתאריך: ${tzadik.registerDate}`;
                helperRegisterDate.classList.add('helper-register-date', 'd-block');

                let helperNumOfHelps = document.createElement('span');
                helperNumOfHelps.textContent = `מספר עזרות: ${tzadik.numOfHelps}`;
                helperNumOfHelps.classList.add('helper-num-of-helps', 'd-block');

                let helperPhoneNumber = document.createElement('span');
                helperPhoneNumber.textContent = `טלפון נייד: ${tzadik.phoneNum}`;
                helperPhoneNumber.classList.add('helper-phone-number', 'd-block');

                let actionButton = document.createElement('button');
                actionButton.textContent = 'קיבלתי ממנו את העזרה'; 
                actionButton.classList.add('btn', 'btn-success', 'mt-2');
                actionButton.onclick = async() => {
modalContent.innerHTML = "תודה שנעזרת בצוות העוזרים הנהדר שלנו! שיהיה לך יום מקסים";
requestsContainer.innerHTML = "";


                    await fetch("/profilePage/deleteRequest",{
                        method: 'Post',
                        credentials: 'include',
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                        body: `_id=${ticketId}`
                    });

                    await getUserDetails();

                await fetch("/profilePage/updateNumOfHelps",{
                    method: 'Post',
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: `email=${helper}`
                });


              
                };

                helperDiv.appendChild(helperName);
                helperDiv.appendChild(helperRegisterDate);
                helperDiv.appendChild(helperNumOfHelps);
                helperDiv.appendChild(helperPhoneNumber);
                helperDiv.appendChild(actionButton);

                modalContent.appendChild(helperDiv);
            } catch (error) {
                console.error('Error fetching profile details:', error);
            }
        });
    } else {
        let noHelpers = document.createElement('div');
        noHelpers.textContent = 'No helpers available.';
        modalContent.appendChild(noHelpers);
    }

    let myModal = new bootstrap.Modal(document.getElementById('UniqueModalId'), {});
    myModal.show();
}

async function updateUserValues(){
    user = await fetch('/profilePage/profileDetails',{
        method: 'Get',
        Credentials:'include',
        headers:{'Content-Type': 'application/x-www-form-urlencoded'},
    }).then(response => response.json())
    console.log(user);
    firstName.value = user.firstName;
    lastName.value = user.lastName;
    email.value = user.email;
    phoneNum.value = user.phoneNum;
    id.value = user.id;
    city.value = user.city;
    region.value = user.region;
}

function createTicket(element,buttonId,container,callback,indication){
    let deleteButtonDiv = document.createElement('div');
    deleteButtonDiv.style.justifyContent = "end";
    deleteButtonDiv.setAttribute('class',' col-1');
    let deleteButton = document.createElement('button');
    deleteButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/><path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/></svg>`
    deleteButton.setAttribute('class','btn btn-outline-danger');
    deleteButton.setAttribute('id',element._id);
    deleteButtonDiv.appendChild(deleteButton);
    deleteButton.setAttribute('data-bs-toggle', "modal")
    deleteButton.setAttribute('data-bs-target',buttonId)
    deleteButton.onclick = function () {
        callback(element._id)
    }

    let div = document.createElement("div");
    div.style.textAlign = "center";
    div.style.justifyContent = "center";
    div.setAttribute('class','col-11');

    // Create a span for the prescription
    let prescription = document.createElement("span");
    if(indication==="request")
    prescription.textContent = element.category;
    else
    prescription.textContent = element.name + "  :" + element.category
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

    let status = document.createElement("span");
    if(indication==="request")
    status.textContent = `סטטוס: ${element.status}`;
    else
    status.textContent = `סטטוס: שולח הבקשה ייצור איתך קשר בהקדם`;
    status.style.display = "block";
    status.style.fontSize = "16px";
    status.style.textAlign = "center";
    status.style.color = "green"; 
    div.appendChild(status);
    div.style.marginBottom = "20px"
    container.appendChild(div);
    container.appendChild(deleteButtonDiv);
    return div;
}