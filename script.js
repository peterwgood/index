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

    if (name !== "" && !isNaN(calorieAmount)) {
      data.remainingCalories -= calorieAmount;
      data.totalCaloriesUsed += calorieAmount;
      data.entries.push({ name, calorieAmount });
      saveData();
      renderEntryList();
      nameInput.value = "";
      calorieAmountInput.value = "";
    } else {
      alert("Please enter a valid name and calorie amount.");
    }
  }

  addEntryButton.addEventListener("click", addEntry);

  nameInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const name = nameInput.value.trim();
      const calorieAmount = parseInt(calorieAmountInput.value.trim());

      if (name !== "" && !isNaN(calorieAmount)) {
        addEntry();
      } else {
        alert("Please enter a valid name and calorie amount.");
      }
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

      if (name !== "" && !isNaN(calorieAmount)) {
        addEntry();
      } else {
        alert("Please enter a valid name and calorie amount.");
      }
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
        renderEntryList();
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
    renderEntryList();
    entryListElement.innerHTML = ""; // Clear entry list
  });

  function renderEntryList() {
    entryListElement.innerHTML = "";
    const ul = document.createElement("UL");
    ul.className = "list-unstyled"; // Remove bullet points
    data.entries.forEach((entry) => {
      const li = document.createElement("LI");
     
      li.style.padding = "5px 0px 10px 0px"; // Add padding
     
   
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