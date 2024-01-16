//тема
const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;
const isDarkMode = localStorage.getItem('darkMode') === 'enabled';

if (isDarkMode) {
    body.classList.add('dark-mode');
    darkModeToggle.checked = true;
}
darkModeToggle.addEventListener('change', () => {
    if (darkModeToggle.checked) {
        body.classList.add('dark-mode');
        localStorage.setItem('darkMode', 'enabled');
    } else {
        body.classList.remove('dark-mode');
        localStorage.setItem('darkMode', 'disabled');
    }
});
//основа
const input = document.querySelector('#input')
const btn = document.querySelector('#btn')
const result = document.querySelector('#result')
const completed = document.querySelector('#completed')

document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
    console.log(localStorage)
});

btn.addEventListener('click', (e) =>{
    if(input.value === ''){
        alert('You can\'t add an empty task!')
        return
    }
    createDeleteElements(input.value)
    input.value = ''
})
function createDeleteElements(value) {
    const li = document.createElement('li');
    const btn = document.createElement('button');
    const check = document.createElement('input')

    li.className = 'li';
    li.textContent = value;

    check.type = 'checkbox';
    check.className ='isComplete'
    li.appendChild(check);

    btn.className = 'btn';
    btn.textContent = "delete";
    li.appendChild(btn);

    btn.addEventListener('click', e => {
        result.removeChild(li);
        saveTasks();
    });

    result.appendChild(li);
    saveTasks();
}


function saveTasks() {
    const tasks = Array.from(result.children).map((li) => {
        return {
            task: li.textContent,
        };
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const savedTasks = localStorage.getItem('tasks');

    if (savedTasks) {
        const tasks = JSON.parse(savedTasks);

        tasks.forEach((task) => {
            createDeleteElements(task.task);
        });
    }
}
