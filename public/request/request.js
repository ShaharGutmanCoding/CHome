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
  
}
document.createElement("option")


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
});
*/