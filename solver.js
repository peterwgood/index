// Initialize an empty array to store the selected items
var selectedItems = [];

// Array of button labels
var buttonLabels = [];

// Function to generate buttons dynamically
// ...

// Function to generate buttons dynamically
// ...

// Function to generate buttons dynamically
// ...

// Function to generate buttons dynamically
function generateButtons() {
    var buttonsContainer = document.getElementById('buttons');
    // Clear existing buttons
    buttonsContainer.innerHTML = '';
    // Generate buttons for each label
    buttonLabels.forEach(function(label, index) {
        var buttonContainer = document.createElement('div');
        buttonContainer.className = 'd-inline-block me-2';
        var button = document.createElement('button');
        button.className = 'btn btn-outline-secondary';
        button.textContent = label;
        button.onclick = function() {
            addToLog(label);
        };
        buttonContainer.appendChild(button);
        buttonsContainer.appendChild(buttonContainer);
    });
    // Add "Add New Button" button
    var addButton = document.createElement('button');
    addButton.className = 'btn btn-primary m-1';
    addButton.textContent = 'New';
    addButton.onclick = addNewButton;
    buttonsContainer.appendChild(addButton);
    // Add "Reset" button
    var resetButton = document.createElement('button');
    resetButton.className = 'btn btn-danger m-1';
    resetButton.textContent = 'Reset';
    resetButton.onclick = function() {
        buttonLabels = [];
        saveButtonLabelsToLocalStorage();
        generateButtons();
    };
    buttonsContainer.appendChild(resetButton);
}

// ...

// Call the generateButtons function to create the buttons
generateButtons();

// Function to add an item to the log
function addToLog(item) {
    selectedItems.push(item);
    saveToLocalStorage();
    updateLog();
}

// Function to delete an item from the log
function deleteItem(index) {
    selectedItems.splice(index, 1);
    saveToLocalStorage();
    updateLog();
}

// Function to reset the log
function resetLog() {
    selectedItems = [];
    saveToLocalStorage();
    updateLog();
}

// Function to update the log display
function updateLog() {
    var logList = document.getElementById("log-list");
    logList.innerHTML = "";
    for (var i = 0; i < selectedItems.length; i++) {
        var li = document.createElement("li");
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        li.textContent = selectedItems[i];
        var deleteButton = document.createElement("button");
        deleteButton.className = 'btn btn-danger';
        deleteButton.onclick = function(index) {
            return function() {
                deleteItem(index);
            }
        }(i);
        deleteButton.textContent = "Delete";
        li.appendChild(deleteButton);
        logList.appendChild(li);
    }
}

// Function to save the selected items to local storage
function saveToLocalStorage() {
    localStorage.setItem("selectedItems", JSON.stringify(selectedItems));
}

// Function to load the selected items from local storage
function loadFromLocalStorage() {
    var storedItems = localStorage.getItem("selectedItems");
    if (storedItems) {
        selectedItems = JSON.parse(storedItems);
        updateLog();
    }
}

// Function to save button labels to local storage
function saveButtonLabelsToLocalStorage() {
    localStorage.setItem("buttonLabels", JSON.stringify(buttonLabels));
}

// Function to load button labels from local storage
function loadButtonLabelsFromLocalStorage() {
    var storedButtonLabels = localStorage.getItem("buttonLabels");
    if (storedButtonLabels) {
        buttonLabels = JSON.parse(storedButtonLabels);
    }
}

// Load button labels and selected items from local storage when the page loads
window.onload = function() {
    loadButtonLabelsFromLocalStorage();
    loadFromLocalStorage();
    generateButtons();
}

// Add event listener to input field to add item to log when Enter is pressed
document.getElementById("new-item").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        addToLog(document.getElementById('new-item').value);
        document.getElementById('new-item').value = '';
    }
});

// Function to add a new button
function addNewButton() {
    var newButtonLabel = prompt("Enter the label for the new button:");
    if (newButtonLabel) {
        buttonLabels.push(newButtonLabel);
        saveButtonLabelsToLocalStorage();
        generateButtons();
    }
}

// Function to remove a button
function removeButtonLabel(label) {
    var index = buttonLabels.indexOf(label);
    if (index !== -1) {
        buttonLabels.splice(index, 1);
        saveButtonLabelsToLocalStorage();
        generateButtons();
    }
}