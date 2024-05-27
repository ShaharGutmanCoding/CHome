var categorySelect = document.getElementById("select_page")
const form = document.getElementById('formSelect')



function getUsernameByEmail() {
  const cookies = document.cookie.split(';');
  for (let cookie of cookies) {
    const [cookieName, cookieValue] = cookie.trim().split('=');
    if (cookieName === 'email') {
      cookieValue =  fixEmailAdress(cookieValue);
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
console.log(form)
form.addEventListener('submit', async(event) => {
  event.preventDefault();
  let category = document.getElementById('select_page').value;
  let requestNote = document.getElementById('reqNotes').value;


  await fetch('/requestPage/newCall', {
      method:'Post',
      Credential:'include',
      headers:{'Content-Type': 'application/x-www-form-urlencoded'},
      body:`category=${category}&date=${getCurrentDateTime()}&description=${requestNote}&name=${getUsernameByEmail()}`
  })

 
});



