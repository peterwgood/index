function saveData() {
  const date = new Date(document.getElementById("date").value + "T00:00:00"); 
  const weight = parseFloat(document.getElementById("weight").value);
  const log = document.getElementById("log");
  const entry = `<li class="list-group-item d-flex justify-content-between align-items-center"> ${formatDate(date)}: ${weight.toFixed(1)} Calories <button class="btn btn-danger btn-sm delete-btn" onclick="deleteEntry(this)">Delete</button></li>`;
  const storedData = localStorage.getItem("weightData");
  if (storedData === null) {
    localStorage.setItem("weightData", entry);
  } else {
    localStorage.setItem("weightData", entry + storedData);
  }
  log.insertAdjacentHTML("afterbegin", entry);
}

document.addEventListener("DOMContentLoaded", function() {
  const storedData = localStorage.getItem("weightData");
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
  const storedData = localStorage.getItem("weightData");
  const newData = storedData.replace(entry.outerHTML, "");
  localStorage.setItem("weightData", newData);
}

function resetData() {
  localStorage.removeItem("weightData");
  document.getElementById("log").innerHTML = "";
}

function formatDate(date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${month}/${day}/${year}`; 
}
