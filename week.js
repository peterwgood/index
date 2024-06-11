const calorieInput = document.getElementById('calorie-input');
const addBtn = document.getElementById('add-btn');
const resetBtn = document.getElementById('reset-btn');
const calorieList = document.getElementById('calorie-list');
const totalCalories = document.getElementById('total-calories');

let calories = 11900;
let entries = [];

const storage = window.localStorage;

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

// Retrieve data from local storage
const storedEntries = JSON.parse(storage.getItem('entries'));
const storedCalories = parseInt(storage.getItem('calories'));

if (storedEntries) {
  entries = storedEntries;
  updateList();
}
if (storedCalories) {
  calories = storedCalories;
  updateTotal();
}

addBtn.addEventListener('click', addCalorie);
resetBtn.addEventListener('click', resetCalories);

calorieInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    addCalorie();
  }
});

function addCalorie() {
  const calorieAmount = parseInt(calorieInput.value);
  if (calorieAmount && entries.length < 7) {
    entries.push(calorieAmount);
    calories -= calorieAmount;
    updateList();
    updateTotal();
    storage.setItem('entries', JSON.stringify(entries));
    storage.setItem('calories', calories);
    calorieInput.value = '';
  }
}

function resetCalories() {
  calories = 11900;
  entries = [];
  storage.removeItem('entries');
  storage.removeItem('calories');
  updateList();
  updateTotal();
}

function updateList() {
  const listHtml = entries.map((entry, index) => {
    return `
      <li class="list-group-item">
        ${daysOfWeek[index]}: -${entry} calories
        <button class="delete-btn btn btn-warning btn-sm" data-index="${index}">Delete</button>
      </li>
    `;
  }).join('');
  calorieList.innerHTML = listHtml;
}

function updateTotal() {
  totalCalories.textContent = `Total Calories: ${calories}`;
}

calorieList.addEventListener('click', (event) => {
  if (event.target.classList.contains('delete-btn')) {
    const index = event.target.dataset.index;
    const deletedAmount = entries.splice(index, 1)[0];
    calories += deletedAmount; 
    updateList();
    updateTotal();
    storage.setItem('entries', JSON.stringify(entries));
    storage.setItem('calories', calories);
  }
});