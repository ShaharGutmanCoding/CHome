

document.getElementById(requestsContainer);


function createCall(object){
  let div = document.createElement("div");
  div.classList = "Request";
  div.textContent = object.description;
  requestsContainer.appendChild(div);
}

fetch('/callsPage/getCalls')
.then(response=>response.json())
.then(data=>{
for(let i=0; i<data.length; i++ )
createCall(data[i]);
})