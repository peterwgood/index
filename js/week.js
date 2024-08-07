const calorieInput = document.getElementById('calorie-input');
const addBtn = document.getElementById('add-btn');
const resetBtn = document.getElementById('reset-btn');
const calorieList = document.getElementById('calorie-list');
const totalCalories = document.getElementById('total-calories');
const weeklyTotal = document.getElementById('weekly-total');
const pieChartCanvas = document.getElementById('PieChart');

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
    updatePieChart();
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
  updatePieChart();
}

function updateList() {
  const listHtml = entries.map((entry, index) => {
    return `
      <li class="list-group-item d-flex justify-content-between align-items-center">
        ${daysOfWeek[index]}: -${entry} calories
        <button class="delete-btn btn btn-danger btn-sm" data-index="${index}">Delete</button>
      </li>
    `;
  }).join('');
  calorieList.innerHTML = listHtml;
  const deleteBtns = document.querySelectorAll('.delete-btn');
  deleteBtns.forEach((btn) => {
    btn.addEventListener('click', deleteEntry);
  });
}
function deleteEntry(event) {
  const index = event.target.dataset.index;
  const deletedAmount = entries.splice(index, 1)[0];
  calories += deletedAmount; 
  totalConsumed -= deletedAmount;
  updateList();
  updateTotal();
  updateWeeklyTotal();
  updatePieChart();
  storage.setItem('entries', JSON.stringify(entries));
  storage.setItem('calories', calories);
  storage.setItem('totalConsumed', totalConsumed);
}

function updateTotal() {
  totalCalories.textContent = `Remaining Calories: ${calories}`;
}

function updateWeeklyTotal() {
  weeklyTotal.textContent = `Total Calories Consumed: ${totalConsumed}`;
}

function updatePieChart() {
  if (window.chart) {
    window.chart.destroy();
  }
  const ctx = pieChartCanvas.getContext('2d');

  window.chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: daysOfWeek.slice(0, entries.length), // only show days with data
      datasets: [{
        label: 'Calories Consumed',
        data: entries,
        backgroundColor: entries.map(entry => entry > 1700 ? 'rgba(255, 99, 132, 0.2)' : 'rgba(0, 255, 0, 0.2)'),
        borderColor: entries.map(entry => entry > 1700 ? 'rgba(255, 99, 132, 1)' : 'rgba(0, 255, 0, 1)'), // match border color with background color
        borderWidth: {
          top: 2,
          right: 2,
          left: 2,
          bottom: 0 // no bottom border
        },
      }]
    },
    options: {
      scales: {
        y: {
          max: 3000 // set max limit of graph
        }
      }
    }
  });
}

updatePieChart();

updateList();