// script.js

// Function to load tasks from localStorage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const listContainer = document.getElementById('list-container');
    
    tasks.forEach(task => {
        addTaskToDOM(task.text, task.checked);
    });
}

// Function to add a task to the DOM
function addTaskToDOM(taskText, isChecked) {
    const listContainer = document.getElementById('list-container');
    const listItem = document.createElement('li');

    // Set the text and checked status
    listItem.textContent = taskText;
    if (isChecked) {
        listItem.classList.add('checked');
    }

    // Add a click event to toggle completed status
    listItem.addEventListener('click', function() {
        listItem.classList.toggle('checked');
        updateLocalStorage();
    });

    // Create a delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'delete-btn';
    deleteButton.addEventListener('click', function() {
        listContainer.removeChild(listItem);
        updateLocalStorage();
    });

    // Append the delete button to the list item
    listItem.appendChild(deleteButton);

    // Append the new list item to the list container
    listContainer.appendChild(listItem);
}

// Function to update localStorage with current tasks
function updateLocalStorage() {
    const listContainer = document.getElementById('list-container');
    const tasks = Array.from(listContainer.children).map(item => ({
        text: item.childNodes[0].textContent.trim(),
        checked: item.classList.contains('checked')
    }));
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to add a task
function AddTask() {
    const inputBox = document.getElementById('input-box');
    const taskText = inputBox.value.trim();

    if (taskText !== "") {
        addTaskToDOM(taskText, false);
        inputBox.value = ''; // Clear the input box
        updateLocalStorage(); // Update localStorage
    } else {
        alert('Please enter a task.');
    }
}

// Load tasks when the page is loaded
document.addEventListener('DOMContentLoaded', loadTasks);
