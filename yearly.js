$(document).ready(function() {
  const form = $('#calorie-form');
  const calorieLog = $('#calorie-log');

  let calorieData = [];

  // Retrieve data from local storage
  const storage = window.localStorage;
  const storedData = storage.getItem('calorieData');
  if (storedData) {
    calorieData = JSON.parse(storedData);
    renderCalorieLog();
  }

  // Function to update the date field with the current date
  function updateDateField() {
    const today = new Date();
    const formattedToday = `${today.getMonth() + 1}/${today.getUTCDate()}/${today.getFullYear()}`;
    $('#date').val(formattedToday);
  }

  // Set today's date in the input field when the page loads
  updateDateField();

  form.submit(function(e) {
    e.preventDefault();
    const date = $('#date').val();
    const calories = $('#calories').val();
    const entry = { date, calories };
    addEntryToLog(entry);
    saveDataToStorage();
    form.trigger('reset');
    updateDateField(); // Update the date field with the current date after form submission
  });

  function addEntryToLog(entry) {
    calorieData.push(entry); 
    renderCalorieLog(); // Call renderCalorieLog to update the display
  }

  function renderCalorieLog() {
    calorieLog.html('');
    $.each(calorieData.sort((a, b) => new Date(b.date) - new Date(a.date)), function(index, entry) {
      const date = new Date(entry.date);
      const formattedDate = `${date.getMonth() + 1}/${date.getUTCDate()}/${date.getFullYear()}`;
      const html = `
        <div class="d-flex align-items-center">
          <span>${formattedDate}</span>
          <span>&emsp;&emsp;${entry.calories} calories</span>
          <button class="delete-button btn btn-danger btn-sm ms-auto mb-2">Delete</button>
        </div>
      `;
      calorieLog.append(html);
      const deleteButton = calorieLog.children('div').last().find('.delete-button');
      deleteButton.on('click', function() {
        deleteEntry(entry);
      });
    });
  }

  function deleteEntry(entry) {
    calorieData = calorieData.filter(function(e) {
      return e.date !== entry.date || e.calories !== entry.calories;
    });
    saveDataToStorage();
    renderCalorieLog(); // Call renderCalorieLog again to update the display
  }

  function saveDataToStorage() {
    storage.setItem('calorieData', JSON.stringify(calorieData));
  }
});