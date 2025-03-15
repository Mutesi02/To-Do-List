document.addEventListener("DOMContentLoaded", loadTasks);

let taskInput = document.getElementById("taskInput");
const errorMessage = document.getElementById('error-message');

taskInput.addEventListener('focus', () => {
    errorMessage.style.visibility = 'hidden';
});

function addTask() {
    let taskText = taskInput.value.trim();

    if (taskText === '') {
        errorMessage.textContent = 'Task cannot be empty!';
        errorMessage.style.visibility = 'visible';
        return;
    }

    errorMessage.style.visibility = 'hidden';

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.unshift({ text: taskText, completed: false });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    taskInput.value = "";
    loadTasks();
}

function loadTasks() {
    let taskList = document.getElementById("taskList");
    taskList.innerHTML = "";
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach((task, index) => {
        let li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center";

        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        checkbox.className = "form-check-input ms-2";
        checkbox.onchange = () => toggleTask(index);

        let span = document.createElement("span");
        span.textContent = task.text;
        span.className = "task-text";

        // Removed the line to add 'completed' class to prevent strike-through
        // if (task.completed) {
        //     span.classList.add("completed");
        // }

        // Add 'Done' text next to checkbox if the task is completed
        let doneText = document.createElement("span");
        if (task.completed) {
            doneText.textContent = " Done";
            doneText.classList.add("text-success");
        }

        let btnContainer = document.createElement("div");

        let editButton = document.createElement("button");
        editButton.className = "btn btn-warning btn-edit";
        editButton.onclick = () => editTask(index);
        editButton.innerHTML = '<i class="ph ph-pencil"></i> Edit';

        let deleteButton = document.createElement("button");
        deleteButton.className = "btn btn-danger btn-delete";
        deleteButton.onclick = () => deleteTask(index);
        deleteButton.innerHTML = '<i class="ph ph-trash"></i> Delete';

        btnContainer.appendChild(editButton);
        btnContainer.appendChild(deleteButton);
        btnContainer.appendChild(checkbox);

        li.appendChild(span);
        li.appendChild(doneText);  // Add the "Done" text here
        li.appendChild(btnContainer);

        taskList.appendChild(li);
    });
}

function toggleTask(index) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
}

function deleteTask(index) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
}

function editTask(index) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let newText = prompt("Edit your task:", tasks[index].text);
    if (newText !== null && newText.trim() !== "") {
        tasks[index].text = newText.trim();
        localStorage.setItem("tasks", JSON.stringify(tasks));
        loadTasks();
    }
}