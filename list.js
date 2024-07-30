// Initialize the to-do list and list name
let toDoList = JSON.parse(localStorage.getItem('toDoList')) || [];
let listName = localStorage.getItem('listName') || 'List';

// Add event listeners for the add item button and input field
document.getElementById('add-item').addEventListener('click', addItem);
document.getElementById('new-item').addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    addItem();
  }
});

document.addEventListener('DOMContentLoaded', function() {
  listName = localStorage.getItem('listName') || 'List';
  document.getElementById('list-name').textContent = listName;
});


// Add event listener for the rename list button
document.getElementById('rename-list').addEventListener('click', renameList);

// Function to add a new item to the list
function addItem() {
  const newItem = document.getElementById('new-item').value.trim();
  if (newItem !== '') {
    toDoList.push(newItem);
    updateList();
    document.getElementById('new-item').value = '';
  }
}

// Function to update the list HTML
function updateList() {
  const listHTML = toDoList.map((item, index) => {
    // Replace newline characters with HTML line breaks
    const itemHTML = item.replace(/\n/g, '<br>');
    
    return `
      <li class="list-group-item" data-index="${index}">
        <span>${itemHTML}</span>
        <button class="delete btn btn-sm btn-danger" onclick="deleteItem(${index})">Delete</button>
        <button class="edit btn btn-sm btn-secondary" onclick="editItem(${index})">Edit</button>
      </li>
    `;
  }).join('');
  
  document.getElementById('to-do-list').innerHTML = listHTML;
  
  // Store the list items in local storage
  localStorage.setItem('toDoList', JSON.stringify(toDoList));
  
  // Make the list sortable
  $('#to-do-list').sortable({
    axis: 'y',
    update: function(event, ui) {
      const newIndex = ui.item.index();
      const oldIndex = ui.item.data('index');
      moveItem(oldIndex, newIndex);
    }
  });
}

// Function to edit an item in the list
function editItem(index) {
  const itemText = toDoList[index];
  const listItem = document.querySelector(`#to-do-list li[data-index="${index}"]`);
  const itemSpan = listItem.querySelector('span');
  itemSpan.innerHTML = ''; // Clear the existing text
  
  // Create a wrapper element
  const wrapper = document.createElement('div');
  wrapper.classList.add('wrapper');
  
  const editInput = document.createElement('textarea'); // Changed to textarea
  editInput.value = itemText;
  editInput.classList.add('editing', 'full-width'); // Add the 'full-width' class
  
  wrapper.appendChild(editInput);
  itemSpan.appendChild(wrapper);
  
  editInput.focus();
  
  editInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      const newItem = editInput.value.trim();
      toDoList[index] = newItem;
      updateList();
    }
  });
  
  editInput.addEventListener('blur', () => {
    updateList();
  });
}
// Function to delete an item from the list
function deleteItem(index) {
  toDoList.splice(index, 1);
  updateList();
}

// Function to rename the list
function renameList() {
  listName = localStorage.getItem('listName') || 'List';
  console.log('Before rename:', listName);
  const listNameSpan = document.getElementById('list-name');
  const listNameText = listNameSpan.textContent;
  listNameSpan.innerHTML = ''; // Clear the existing text
  const editInput = document.createElement('input');
  editInput.type = 'text';
  editInput.value = listNameText;
  listNameSpan.appendChild(editInput);
  editInput.focus();
  
  editInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      const newListName = editInput.value.trim();
      listName = newListName;
      console.log('After rename:', listName);
      document.getElementById('list-name').textContent = listName;
      localStorage.setItem('listName', listName);
    }
  });
  
  editInput.addEventListener('blur', () => {
    document.getElementById('list-name').textContent = listName;
    localStorage.setItem('listName', listName);
  });
}
// Function to reset the list
function resetList() {
  toDoList = [];
  updateList();
  localStorage.removeItem('toDoList');
}

// Load the list items from local storage when the page is loaded
document.addEventListener('DOMContentLoaded', function() {
  const storedList = localStorage.getItem('toDoList');
  if (storedList) {
    toDoList = JSON.parse(storedList);
    updateList();
  }

});