// Selectors

const todoInput = document.querySelector(".header__todo-input");
const todoSubmit = document.querySelector(".header__todo-submit");
const todoList = document.querySelector(".header__todo-list");
const addIcon = document.querySelector(".fa-plus");

// Disable Input field
setDisable();

// EventListeners
todoSubmit.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
todoList.addEventListener("click", completeCheck);
todoInput.addEventListener("input", updateValue);

// Class

class Item {
  constructor(id, value, status) {
    this.id = id;
    this.value = value;
    this.status = status;
  }
}

// Functions

function setDisable() {
  todoSubmit.disabled = true;
  addIcon.classList.remove("enabled-icon");
}

function setEnable() {
  todoSubmit.disabled = false;
  addIcon.classList.add("enabled-icon");
  todoSubmit.classList.add("enabled-button");
}

function updateValue(event) {
  const inputValue = event.target.value;
  if (inputValue !== "") {
    setEnable();
  } else {
    setDisable();
  }
}

function onFocus_out() {
  todoSubmit.classList.remove("enabled-button");
}
function onFocus_in() {
  todoSubmit.classList.add("enabled-button");
}

var itemStatus = ["in-progress", "done", "deleted"];
var id = 0;
var itemList = [];

function addTodo(event) {
  // Prevent form from submitting
  event.preventDefault();

  // Get the user input value
  const inputValue = todoInput.value;

  // Create new Item instance
  id++;
  var item = new Item(id, inputValue, itemStatus[0]);
  itemList.push(item);

  // Create an <li> to represent the todo item.
  const todoListItem = document.createElement("li");
  todoListItem.classList.add("header__todo");
  todoListItem.id = id;

  // Create a <p> to represent the todo item text.
  const todoText = document.createElement("p");
  todoText.innerText = inputValue;
  todoText.classList.add("header__todo-text");
  todoListItem.appendChild(todoText);

  // Create Completed Button
  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class="fa-solid fa-check"></i>';
  completedButton.classList.add("complete-btn");
  completedButton.classList.add("btn");
  completedButton.classList.add("btn-success");
  todoListItem.appendChild(completedButton);

  // Create Delete Button
  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
  deleteButton.classList.add("trash-btn");
  deleteButton.classList.add("btn");
  deleteButton.classList.add("btn-danger");
  todoListItem.appendChild(deleteButton);

  // Append Todo todo item to todoList
  todoList.appendChild(todoListItem);

  // Clear Todo Input Value
  todoInput.value = "";
  setDisable();
}

function deleteCheck(event) {
  const element = event.target;

  // On Delete
  if (element.classList[0] === "trash-btn") {
    const todo = element.parentElement;
    const todoId = todo.id;
    const item = itemList[todoId - 1];
    item.status = itemStatus[2];

    // Animation
    todo.classList.add("fall");
    todo.addEventListener("transitionend", (e) => {
      if (e.propertyName === "transform") {
        todo.remove();
      }
    });
  }
}

function completeCheck(event) {
  const element = event.target;

  // On Completed
  if (element.classList[0] === "complete-btn") {
    const todo = element.parentElement;
    const todoId = todo.id;
    const item = itemList[todoId - 1];
    const status = item.status;
    if (status === "in-progress") {
      item.status = itemStatus[1];
    } else {
      item.status = itemStatus[0];
    }
    todo.classList.toggle("completed");
  }
}
