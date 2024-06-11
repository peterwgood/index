function saveData() {
  const date = document.getElementById("date").value;
  const weight = parseFloat(document.getElementById("weight").value);
  const log = document.getElementById("log");
  const entry = `<p>${formatDate(date)}: ${weight.toFixed(1)} lbs <button class="btn btn-danger btn-sm delete-btn" onclick="deleteEntry(this)">Delete</button></p>`;
  const storedData = localStorage.getItem("weightData");
  if (storedData === null) {
    localStorage.setItem("weightData", entry);
  } else {
    localStorage.setItem("weightData", entry + storedData);
  }
  log.insertAdjacentHTML("afterbegin", entry);
}

// Display existing log entries on page load
document.addEventListener("DOMContentLoaded", function() {
  const storedData = localStorage.getItem("weightData");
  if (storedData) {
    document.getElementById("log").innerHTML = storedData;
  }
});

// Set current date and time as default value for date input field
const now = new Date();
const year = now.getFullYear();
const month = now.getMonth() + 1;
const day = now.getDate();
const hour = now.getHours();
const minute = now.getMinutes();
document.getElementById("date").value = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}T${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;

// Delete entry function
function deleteEntry(btn) {
  const entry = btn.parentNode;
  entry.remove();
  const storedData = localStorage.getItem("weightData");
  const newData = storedData.replace(entry.outerHTML, "");
  localStorage.setItem("weightData", newData);
}

// Reset data function
function resetData() {
  localStorage.removeItem("weightData");
  document.getElementById("log").innerHTML = "";
}

// Format date function
function formatDate(date) {
  const dateObj = new Date(date);
  const month = dateObj.getMonth() + 1;
  const day = dateObj.getDate();
  const year = dateObj.getFullYear();
  const hour = dateObj.getHours();
  const minute = dateObj.getMinutes();
  return `${month}/${day}/${year} ${hour}:${minute.toString().padStart(2, '0')}`;
}