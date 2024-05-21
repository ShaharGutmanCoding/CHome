let counter = document.getElementById('counter');
let requestsContainer = document.getElementById("requestsContainer");

function appendRequest(call) {
  let requestDiv = document.createElement('div');
  requestDiv.classList = 'Request';
  requestDiv.textContent = call.description;
  requestsContainer.appendChild(requestDiv);
}

fetch("/callsPage/getCalls")
.then(response=> response.json())
.then(data=>{
  data.forEach(call=>{
    appendRequest(call)
  })
  
})