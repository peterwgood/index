const calorieInput = document.getElementById('calorie-input');
const addBtn = document.getElementById('add-btn');
const resetBtn = document.getElementById('reset-btn');
const calorieList = document.getElementById('calorie-list');
const totalCalories = document.getElementById('total-calories');
const weeklyTotal = document.getElementById('weekly-total');

let calories = 11900;
let entries = [];
let totalConsumed = 0;

const storage = window.localStorage;

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

// Retrieve data from local storage
const storedEntries = JSON.parse(storage.getItem('entries'));
const storedCalories = parseInt(storage.getItem('calories'));
const storedTotalConsumed = parseInt(storage.getItem('totalConsumed'));

if (storedEntries) {
  entries = storedEntries;
  updateList();
}
if (storedCalories) {
  calories = storedCalories;
  updateTotal();
}
if (storedTotalConsumed) {
  totalConsumed = storedTotalConsumed;
  updateWeeklyTotal();
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
    totalConsumed += calorieAmount;
    updateList();
    updateTotal();
    updateWeeklyTotal();
    storage.setItem('entries', JSON.stringify(entries));
    storage.setItem('calories', calories);
    storage.setItem('totalConsumed', totalConsumed);
    calorieInput.value = '';
  }
}

function resetCalories() {
  calories = 11900;
  entries = [];
  totalConsumed = 0;
  storage.removeItem('entries');
  storage.removeItem('calories');
  storage.removeItem('totalConsumed');
  updateList();
  updateTotal();
  updateWeeklyTotal();
}

function updateList() {
  const listHtml = entries.map((entry, index) => {
    return `
      <li class="my-1">
        ${daysOfWeek[index]}: -${entry} calories
        <button class="delete-btn btn btn-danger btn-sm" data-index="${index}">Delete</button>
      </li>
    `;
  }).join('');
  calorieList.innerHTML = listHtml;
}

function updateTotal() {
  totalCalories.textContent = `Remaining Calories: ${calories}`;
}

function updateWeeklyTotal() {
  weeklyTotal.textContent = `Total Calories Consumed: ${totalConsumed}`;
}

calorieList.addEventListener('click', (event) => {
  if (event.target.classList.contains('delete-btn')) {
    const index = event.target.dataset.index;
    const deletedAmount = entries.splice(index, 1)[0];
    calories += deletedAmount; 
    totalConsumed -= deletedAmount;
    updateList();
    updateTotal();
    updateWeeklyTotal();
    storage.setItem('entries', JSON.stringify(entries));
    storage.setItem('calories', calories);
    storage.setItem('totalConsumed', totalConsumed);
  }
});