import React from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  const [name, setName] = React.useState('');
  const [calorieAmount, setCalorieAmount] = React.useState(0);
  const [entries, setEntries] = React.useState([]);
  const [remainingCalories, setRemainingCalories] = React.useState(1700);
  const [totalCaloriesUsed, setTotalCaloriesUsed] = React.useState(0);

  const addEntry = () => {
    const newEntry = { name, calorieAmount };
    setEntries([...entries, newEntry]);
    setRemainingCalories(remainingCalories - calorieAmount);
    setTotalCaloriesUsed(totalCaloriesUsed + calorieAmount);
    setName('');
    setCalorieAmount(0);
  };

  return (
    <div>
      <h1>Weight Tracker</h1>
      <form>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Food name"
        />
        <input
          type="number"
          value={calorieAmount}
          onChange={(e) => setCalorieAmount(parseInt(e.target.value))}
          placeholder="Calorie amount"
        />
        <button onClick={addEntry}>Add Entry</button>
      </form>
      <ul>
        {entries.map((entry, index) => (
          <li key={index}>
            <span>{entry.name} - {entry.calorieAmount}</span>
          </li>
        ))}
      </ul>
      <p>Remaining Calories: {remainingCalories}</p>
      <p>Total Calories Used: {totalCaloriesUsed}</p>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));