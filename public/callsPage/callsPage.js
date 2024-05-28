var categorySelect = document.getElementById("select_page")
const form = document.getElementById('formSelect')

let categorysObject = [
  {categoryName:"👩🏻‍🍼בייביסיטר ",valueId:"Babysitting",},
  {categoryName:"🛻הסעות",valueId:"Drives",},
  {categoryName:"🛒קניות לבית",valueId:"Shopping",},
  {categoryName:" 🐈‍⬛טיול לחיות מחמד",valueId:"PetWalk",},
  {categoryName:"🍳 בישולים",valueId:"Cooking",},
  {categoryName:"⬅️אחר",valueId:"Other",},
]



for(let i = 0; i < categorysObject.length; i++){
  const option = document.createElement("option")
  option.text=categorysObject[i].categoryName
  option.id = (categorysObject[i].valueId)
  categorySelect.appendChild(option)
}




let counter = document.getElementById("counter")
let requestsContainer = document.getElementById("requestsContainer");

function createCall(object) {
  let div = document.createElement("div");
  div.classList.add("Request");

  // Create a span for the prescription
  let prescription = document.createElement("span");
  prescription.textContent = object.category;
  prescription.style.display = "block"; 
  prescription.style.textAlign = "center";
  prescription.style.textDecoration = "underline"; 
  prescription.style.fontWeight = "bold";
  div.appendChild(prescription);

  // Create a span for the description
  let description = document.createElement("span");
  description.textContent = object.description;
  div.appendChild(description);

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
.then(response=>response.json())
.then(data=>{
counter.innerHTML = "There are " + data.length + " requests";
for(let i=0; i<data.length; i++ )
createCall(data[i]);
})