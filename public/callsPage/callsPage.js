let counter = document.getElementById('counter');
let requestsContainer = document.getElementById("requestsContainer");

function appendRequest(text) {
  let requestDiv = document.createElement('div');
  requestDiv.classList = 'Request';
  requestDiv.textContent = text;
  requestsContainer.appendChild(requestDiv);
}

appendRequest("hi");