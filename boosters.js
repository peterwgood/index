const moodChart = document.getElementById('moodChart');
const foodLog = document.getElementById('foodLog');
const goodFoodButtons = document.getElementById('goodFoodButtons');
const badFoodButtons = document.getElementById('badFoodButtons');
const resetButton = document.getElementById('reset-button');

const goodFoods = [
  'Good Sleep', 'Nap', 'Physical Activity', 'Water/Gatorade', 'Sunlight', 'Beans', 'Bananas', 'Apples', 'Yogurt', 'Milk', 'Advocado', 'Eggs', 'Pickles', 'Nuts', 'Protein', 'Building Social Relationships', 'Focused in On a Project', 'Problem Solving', 'Insights', 'Drinking', 'Mastery', 'Learning', 'Having my Work Organized', 'Having something to do with family', 'Buying stuff for others', 'Cleaning', 'Engaging TV-MA (Trial&Error)'
];

const badFoods = [
  'Bad Sleep', 'Dyhydrated', 'Hungry', 'Hangover', 'Lack of Caffiene', 'Too Much Caffiene', 'Lack of Protein', 'No Physical Activity', 'Sick',  'Conflict', 'Disagreement', 'Overwhelmed', 'Underwhelmed', 'Laziness', 'Eating Unhealthy Food', 'Declining Social', 'Not working', 'Not Out', 'Too much Out'
];

let goodCount = 0;
let badCount = 0;

const chart = new Chart(moodChart, {
  type: 'pie',
  data: {
    labels: ['Good', 'Bad'],
    datasets: [{
      data: [goodCount, badCount],
      backgroundColor: goodCount === 0 && badCount === 0 ? ['#gray', '#gray'] : ['#28a745', '#dc3545']
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false
  }
});

goodFoods.forEach(food => createButton(food, 'good', goodFoodButtons));
badFoods.forEach(food => createButton(food, 'bad', badFoodButtons));

const savedLog = JSON.parse(localStorage.getItem('foodLog')) || [];
savedLog.forEach(entry => {
  addToLog(entry.food, entry.mood, false);
  if (entry.mood === 'good') {
    goodCount++;
  } else if (entry.mood === 'bad') {
    badCount++;
  }
});
updateMoodChart();

resetButton.addEventListener('click', resetLog);

function createButton(food, mood, container) {
  const button = document.createElement('button');
  button.textContent = food;
  button.className = 'btn m-1';
  button.classList.add(mood === 'good' ? 'btn-outline-success' : 'btn-outline-danger');
  button.addEventListener('click', () => addFoodEntry(food, mood));
  container.appendChild(button);
}

function updateMoodChart() {
  if (goodCount === 0 && badCount === 0) {
    chart.data.datasets[0].data = [1, 1];
    chart.data.datasets[0].backgroundColor = ['#ADD8E6', '#ADD8E6'];
    chart.options.elements.arc.borderWidth = 0;
  } else {
    chart.data.datasets[0].data = [goodCount, badCount];
    chart.data.datasets[0].backgroundColor = ['#90EE90', '#ADD8E6'];
    chart.options.elements.arc.borderWidth = 1;
  }
  chart.update();
}

function addToLog(food, mood, save = true) {
  const li = document.createElement('li');
  li.textContent = `${food} (${mood})`;
  li.className = 'list-group-item d-flex justify-content-between align-items-center';

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.className = 'btn btn-danger btn-sm';
  deleteButton.addEventListener('click', () => deleteLogEntry(li, food, mood));
  li.appendChild(deleteButton);

  foodLog.appendChild(li);
  if (save) {
    saveToLocalStorage(food, mood);
  }
}

function addFoodEntry(food, mood) {
  if (goodFoods.includes(food)) {
    goodCount++;
  } else if (badFoods.includes(food)) {
    badCount++;
  }
  addToLog(food, mood);
  updateMoodChart();
}

function deleteLogEntry(li, food, mood) {
  foodLog.removeChild(li);
  if (mood === 'good') {
    goodCount--;
  } else if (mood === 'bad') {
    badCount--;
  }
  removeFromLocalStorage(food, mood);
  updateMoodChart();
}

function saveToLocalStorage(food, mood) {
  const existingLog = JSON.parse(localStorage.getItem('foodLog')) || [];
  existingLog.push({ food, mood });
  localStorage.setItem('foodLog', JSON.stringify(existingLog));
}

function removeFromLocalStorage(food, mood) {
  const existingLog = JSON.parse(localStorage.getItem('foodLog')) || [];
  const updatedLog = existingLog.filter(entry => !(entry.food === food && entry.mood === mood));
  localStorage.setItem('foodLog', JSON.stringify(updatedLog));
}

function resetLog() {
  goodCount = 0;
  badCount = 0;
  foodLog.innerHTML = '';
  localStorage.removeItem('foodLog');
  updateMoodChart();
}