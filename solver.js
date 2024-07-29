// Initialize an empty array to store the selected items
var selectedItems = [];

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

document.getElementById("new-item").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        addToLog(document.getElementById('new-item').value);
        document.getElementById('new-item').value = '';
    }
});

// Load the selected items from local storage when the page loads
window.onload = function() {
    loadFromLocalStorage();
}