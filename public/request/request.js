document.addEventListener("DOMContentLoaded", function() {
  var categorySelect = document.getElementById("category");

  let categorysObject = [
      {categoryName: "👩🏻‍🍼בייביסיטר ", valueId: "Babysitting"},
      {categoryName: "🛻הסעות", valueId: "Drives"},
      {categoryName: "🛒קניות לבית", valueId: "Shopping"},
      {categoryName: " 🐈‍⬛טיול לחיות מחמד", valueId: "PetWalk"},
      {categoryName: "🍳 בישולים", valueId: "Cooking"},
      {categoryName: "⬅️אחר", valueId: "Other"}
  ];

  for (let i = 0; i < categorysObject.length; i++) {
      const option = document.createElement("option");
      option.text = categorysObject[i].categoryName;
      option.value = categorysObject[i].valueId;
      categorySelect.appendChild(option);
  }

  function getCurrentDateTime() {
      let now = new Date();
      let date = now.toLocaleDateString();
      let time = now.toLocaleTimeString();
      return `${date} ${time}`;
  }

  function sendRequest(event) {
      event.preventDefault(); // Prevent the form from submitting and reloading the page

      var category = document.getElementById("category").value;
      var description = document.getElementById("description").value;
      var dateTime = getCurrentDateTime();


      fetch("/requestPage/newCall", {
          method: "post",
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: `category=${category}&date=${dateTime}&description=${description}`
      });
  }

  document.getElementById("requestForm").addEventListener("submit", sendRequest);
});
