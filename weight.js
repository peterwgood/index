 function saveData() {
            const date = document.getElementById("date").value;
            const weight = document.getElementById("weight").value;
            const log = document.getElementById("log");
            const entry = `<p>${formatDate(date)}: ${weight} lbs <button class="btn btn-danger btn-sm delete-btn" onclick="deleteEntry(this)">Delete</button></p>`;
            const storedData = localStorage.getItem("weightData");
            if (storedData === null) {
                localStorage.setItem("weightData", entry);
            } else {
                localStorage.setItem("weightData", storedData + entry);
            }
            log.insertAdjacentHTML("beforeend", entry);
        }

        // Display existing log entries on page load
        document.addEventListener("DOMContentLoaded", function() {
            const storedData = localStorage.getItem("weightData");
            if (storedData) {
                document.getElementById("log").innerHTML = storedData;
            }
        });

        // Set current date as default value for date input field
        document.getElementById("date").value = new Date().toISOString().substring(0, 10);

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
            const month = date.slice(5, 7);
            const day = date.slice(8, 10);
            const year = date.slice(0, 4);
            return `${month}/${day}/${year}`;
        }