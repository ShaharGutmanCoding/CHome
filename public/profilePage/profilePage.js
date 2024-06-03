let profileTab = document.getElementById('nav-profile-tab');
let requestTab = document.getElementById('nav-request-tab');
let callsTab = document.getElementById('nav-calls-tab');

let requestsContainer = document.getElementById("nav-request");

let firstName = document.getElementById('firstName');
let lastName = document.getElementById('lastName');
let email = document.getElementById('email');
let phoneNum = document.getElementById('phoneNum');
let id = document.getElementById('id');
let city = document.getElementById('city');
let region = document.getElementById('region');

let user,request;

getUserDetails();
async function getUserDetails(){
    user = await fetch('/profilePage/profileDetails',{
        method: 'Get',
        Credential:'include',
        headers:{'Content-Type': 'application/x-www-form-urlencoded'},
    }).then(response => response.json())

    console.log(user)

    request = await fetch('/profilePage/request',{
        method: 'Get',
        Credential:'include',
        headers:{'Content-Type': 'application/x-www-form-urlencoded'},
    })

    .then(response => response.json())
    
    firstName.textContent = user.firstName;
    lastName.textContent = user.lastName;
    email.textContent = user.email;
    phoneNum.textContent = user.phoneNum;
    id.textContent = user.id;
    city.textContent = user.city;
    region.textContent = user.region;

    request.forEach(element => {
        let div = document.createElement("div");

        // Create a span for the prescription
        let prescription = document.createElement("span");
        // prescription.textContent = object.category;
        prescription.style.display = "block"; 
        prescription.style.textAlign = "center";
        prescription.style.textDecoration = "underline"; 
        prescription.style.fontWeight = "bold";
        div.appendChild(prescription);

        // Create a span for the description
        let description = document.createElement("span");
        // description.textContent = object.description;
        description.classList.add("description");

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
        // date.textContent = object.date;
        date.style.display = "block"; 
        date.style.fontSize = "10px"; 
        date.style.textAlign = "left"; 
        div.appendChild(date);

        requestsContainer.appendChild(div);

    });
}
