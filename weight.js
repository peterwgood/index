// Define functions and variables
let chart; // Define chart in the global scope

function saveData() {
  const date = new Date(document.getElementById("date").value + "T00:00:00"); 
  const weight = parseFloat(document.getElementById("weight").value);
  const log = document.getElementById("log");
  const dayOfWeek = getDayOfWeek(date);
  const entry = `<li class="list-group-item d-flex justify-content-between align-items-center"> ${formatDate(date)} (${dayOfWeek}): ${weight.toFixed(1)} lbs <button class="btn btn-danger btn-sm delete-btn" onclick="deleteEntry(this)">Delete</button></li>`;
  const storedData = localStorage.getItem("weightData2");
  if (storedData === null) {
    localStorage.setItem("weightData2", entry);
  } else {
    localStorage.setItem("weightData2", entry + storedData);
  }
  log.insertAdjacentHTML("afterbegin", entry);
}

document.addEventListener("DOMContentLoaded", function() {
  const storedData = localStorage.getItem("weightData2");
  if (storedData) {
    document.getElementById("log").innerHTML = storedData;
  }
});

const now = new Date();
const year = now.getFullYear();
const month = now.getMonth() + 1;
const day = now.getDate();
document.getElementById("date").value = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

function deleteEntry(btn) {
  const entry = btn.parentNode;
  entry.remove();
  const storedData = localStorage.getItem("weightData2");
  const newData = storedData.replace(entry.outerHTML, "");
  localStorage.setItem("weightData2", newData);
}

function resetData() {
  localStorage.removeItem("weightData2");
  document.getElementById("log").innerHTML = "";
}

function formatDate(date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${month}/${day}/${year}`; 
}

function getDayOfWeek(date) {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return days[date.getDay()];
}