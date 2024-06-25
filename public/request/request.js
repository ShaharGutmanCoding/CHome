
  const categorySelect = $('#select_page');
  const form = $('#formSelect');
  const errorContainer = $('#errorContainer');

  const categorysObject = [
    { categoryName: "👩🏻‍🍼בייביסיטר", valueId: "Babysitting" },
    { categoryName: "🛻הסעות", valueId: "Drives" },
    { categoryName: "🛒קניות לבית", valueId: "Shopping" },
    { categoryName: "🐈‍⬛טיול לחיות מחמד", valueId: "PetWalk" },
    { categoryName: "🍳בישולים", valueId: "Cooking" },
    { categoryName: "⬅️אחר", valueId: "Other" }
  ];

  categorysObject.forEach(function(category) {
    const option = $('<option>').text(category.categoryName).val(category.valueId);
    categorySelect.append(option);
  });

  form.on('submit', async function(event) {
    event.preventDefault();
    const category = $('#select_page').val();
    const requestNote = $('#reqNotes').val();

    if (!category || !requestNote) {
      errorContainer.text('אנא מלא את כל השדות');
      return;
    }

    const username = await getUsernameByEmail();

    $('#categoryValue').text(category);
    $('#notesValue').text(requestNote);

    const myModal = new bootstrap.Modal($('#myModal'));
    myModal.show();

    try {
      const response = await fetch('/requestPage/newCall', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `category=${category}&date=${getCurrentDateTime()}&description=${requestNote}&name=${username}`
      });
      const responseText = await response.text();
      errorContainer.text(responseText);
    } catch (error) {
      errorContainer.text('שגיאה בשליחת הבקשה');
    }
  });

  function fixEmailAdress(value) {
    return value.replace("%40", "@");
  }

  async function getUsernameByEmail() {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
      let [cookieName, cookieValue] = cookie.trim().split('=');
      if (cookieName === 'email') {
        cookieValue = fixEmailAdress(cookieValue);
        const response = await fetch("/requestPage/getUserName", {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: `email=${cookieValue}`
        });
        const data = await response.json();
        return data.firstName;
      }
    }
    return null;
  }

  function getCurrentDateTime() {
    const now = new Date();
    const date = now.toLocaleDateString('he-IL');
    const time = now.toLocaleTimeString('he-IL');
    return `${date} ${time}`;
  }

