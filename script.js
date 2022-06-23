const form = document.getElementById("form");
const listParent = document.getElementById("list");
const inputForm = document.getElementById("inputForm");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    addTask();
});

//*agregar las tareas
const addTask = () => {
    if (inputForm.value === "") {
        alert("este campo no puede estar vacío!"); 
        return false;
    }

    localStorage.setItem(
        "todos", 
        JSON.stringify([
            
            ...JSON.parse(localStorage.getItem("todos") || "[]"), 
            {
                todos: inputForm.value,
                completed: false,
            },
        ])
    );

    const list = document.createElement("li");
    list.innerHTML = `
        <input type="checkbox" onclick="todoComplete(this)" class="check">
        <input type="text" value="${inputForm.value}" onfocus="getCurrentTodo(this)" onblur="editTodo(this)">
        <i class="fa fa-trash" onclick="removeTodo(this)"></i>
    `;
    listParent.insertBefore(list, listParent.children[0]);
    inputForm.value = ""; 
};

//*traer las tareas
const loadTasks = () => {
    if (localStorage.getItem("todos") == null) return; 

    let todos = Array.from(JSON.parse(localStorage.getItem("todos"))); 

    todos.forEach(todo => {
        const list = document.createElement("li");
        list.innerHTML = `
            <input type="checkbox" onclick="todoComplete(this)" class="check ${
                todo.completed ? "checked" : ""
            }">
            <input type="text" value="${
                todo.todos
            }" onfocus="getCurrentTodo(this)" onblur="editTodo(this)">
            <i class="fa fa-trash" onclick="removeTodo(this)"></i>
        `;
        listParent.insertBefore(list, listParent.children[0]);
    });
};

const todoComplete = (e) => {
    let todos = Array.from(JSON.parse(localStorage.getItem("todos")));

    todos.forEach(todo => {
        if (todo.todos === e.nextElementSibling.value) {
            todo.completed = !todo.completed; 
        }

        localStorage.setItem("todos", JSON.stringify(todos)); 
        e.nextElementSibling.classList.toggle("completed"); 
    });
};

const removeTodo = (e) => {
    let todos = Array.from(JSON.parse(localStorage.getItem("todos")));

    todos.forEach(todo => {
        if (todo.todos === e.parentNode.children[1].value) {
            todos.splice(todos.indexOf(todo), 1); 
        }
        localStorage.setItem("todos", JSON.stringify(todos));
        e.parentNode.remove(); 
    });
};

const editTodo = (e) => {
    let todos = Array.from(JSON.parse(localStorage.getItem("todos")));

    if (e.value === "") {
        alert("Este campo no puede estar vacío"); 
        e.value = currentValue; 
        return;
    } 

    
    todos.forEach(todo => {
        if (todo.todos === currentValue) {
            //
            todo.todos = e.value;
        }
    });
    localStorage.setItem("todos", JSON.stringify(todos)); 
};



let currentValue = null; 

const getCurrentTodo = (e) => {
    currentValue = e.value;
};

window.onload = loadTasks;

