$(document).ready(function() {
	const form = $('#calorie-form');
	const calorieLog = $('#calorie-log');

	let calorieData = [];

	// Retrieve data from local storage
	const storage = window.localStorage;
	const storedData = storage.getItem('calorieData');
	if (storedData) {
		calorieData = JSON.parse(storedData);
		renderCalorieLog();
	}

	form.submit(function(e) {
		e.preventDefault();
		const date = $('#date').val();
		const calories = $('#calories').val();
		const entry = { date, calories };
		addEntryToLog(entry);
		saveDataToStorage();
		form.trigger('reset');
	});

	function addEntryToLog(entry) {
		calorieData.push(entry); 
		renderCalorieLog(); // Call renderCalorieLog to update the display
	}

	function renderCalorieLog() {
	calorieLog.html('');
	$.each(calorieData, function(index, entry) {
		const date = new Date(entry.date);
		const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
		const html = `
			<div class="d-flex align-items-center">
				<span>${formattedDate}</span>
				<span>&emsp;&emsp;${entry.calories} calories</span>
				<button class="delete-button btn btn-danger btn-sm ms-auto mb-2">Delete</button>
			</div>
		`;
		calorieLog.append(html);
		const deleteButton = calorieLog.children('div').last().find('.delete-button');
		deleteButton.on('click', function() {
			deleteEntry(entry);
		});
	});
}

	function deleteEntry(entry) {
		calorieData = calorieData.filter(function(e) {
			return e.date !== entry.date || e.calories !== entry.calories;
		});
		saveDataToStorage();
		renderCalorieLog(); // Call renderCalorieLog again to update the display
	}

	function saveDataToStorage() {
		storage.setItem('calorieData', JSON.stringify(calorieData));
	}
});