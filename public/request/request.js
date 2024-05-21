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
console.log(form)
form.addEventListener('submit', async(event) => {
  event.preventDefault();
  let category = document.getElementById('formSelect').value;
  let year = document.getElementById('dateYear').value;
  let month = document.getElementById('dateMonth').value;
  let day = document.getElementById('dateDay').value;
  let requestNote = document.getElementById('reqNotes').value;
  ShowModal(201,year,category,requestNote);

  // await fetch('/requestPage/newCall', {
  //     method:'Post',
  //     Credential:'include',
  //     headers:{'Content-Type': 'application/x-www-form-urlencoded'},
  //     body:`category=${select_page}&year=${dateYear}&month=${dateMonth}&day=${dateDay}&requestNote=${reqNote}`
  // })

  // .then(()=> window.location.href = '/loginSystem/login')
});
function ShowModal(code, date,category,note){
  let dateModal = document.getElementById('modalDate');
  let categoryModal = document.getElementById('modalCategory');
  let noteReqModal = document.getElementById('modalNoteReq');
  if(code==200){
    dateModal.text = date
    categoryModal.text = category
    noteReqModal.text = note
    
  }
  else{
    const alertDiv = document.createElement('div')
    alertDiv.classList.add('alert alert-danger')
    alertDiv.text("קרתה שגיאה,אנא נסה שוב ובדוק את הפרטים שהזנת")
    let modalBody = document.getElementById('modalBody')
    modalBody.appendChild(alertDiv)
  }
  
  var myModal = new bootstrap.Modal(document.getElementById('myModal'), {
    keyboard: false
  });
  myModal.show();
  
}



//Calander script (maybe delete)

/*$(document).ready(function () {
//change selectboxes to selectize mode to be searchable
  $("select").select2();
});

  document.addEventListener('DOMContentLoaded', function() {
  const openCalendarButton = document.getElementById('open-calendar');
  const calendarContainer = document.getElementById('calendar');
  const selectedDateContainer = document.getElementById('selected-date');
  let flatpickrInstance;

  // Event listener for the button
  openCalendarButton.addEventListener('click', function() {
    if (!flatpickrInstance) {
    // Initialize Flatpickr if not already initialized
      flatpickrInstance = flatpickr(calendarContainer, {
      inline: true, // Display calendar inline
      dateFormat: 'Y-m-d', // Format of the selected date
      defaultDate: 'today', // Start with today's date
      onClose: function(selectedDates, dateStr, instance) {
    // Show selected date
      selectedDateContainer.textContent = 'תאריך שנבחר: ' + dateStr;
      selectedDateContainer.style.display = 'block';

    // Hide the calendar
      calendarContainer.style.display = 'none';
    }
  });
}

    // Show the calendar when the button is clicked
      calendarContainer.style.display = 'block';
  });
}); */
