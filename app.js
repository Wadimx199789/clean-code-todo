const newTaskInput = document.getElementById("new-task");
const addTaskButton = document.querySelector(".task-row-wrapper button");
const incompleteTaskList = document.getElementById("incompleteTasks");
const completedTaskList = document.getElementById("completed-tasks");

const createTaskLabel = function (taskText) {
  const label = document.createElement("label");
  // innerText, not innerHTML: the task text must never be parsed as markup.
  label.innerText = taskText;
  label.className = "task";
  return label;
};

const createEditInput = function () {
  const editInput = document.createElement("input");
  editInput.type = "text";
  editInput.className = "task";
  return editInput;
};

const createEditButton = function () {
  const editButton = document.createElement("button");
  editButton.innerText = "Edit";
  editButton.className = "edit";
  return editButton;
};

const createDeleteButton = function () {
  const deleteButton = document.createElement("button");
  const deleteIcon = document.createElement("img");
  deleteButton.className = "delete";
  deleteIcon.src = "./remove.svg";
  deleteButton.appendChild(deleteIcon);
  return deleteButton;
};

const createTaskItem = function (taskText) {
  const taskItem = document.createElement("li");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";

  taskItem.append(
    checkbox,
    createTaskLabel(taskText),
    createEditInput(),
    createEditButton(),
    createDeleteButton(),
  );
  return taskItem;
};

const addTask = function () {
  if (!newTaskInput.value) return;
  const taskItem = createTaskItem(newTaskInput.value);

  incompleteTaskList.appendChild(taskItem);
  bindTaskEvents(taskItem, markTaskCompleted);

  newTaskInput.value = "";
};

const editTask = function () {
  const taskItem = this.parentNode;

  const editInput = taskItem.querySelector("input[type=text]");
  const label = taskItem.querySelector("label");
  const editButton = taskItem.querySelector(".edit");
  const isEditMode = taskItem.classList.contains("editMode");
  if (isEditMode) {
    label.innerText = editInput.value;
    editButton.innerText = "Edit";
  } else {
    editInput.value = label.innerText;
    editButton.innerText = "Save";
  }

  taskItem.classList.toggle("editMode");
};

const deleteTask = function () {
  const taskItem = this.parentNode;
  const taskList = taskItem.parentNode;
  taskList.removeChild(taskItem);
};

const markTaskCompleted = function () {
  const taskItem = this.parentNode;
  completedTaskList.appendChild(taskItem);
  bindTaskEvents(taskItem, markTaskIncomplete);
};

const markTaskIncomplete = function () {
  const taskItem = this.parentNode;
  incompleteTaskList.appendChild(taskItem);
  bindTaskEvents(taskItem, markTaskCompleted);
};

addTaskButton.addEventListener("click", addTask);

// Handlers are assigned with on* properties, not addEventListener: a task is
// rebound every time it moves between lists, and assignment replaces the old
// checkbox handler instead of stacking a second one.
const bindTaskEvents = function (taskItem, onCheckboxChange) {
  const checkbox = taskItem.querySelector("input[type=checkbox]");
  const editButton = taskItem.querySelector("button.edit");
  const deleteButton = taskItem.querySelector("button.delete");

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkbox.onchange = onCheckboxChange;
};

const bindTaskListEvents = function (taskList, onCheckboxChange) {
  for (const taskItem of taskList.children) {
    bindTaskEvents(taskItem, onCheckboxChange);
  }
};

bindTaskListEvents(incompleteTaskList, markTaskCompleted);
bindTaskListEvents(completedTaskList, markTaskIncomplete);
