document.addEventListener("DOMContentLoaded", function(){
  const nameInput = document.getElementById("name");
  const calorieAmountInput = document.getElementById("calorie-amount");
  const addEntryButton = document.getElementById("add-entry");
  const entryListElement = document.getElementById("entry-list");
  const remainingCaloriesElement = document.getElementById("remaining-calories-value");
  const totalCaloriesUsedElement = document.getElementById("total-calories-used-value");
  const resetButton = document.getElementById("reset-button");

  let data = {
    remainingCalories: 1700,
    totalCaloriesUsed: 0,
    entries: []
  };

  function addEntry() {
    const name = nameInput.value.trim();
    const calorieAmount = parseInt(calorieAmountInput.value.trim());

    if (name && !isNaN(calorieAmount)) {
      data.remainingCalories -= calorieAmount;
      data.totalCaloriesUsed += calorieAmount;
      data.entries.push({ name, calorieAmount });
      saveData();
      renderEntryList();
      nameInput.value = "";
      calorieAmountInput.value = "";
    } else {
      alert("Please fill in both fields.");
    }
  }

  addEntryButton.addEventListener("click", addEntry);

  nameInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  });

  calorieAmountInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  });

  entryListElement.addEventListener("click", (event) => {
    if (event.target.classList.contains("delete-button")) {
      const rowElement = event.target.parentNode.parentNode;
      const entryName = rowElement.cells[0].textContent;
      const [name, calorieAmount] = entryName.split(" - ");
      const index = data.entries.findIndex((entry) => entry.name === name && entry.calorieAmount === parseInt(calorieAmount));
      if (index > -1) {
        data.entries.splice(index, 1);
        data.remainingCalories += parseInt(calorieAmount);
        data.totalCaloriesUsed -= parseInt(calorieAmount);
        saveData();
        renderEntryList();
        rowElement.remove();
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
    renderEntryList();
    entryListElement.innerHTML = ""; // Clear entry list
  });

  function renderEntryList() {
    entryListElement.innerHTML = "";
    data.entries.forEach((entry) => {
      const entryHTML = `
        <tr>
          <td>${entry.name} - ${entry.calorieAmount}</td>
          <td><button class="btn btn-danger delete-button">Delete</button></td>
        </tr>
      `;
      entryListElement.insertAdjacentHTML("beforeend", entryHTML);
    });
    remainingCaloriesElement.textContent = data.remainingCalories;
    totalCaloriesUsedElement.textContent = data.totalCaloriesUsed;
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