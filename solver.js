// Initialize an empty array to store the selected items
var selectedItems = [];

// Array of button labels
var buttonLabels = [];

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
}

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
        deleteButton.className = 'btn btn-danger btn-sm';
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

// Function to add a new button
function addNewButton() {
    var newButtonLabel = prompt("Enter the label for the new button:");
    if (newButtonLabel) {
        buttonLabels.push(newButtonLabel);
        saveButtonLabelsToLocalStorage();
        generateButtons();
    }
}

// Function to reset buttons
function resetButtons() {
    buttonLabels = [];
    saveButtonLabelsToLocalStorage();
    generateButtons();
}

var inputField = document.getElementById('new-item');
inputField.addEventListener('keypress', function(event) {
    // Check if the Enter key was pressed
    if (event.key === 'Enter') {
        // Call the addToLog function with the input field value
        addToLog(inputField.value);
        // Clear the input field value
        inputField.value = '';
    }
});