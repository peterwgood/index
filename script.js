document.addEventListener("DOMContentLoaded", function(){
  const nameInput = document.getElementById("name");
  const calorieAmountInput = document.getElementById("calorie-amount");
  const addEntryButton = document.getElementById("add-entry");
  const entryListElement = document.getElementById("entry-list");
  const remainingCaloriesElement = document.getElementById("remaining-calories-value");
  const totalCaloriesUsedElement = document.getElementById("total-calories-used-value");
  const resetButton = document.getElementById("reset-button");
  const addCalorieButtons = document.querySelectorAll(".add-calorie-button");
  const chartCanvas = document.getElementById('calorie-chart');

  let data = {
    remainingCalories: 1700,
    totalCaloriesUsed: 0,
    entries: []
  };

  let chart;

 function addEntry(name, calorieAmount) {
  if (name !== "" && !isNaN(calorieAmount)) {
    data.remainingCalories -= calorieAmount;
    data.totalCaloriesUsed += calorieAmount;
    data.entries.push({ name, calorieAmount });
    saveData();
    renderEntryList(); // Update the entry list
    updateChart(); // Update the chart
    nameInput.value = "";
    calorieAmountInput.value = "";
  } else {
    alert("Please enter a valid name and calorie amount.");
  }
}

  addEntryButton.addEventListener("click", () => {
    const name = nameInput.value.trim();
    const calorieAmount = parseInt(calorieAmountInput.value.trim());
    addEntry(name, calorieAmount);
  });

  addCalorieButtons.forEach(button => {
    button.addEventListener("click", () => {
      const name = button.getAttribute("data-name");
      const calories = parseInt(button.getAttribute("data-calories"));
      addEntry(name, calories);
    });
  });

  nameInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const name = nameInput.value.trim();
      const calorieAmount = parseInt(calorieAmountInput.value.trim());
      addEntry(name, calorieAmount);
    }
  });

  calorieAmountInput.addEventListener("focus", (event) => {
    if (event.target.type === "text") {
      event.target.type = "number";
    }
  });

  calorieAmountInput.addEventListener("blur", (event) => {
    if (event.target.type === "number") {
      event.target.type = "text";
    }
  });

  calorieAmountInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const name = nameInput.value.trim();
      const calorieAmount = parseInt(calorieAmountInput.value.trim());
      addEntry(name, calorieAmount);
    }
  });

  entryListElement.addEventListener("click", (event) => {
    if (event.target.classList.contains("delete-button")) {
      const entryElement = event.target.closest("li");
      const entryName = entryElement.querySelector("span").textContent;
      const [name, calorieAmount] = entryName.split(" - ");
      const index = data.entries.findIndex((entry) => entry.name === name && entry.calorieAmount === parseInt(calorieAmount));
      if (index > -1) {
        data.entries.splice(index, 1);
        data.remainingCalories += parseInt(calorieAmount);
        data.totalCaloriesUsed -= parseInt(calorieAmount);
        saveData();
        updateChart();
        entryElement.remove();
      }
    }
  });

  resetButton.addEventListener("click", () => {
    data = {
      remainingCalories: 1700,
      totalCaloriesUsed: 0,
      entries: []
    };
    saveData();
    updateChart();
    entryListElement.innerHTML = ""; // Clear entry list
  });

 






function renderEntryList() {
  entryListElement.innerHTML = "";
  const ul = document.createElement("UL");
  ul.className = "list-group"; // Use Bootstrap list group class
  data.entries.forEach((entry) => {
    const li = document.createElement("LI");
    li.className = 'list-group-item d-flex justify-content-between align-items-center'; // Use Bootstrap classes
    const entryHTML = `
      <span>${entry.name} - ${entry.calorieAmount}</span>
      <button class="btn btn-danger btn-sm delete-button">Delete</button>
    `;
    li.innerHTML = entryHTML;
    ul.appendChild(li);
  });
  entryListElement.appendChild(ul);
  remainingCaloriesElement.textContent = data.remainingCalories;
  totalCaloriesUsedElement.textContent = data.totalCaloriesUsed;

  if (!chart) {
    const chartData = {
      labels: ['Total Calories Used', 'Remaining Calories'],
      datasets: [{
        label: 'Calories',
        data: [Math.min(data.totalCaloriesUsed, 1700), Math.max(0, 1700 - data.totalCaloriesUsed)],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)', // Pink
          'rgba(54, 162, 235, 0.2)', // Blue
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)', // Pink
          'rgba(54, 162, 235, 1)', // Blue
        ],
        borderWidth: 1
      }]
    };
    const chartOptions = {
      title: {
        display: true,
        text: 'Calorie Breakdown'
      },
      responsive: true,
      maintainAspectRatio: false
    };
    chart = new Chart(chartCanvas, {
      type: 'pie',
      data: chartData,
      options: chartOptions
    });
  } else {
    chart.data.datasets[0].data[0] = Math.min(data.totalCaloriesUsed, 1700);
    chart.data.datasets[0].data[1] = Math.max(0, 1700 - data.totalCaloriesUsed);
    chart.update();
  }
}
  function saveData() {
    const jsonData = JSON.stringify(data);
    localStorage.setItem("calorie-counter-data", jsonData);
  }

  // Retrieve data from local storage
  const storedData = localStorage.getItem("calorie-counter-data");
  if (storedData) {
    data = JSON.parse(storedData);
    renderEntryList();
  }
});