let counter = document.getElementById("counter");
let requestsContainer = document.getElementById("requestsContainer");

function createCall(object) {
  let div = document.createElement("div");
  div.classList.add("Request");

  // Create a span for the category
  let category = document.createElement("span");
  category.textContent = object.category;
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
  const maxLength = 100; // maximum length before truncating
  if (object.description.length > maxLength) {
    let truncatedText = object.description.substring(0, maxLength) + "...";
    description.textContent = truncatedText;

    let readMoreDiv = document.createElement("div");
    readMoreDiv.style.textAlign = "center";
    readMoreDiv.style.marginTop = "5px"; // margin to separate button from text

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

  // Create a span for the date
  let date = document.createElement("span");
  date.textContent = object.date;
  date.style.display = "block"; 
  date.style.fontSize = "10px"; 
  date.style.textAlign = "left"; 
  div.appendChild(date);

  requestsContainer.appendChild(div);
}

fetch('/callsPage/getCalls')
  .then(response => response.json())
  .then(data => {
    counter.innerHTML = "There are " + data.length + " requests";
    for (let i = 0; i < data.length; i++) {
      createCall(data[i]);
    }
  });
