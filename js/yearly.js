let chart; // Define chart in the global scope

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
  updateChart();
}

document.addEventListener("DOMContentLoaded", function() {
  const storedData = localStorage.getItem("weightData");
  if (storedData) {
    document.getElementById("log").innerHTML = storedData;
  }
  createBarChart();
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
  updateChart();
}

function resetData() {
  localStorage.removeItem("weightData");
  document.getElementById("log").innerHTML = "";
  updateChart();
}

function formatDate(date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${month}/${day}/${year}`; 
}

function createBarChart() {
  const ctx = document.getElementById('BarChart').getContext('2d');
  chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: [], // dynamic labels
      datasets: [{
        label: 'Calories',
        data: [], // dynamic data
        backgroundColor: [], // dynamic background color
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          max: 15000 // Adjust the max value as needed
        }
      },
      plugins: {
        annotation: {
          annotations: {
            line1: {
              type: 'line',
              yMin: 11900,
              yMax: 11900,
              borderColor: 'rgb(255, 0, 0)', // Red color for visibility
              borderWidth: 5, // Increased thickness
              label: {
                content: 'Threshold',
                enabled: true,
                position: 'center',
                backgroundColor: 'rgba(255, 0, 0, 0.5)' // Background color for the label
              }
            }
          }
        }
      }
    }
  });

  // Call updateChart initially to populate the chart
  updateChart();
}



function updateChart() {
  console.log('Updating chart...');
  const storedData = localStorage.getItem("weightData");
  if (storedData) {
    const entries = storedData.match(/<li[^>]*>(.*?)<\/li>/g);
    const labels = [];
    const data = [];
    const backgroundColors = [];
    const borderColors = [];
    entries.forEach((entry) => {
      if (entry) {
        const date = entry.match(/>(.*?):/)[1];
        const weight = parseFloat(entry.match(/:(.*?) Calories/)[1]);
        labels.push(date);
        data.push(weight);
        backgroundColors.push(weight > 11900 ? 'rgba(255, 99, 132, 0.2)' : 'rgba(0, 255, 0, 0.2)');
        borderColors.push(weight > 11900 ? 'rgba(255, 99, 132, 1)' : 'rgba(0, 255, 128, 1)'); // Light green border
      }
    });
    // Reverse the arrays
    labels.reverse();
    data.reverse();
    backgroundColors.reverse();
    borderColors.reverse();
    console.log('Labels:', labels);
    console.log('Data:', data);
    chart.data.labels = labels;
    chart.data.datasets[0].data = data;
    chart.data.datasets[0].backgroundColor = backgroundColors;
    chart.data.datasets[0].borderColor = borderColors;
    chart.update();
  }
}