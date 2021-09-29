const input = document.querySelector("input");
const addBtn = document.querySelector(".btn-add");
const ul = document.querySelector("ul");
const empty = document.querySelector(".empty");

if (localStorage.getItem('task') != null) {
    getTask();
}

addBtn.addEventListener("click", (e) => {
    e.preventDefault();

    var a = 0;
    addTask(a);
})

function addTask(a) {
    const text = input.value;
    const li = document.createElement("li");
    const p = document.createElement("p");

    if (a != 0) {
            li.appendChild(p);
            li.appendChild(addDeleteBtn(a));
            ul.appendChild(li);
            p.textContent = a;
            empty.style.display = "none";
    } else {
        if ((text != "") && (text != " ")) {
            li.appendChild(p);
            li.appendChild(addDeleteBtn(text));
            ul.appendChild(li);
            input.value = "";
            p.textContent = text;
            empty.style.display = "none";
    
            guardarTask(text);
        }
    }
    
}

function addDeleteBtn(text) {
    const deleteBtn = document.createElement("button");

    deleteBtn.textContent = "X";
    deleteBtn.className = "btn-delete";

    deleteBtn.addEventListener("click", (e) => {
        const item = e.target.parentElement;
        ul.removeChild(item);

        borrarTask(text);

        const items = document.querySelectorAll("li");
        if (items.length == 0) {
            empty.style.display = "block";
        }
    })

    return deleteBtn;
}

function guardarTask(text) {

    const task = {
        text
    };
    let tasks;

    if (localStorage.getItem('task') === null) {
        tasks = [];
        tasks.push(task);
        localStorage.setItem('task', JSON.stringify(tasks));
    } else {
        let tasks = JSON.parse(localStorage.getItem('task'));
        tasks.push(task);
        localStorage.setItem('task', JSON.stringify(tasks));
    }
}

function borrarTask(text) {
    let tasks = JSON.parse(localStorage.getItem('task'));
    for (var i=0; i<tasks.length; i++) {
        if (tasks[i].text === text) {
            tasks.splice(i, 1);
        }
    }
    localStorage.setItem('task', JSON.stringify(tasks));
}

function getTask() {
    let tasks = JSON.parse(localStorage.getItem('task'));
    var text;

    for (var i=0; i<tasks.length; i++) {
        text = tasks[i].text;
        addTask(text);
    }
}