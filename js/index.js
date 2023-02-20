// Declare varaible

let toDoList = [];
let newTask;

let inputText = document.querySelector(".input-text");
let inputSubmit = document.querySelector(".input-submit");
let listBox = document.querySelector(".list-box");
let checkbox = document.querySelector(".checkbox");
let taskLength = document.querySelector(".task-length");
let completedTask = document.querySelector(".completed-task");
let unCompletedTask = document.querySelector(".uncomepleted-task");
let allTask = document.querySelector(".all-task");
let clearCompleted = document.querySelector(".clear-completed");
let CompletedAllTask = document.querySelector(".complete-all-task");
let taskFilter = document.querySelector(".task-filter");
let emptyBox = document.querySelector(".empty-box");

initializeTask();

//Add task to Todo List
inputSubmit.addEventListener("click", () => {
  // Create task objects
  if (inputText.value == "") {
    return;
  }
  newTask = {
    id: Date.now().toString(),
    task: inputText.value,
    status: false,
  };
  toDoList.push(newTask);
  updateLocalStorage();

  display();
});

//Display tasks in Todo List
function renderList(tasks) {
  let listItems = document.createElement("div");
  listItems.setAttribute("class", "list-items");
  listItems.innerHTML = `<input type="checkbox" class="checkbox" id=${
    tasks.id
  } ${tasks.status ? "checked" : ""} >
  <p class="list-text ${tasks.status ? "strike" : ""}" >${tasks.task}</p>
  <button class="delete-button" data-id=${
    tasks.id
  }><i class="fa-solid fa-circle-xmark delete-icon" data-id=${
    tasks.id
  }></i></button>
`;
  listBox.append(listItems);
}

//Initialize ToDo localStorage
function initializeTask() {
  let todos = JSON.parse(localStorage.getItem("toDo"));
  toDoList = todos || [];

  display();
}

//Remove Todo LocalStorage
function removeLocalStorage() {
  localStorage.removeItem("toDo");
}

//Update ToDo localStorage
function updateLocalStorage() {
  localStorage.setItem("toDo", JSON.stringify(toDoList));
}

function display() {
  checkEmptyToDo();
  for (let i = 0; i < toDoList.length; i++) {
    renderList(toDoList[i]);
  }
  taskLength.innerHTML = toDoList.length + " ";
}

//Delete Tasks from List
function deleteTask(taskId) {
  let newToDoList = toDoList.filter(function (task) {
    return task.id != taskId;
  });
  toDoList = newToDoList;
  updateLocalStorage();
  display();
}

//Toggle completion of task
function toggleTask(taskId) {
  let task = toDoList.filter(function (taskArray) {
    return taskArray.id == taskId;
  });
  if (task.length > 0) {
    const currentTask = task[0];
    currentTask.status = !currentTask.status;

    display();
    return;
  }
}

//All tasks
allTask.addEventListener("click", (e) => {
  e.preventDefault();

  display();
});

//compleated task
completedTask.addEventListener("click", (e) => {
  e.preventDefault();
  let compTask = toDoList.filter(function (ctasks) {
    return ctasks.status == true;
  });

  let tempToDoList = toDoList;
  toDoList = compTask;

  display();
  toDoList = tempToDoList;
});

//Uncompleted task
unCompletedTask.addEventListener("click", (e) => {
  e.preventDefault();
  let unCompTask = toDoList.filter(function (ctasks) {
    return ctasks.status != true;
  });

  let tempToDoList = toDoList;
  toDoList = unCompTask;

  display();
  toDoList = tempToDoList;
});

//Complete All Tasks
CompletedAllTask.addEventListener("click", () => {
  toDoList.map((task) => {
    if (task.status == false) {
      task.status = true;
    }
    return task;
  });

  display();
});

//Clear completed Tasks
clearCompleted.addEventListener("click", () => {
  toDoList = [];
  removeLocalStorage();
  display();
});

//Toggle task list
let btn = taskFilter.querySelectorAll(".btn");
for (var i = 0; i < btn.length; i++) {
  btn[i].addEventListener("click", function () {
    var current = document.getElementsByClassName("active");
    console.log(current);
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}

//Check if ToDo List is Empty
function checkEmptyToDo() {
  if (toDoList.length == 0) {
    listBox.innerHTML = "";
    listBox.append(emptyBox);
  } else {
    if (listBox.contains(emptyBox)) {
      listBox.removeChild(emptyBox);
    }
    listBox.innerHTML = "";
  }
}
//Handle Listener
function handleListener(e) {
  if (e.target.className == "fa-solid fa-circle-xmark delete-icon") {
    let taskId = e.target.getAttribute("data-id");
    deleteTask(taskId);
  } else if (e.target.className == "checkbox") {
    let taskId = e.target.getAttribute("id");
    toggleTask(taskId);
  }
}
document.addEventListener("click", handleListener);
