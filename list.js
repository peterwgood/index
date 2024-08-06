// Initialize the to-do list and list name
let toDoList = JSON.parse(localStorage.getItem('toDoList')) || [];
let listName = localStorage.getItem('listName') || 'List';

// Add event listeners
$('#add-item').on('click', addItem);
$('#new-item').on('keypress', function(event) {
  if (event.key === 'Enter') {
    addItem();
  }
});

$(document).ready(function() {
  $('#list-name').text(listName);
  $('#rename-list').on('click', renameList);
  updateList();
});

// Function to add a new item to the list
function addItem() {
  const newItem = $('#new-item').val().trim();
  if (newItem !== '') {
    toDoList.push(newItem);
    updateList();
    $('#new-item').val('');
  }
}

// Function to update the list HTML
function updateList() {
  const listHTML = toDoList.map((item, index) => {
    let itemHTML = item.replace(/\n/g, '<br>');
    return `<li class="list-group-item" data-index="${index}"><span>${itemHTML}</span></li>`;
  }).join('');
  
  $('#to-do-list').html(listHTML);
  localStorage.setItem('toDoList', JSON.stringify(toDoList));
  
  $('#to-do-list').sortable({
    axis: 'y',
    update: function(event, ui) {
      const newIndex = ui.item.index();
      const oldIndex = ui.item.data('index');
      moveItem(oldIndex, newIndex);
    }
  });
  
  $('#to-do-list li').on('click', function() {
    const index = $(this).data('index');
    editItem(index);
  });
}

// Function to edit an item in the list
function editItem(index) {
  const itemText = toDoList[index];
  const listItem = $(`#to-do-list li[data-index="${index}"]`);
  const itemSpan = listItem.find('span');
  itemSpan.html(''); // Clear the existing text
  
  const editInput = $('<textarea>').val(itemText).addClass('editing full-width');
  itemSpan.append(editInput);
  
  editInput.focus();
  
  editInput.on('keypress', function(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
      const newItem = $(this).val().trim();
      if (newItem === '') {
        deleteItem(index);
      } else {
        toDoList[index] = newItem;
        updateList();
      }
    }
  });
  
  editInput.on('blur', function() {
    const newItem = $(this).val().trim();
    if (newItem === '') {
      deleteItem(index);
    } else {
      toDoList[index] = newItem;
      updateList();
    }
  });
}

// Function to delete an item from the list
function deleteItem(index) {
  toDoList.splice(index, 1);
  updateList();
}

$(document).ready(function() {
  $('#list-name').text(listName);
  $('#list-name').on('click', renameList); // Bind renameList to #list-name
  updateList();
});


// Function to rename the list
function renameList() {
  const listNameSpan = $('#list-name');
  const listNameText = listNameSpan.text();
  listNameSpan.html(''); // Clear the existing text
  const editInput = $('<input type="text">').val(listNameText);
  listNameSpan.append(editInput);
  editInput.focus();
  
  editInput.on('keypress', function(event) {
    if (event.key === 'Enter') {
      const newListName = $(this).val().trim();
      listName = newListName;
      listNameSpan.text(listName);
      localStorage.setItem('listName', listName);
      $(this).remove();
    }
  });
  
  editInput.on('blur', function() {
    const newListName = $(this).val().trim();
    listName = newListName;
    listNameSpan.text(listName);
    localStorage.setItem('listName', listName);
    $(this).remove();
  });
}

function resetList() {
toDoList = [];
updateList();
localStorage.removeItem('toDoList');
}

// Function to move an item in the list
function moveItem(oldIndex, newIndex) {
  toDoList.splice(newIndex, 0, toDoList.splice(oldIndex, 1)[0]);
  updateList();
}