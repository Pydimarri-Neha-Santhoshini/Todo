let todoListElement = document.getElementById('todoList');
let todoList = loadTodoList();
let count = todoList.length;
let addButtonElement = document.getElementById('addButton');
let saveButtonElement = document.getElementById('saveButton');
saveButtonElement.onclick = function() {
    localStorage.setItem("todoList",JSON.stringify(todoList));
};
function loadTodoList() {
    let parsedTodoList = JSON.parse(localStorage.getItem("todoList"));
    if (parsedTodoList === null) {
        return [];
    }
    else{
        return parsedTodoList;
    }
}
addButtonElement.onclick = function() {
    // getting the value from the input field
    let todoInputElement = document.getElementById('todoInput');
    // if input is empty, do not add make a alert
    if (todoInputElement.value.trim() === "") {
        alert("Please enter valid text.");
        return;
    }
    // creating a new todo object
    let todo = {};
    todo.text = todoInputElement.value;
    todo.uniqueId = count++;
    todo.isChecked = false;
    // add to todoList and ul and make input empty
    todoList.push(todo);
    addTodoItem(todo);
    todoInputElement.value = "";
};

function deleteTodo(todoId){
    // delete the todo from the ul
    todoListElement.removeChild(document.getElementById(todoId));
    let index = todoList.findIndex(function(eachTodoObj){
        if(("todo"+eachTodoObj.uniqueId) === todoId) {
            return true;
        }
    });
    todoList.splice(index,1);
}

function toggleTodo(todo, labelId) {
    // toggle the checkbox and label style
    let labelElement = document.getElementById(labelId);
    labelElement.classList.toggle("todo-list-label-checked");
    if(todo.isChecked) {
        todo.isChecked = false;
    }
    else {
        todo.isChecked = true;
    }
}



function addTodoItem(todo) {
    let checkboxId = "checkbox" + todo.uniqueId;
    let labelId = "label" + todo.uniqueId;
    let todoId = "todo" + todo.uniqueId;

    // list item
    let listItemElement = document.createElement('li');
    listItemElement.id = todoId;
    listItemElement.classList.add("d-flex","flex-row");
    todoListElement.appendChild(listItemElement);

    // checkbox input
    let inputElement = document.createElement('input');
    inputElement.type="checkbox";
    inputElement.id=checkboxId;
    inputElement.classList.add("todo-list-checkbox");
    inputElement.checked = todo.isChecked;
    listItemElement.appendChild(inputElement);
    inputElement.onclick = function() {
        toggleTodo(todo,labelId);
    };

    // label
    let labelContainer = document.createElement('div');
    labelContainer.classList.add("d-flex","flex-row","todo-list-item");
    let labelElement = document.createElement('label');
    labelElement.classList.add("todo-list-label");
    labelElement.textContent = todo.text;
    labelElement.id=labelId;
    labelElement.setAttribute("for", checkboxId);
    if(todo.isChecked) {
        labelElement.classList.add("todo-list-label-checked");
    }
    labelContainer.appendChild(labelElement);

    // delete icon
    let iconContainer = document.createElement('div');
    iconContainer.classList.add("todo-list-delete");
    let iconElement = document.createElement('i');
    iconElement.classList.add("fa","fa-trash","fa-lg");
    iconElement.onclick = function() {
        deleteTodo(todoId);
    };
    iconContainer.appendChild(iconElement);

    // append container icon to label and label to list
    labelContainer.appendChild(iconContainer);
    listItemElement.appendChild(labelContainer);
}
for(let item of todoList) {
    addTodoItem(item);
}
