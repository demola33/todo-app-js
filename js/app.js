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
todoInput.addEventListener("input", updateValue);

// Functions
class Item {
  constructor(id, value, status) {
    this.id = id;
    this.value = value;
    this.status = status;
  }
}

function setDisable() {
  todoSubmit.disabled = true;
  addIcon.style.color = `#fff`;
}

function setEnable() {
  todoSubmit.disabled = false;
  addIcon.style.color = `#4D00D9`;
}

function updateValue(event) {
  const inputValue = event.target.value;
  console.log(inputValue === "");
  if (inputValue !== "") {
    setEnable();
  } else {
    setDisable();
  }
}

var itemStatus = ["new", "completed", "deleted"];
var id = 0;
var itemList = [];

function addTodo(event) {
  // Prevent form from submitting
  event.preventDefault();

  // Get the user input value
  const inputValue = todoInput.value;

  id++;
  var item = new Item(id, inputValue, itemStatus[0]);

  console.log(item);
  // Create Todo div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("header__todo");
  todoDiv.id = id;

  // Create Todo List item
  const newTodoItem = document.createElement("li");
  newTodoItem.innerText = inputValue;
  newTodoItem.classList.add("header__todo-item");
  todoDiv.appendChild(newTodoItem);

  // Create Completed Button
  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class="fa-solid fa-check"></i>';
  completedButton.classList.add("complete-btn");
  completedButton.classList.add("btn");
  completedButton.classList.add("btn-success");
  todoDiv.appendChild(completedButton);

  // Create Delete Button
  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
  deleteButton.classList.add("trash-btn");
  deleteButton.classList.add("btn");
  deleteButton.classList.add("btn-danger");
  todoDiv.appendChild(deleteButton);

  // Append Todo div to todoList
  todoList.appendChild(todoDiv);

  // Clear Todo Input Value
  todoInput.value = "";
}

function deleteCheck(event) {
  console.log(event);
  const item = event.target;

  // On Delete
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    todo.remove();
  }

  // On Completed
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    console.log(todo.id);
    todo.classList.toggle("completed");
  }
}
