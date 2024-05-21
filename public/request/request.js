var categorySelect = document.getElementById("select_page")

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
document.createElement("option");



function getCurrentDateTime() {
  let now = new Date();
  let date = now.toLocaleDateString();
  let time = now.toLocaleTimeString();
  return `${date} ${time}`;
}

function sendRequest(){
  
var dateTime = getCurrentDateTime();


fetch("/requestPage/newCall",{
  method: "post",
         headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body:`category=${",,"}&date=${dateTime}&description=${"vv"}`
  
})
}