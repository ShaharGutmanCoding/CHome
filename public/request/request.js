var categorySelect = document.getElementById("select_page");
const form = document.getElementById('formSelect');
const errorContainer = document.getElementById('errorContainer');

function fixEmailAdress(value) {
  return value.replace("%40", "@");
}

async function getUsernameByEmail() {
  const cookies = document.cookie.split(';');
  for (let cookie of cookies) {
    let [cookieName, cookieValue] = cookie.trim().split('=');
    if (cookieName === 'email') {
      cookieValue = fixEmailAdress(cookieValue);
      let response = await fetch("/requestPage/getUserName", {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `email=${cookieValue}`
      });
      let data = await response.json();
      return data.firstName;
    }
  }
  return null;
}

function getCurrentDateTime() {
  let now = new Date();
  let date = now.toLocaleDateString();
  let time = now.toLocaleTimeString();
  return `${date} ${time}`;
}

let categorysObject = [
  { categoryName: "👩🏻‍🍼בייביסיטר ", valueId: "Babysitting" },
  { categoryName: "🛻הסעות", valueId: "Drives" },
  { categoryName: "🛒קניות לבית", valueId: "Shopping" },
  { categoryName: " 🐈‍⬛טיול לחיות מחמד", valueId: "PetWalk" },
  { categoryName: "🍳 בישולים", valueId: "Cooking" },
  { categoryName: "⬅️אחר", valueId: "Other" }
];

for (let i = 0; i < categorysObject.length; i++) {
  const option = document.createElement("option");
  option.text = categorysObject[i].categoryName;
  option.id = categorysObject[i].valueId;
  categorySelect.appendChild(option);
}

// Restore values from local storage if available
document.addEventListener('DOMContentLoaded', (event) => {
  const savedCategory = localStorage.getItem('selectedCategory');
  const savedRequestNote = localStorage.getItem('requestNote');
  if (savedCategory) {
    categorySelect.value = savedCategory;
  }
  if (savedRequestNote) {
    document.getElementById('reqNotes').value = savedRequestNote;
  }
});

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  
  let category = categorySelect.value;
  let requestNote = document.getElementById('reqNotes').value;

  // Save values to local storage
  localStorage.setItem('selectedCategory', category);
  localStorage.setItem('requestNote', requestNote);

  let username = await getUsernameByEmail();  
  console.log(username);
  document.getElementById('categoryValue').innerHTML = category;
  document.getElementById('ModalNotes').innerHTML = requestNote;

  const myModal = new bootstrap.Modal(document.getElementById('myModal'), {})
  myModal.show();
  
  await fetch('/requestPage/newCall', {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `category=${category}&date=${getCurrentDateTime()}&description=${requestNote}&name=${username}`
  })
  .then(response => response.text())
  .then(response => errorContainer.textContent = response)
  document.getElementById('reqNotes').value = "";
  categorySelect.value = "default"

});