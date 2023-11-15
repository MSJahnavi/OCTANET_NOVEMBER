var taskInput = document.getElementById("new-task");
var deadlineInput = document.getElementById("deadline");
var lowPriorityCheckbox = document.getElementById("low");
var mediumPriorityCheckbox = document.getElementById("medium");
var highPriorityCheckbox = document.getElementById("high");
var labelInput = document.getElementById("label");
var addButton = document.querySelector("button");
var incompleteTasksHolder = document.getElementById("incomplete-tasks");
var completedTasksHolder = document.getElementById("completed-tasks");

function createTaskElement(taskString, deadline, priority, label) {
    var listItem = document.createElement("li");
    var checkBox = document.createElement("input");
    var labelElement = document.createElement("label");
    var editInput = document.createElement("input");
    var editButton = document.createElement("button");
    var deleteButton = document.createElement("button");
    var detailsParagraph = document.createElement("p");

    checkBox.type = "checkbox";
    editInput.type = "text";
    editButton.textContent = "Edit";
    editButton.className = "edit";
    deleteButton.textContent = "Delete";
    deleteButton.className = "delete";

    labelElement.textContent = taskString;
    detailsParagraph.innerHTML = `Deadline: ${deadline}<br>Priority: ${priority}<br>Label: ${label}`;

    listItem.appendChild(checkBox);
    listItem.appendChild(labelElement);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    listItem.appendChild(detailsParagraph);

    return listItem;
}

function addTask() {
    var taskString = taskInput.value.trim();
    var deadline = deadlineInput.value;
    var priority = getPriority();
    var label = labelInput.value;

    if (!taskString) {
        alert("Please enter a task");
        return;
    }

    var listItem = createTaskElement(taskString, deadline, priority, label);
    incompleteTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);

    taskInput.value = "";
    deadlineInput.value = "";
    clearPriorityCheckboxes();
    labelInput.value = "";
}

function getPriority() {
    var priority = [];
    if (lowPriorityCheckbox.checked) {
        priority.push("Low");
    }
    if (mediumPriorityCheckbox.checked) {
        priority.push("Medium");
    }
    if (highPriorityCheckbox.checked) {
        priority.push("High");
    }
    return priority.join(', ');
}

function clearPriorityCheckboxes() {
    lowPriorityCheckbox.checked = false;
    mediumPriorityCheckbox.checked = false;
    highPriorityCheckbox.checked = false;
}

function editTask() {
    var listItem = this.parentNode;
    var editInput = listItem.querySelector("input[type=text]");
    var label = listItem.querySelector("label");
    var containsClass = listItem.classList.contains("editMode");

    if (containsClass) {
        label.textContent = editInput.value;
    } else {
        editInput.value = label.textContent;
    }

    listItem.classList.toggle("editMode");
}

function deleteTask() {
    var listItem = this.parentNode;
    var ul = listItem.parentNode;
    ul.removeChild(listItem);
}

function taskCompleted() {
    var listItem = this.parentNode;
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
}

function taskIncomplete() {
    var listItem = this.parentNode;
    incompleteTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
}

function bindTaskEvents(taskListItem, checkBoxEventHandler) {
    var checkBox = taskListItem.querySelector("input[type=checkbox]");
    var editButton = taskListItem.querySelector("button.edit");
    var deleteButton = taskListItem.querySelector("button.delete");

    editButton.onclick = editTask;
    deleteButton.onclick = deleteTask;
    checkBox.onchange = checkBoxEventHandler;
}

addButton.addEventListener("click", addTask);

// Initial binding for existing tasks
for (var i = 0; i < incompleteTasksHolder.children.length; i++) {
    bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
}

for (var i = 0; i < completedTasksHolder.children.length; i++) {
    bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}
