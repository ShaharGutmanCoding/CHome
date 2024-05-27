let counter = document.getElementById("counter");
let requestsContainer = document.getElementById("requestsContainer");

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

function createCall(object) {
  let div = document.createElement("div");
  div.classList.add("Request");

  // Create a span for the category
  let category = document.createElement("span");
  category.textContent = object.category+"  :"+object.name;
  category.style.display = "block"; 
  category.style.textAlign = "center";
  category.style.textDecoration = "underline"; 
  category.style.fontWeight = "bold";
  div.appendChild(category);

  // Create a span for the description
  let description = document.createElement("span");
  description.textContent = object.description;
  description.classList.add("description");
  div.appendChild(description);

  // Check if the description is too long
  const maxLength = 146; 
  if (object.description.length > maxLength) {
    let truncatedText = object.description.substring(0, maxLength);
    description.textContent = truncatedText;

    let readMoreDiv = document.createElement("div");
    readMoreDiv.style.textAlign = "center";
    readMoreDiv.style.marginTop = "0px"; 

    let readMoreBtn = document.createElement("button");
    readMoreBtn.textContent = "המשך קריאה";
    readMoreBtn.classList.add("btn", "btn-link", "read-more");
    readMoreBtn.onclick = function() {
      if (description.textContent === truncatedText) {
        description.textContent = object.description;
        readMoreBtn.textContent = "קרא פחות";
      } else {
        description.textContent = truncatedText;
        readMoreBtn.textContent = "המשך קריאה";
      }
    };

    readMoreDiv.appendChild(readMoreBtn);
    div.appendChild(readMoreDiv);
  }

  // Create a div for the Answer Request button
  let answerRequestDiv = document.createElement("div");
  answerRequestDiv.style.textAlign = "center";
  answerRequestDiv.style.marginTop = "10px"; 

  let answerRequestBtn = document.createElement("button");
  answerRequestBtn.textContent = "Answer Request";
  answerRequestBtn.classList.add("btn", "btn-primary", "btn-sm");
  answerRequestBtn.onclick = function() {
    answerRequest(object);
  };

  answerRequestDiv.appendChild(answerRequestBtn);
  div.appendChild(answerRequestDiv);

  // Create a span for the date
  let date = document.createElement("span");
  date.textContent = object.date;
  date.style.display = "block"; 
  date.style.fontSize = "10px"; 
  date.style.textAlign = "center"; 
  div.appendChild(date);

  requestsContainer.appendChild(div);
}

function answerRequest(request) {

}

fetch('/callsPage/getCalls')
  .then(response => response.json())
  .then(data => {
    counter.innerHTML = "There are " + data.length + " requests";
    for (let i = 0; i < data.length; i++) {
      createCall(data[i]);
    }
  });
