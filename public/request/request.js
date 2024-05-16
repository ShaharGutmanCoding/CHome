$(document).ready(function () {
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