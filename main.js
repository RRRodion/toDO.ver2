//тема
const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;
const themeIcon = document.getElementById('themeIcon');
const isDarkMode = localStorage.getItem('theme') === 'dark';

if (isDarkMode) {
    body.classList.add('dark-mode');
    darkModeToggle.checked = true;
    themeIcon.classList.add('bxs-moon');
} else {
    themeIcon.classList.add('bxs-sun');
}

darkModeToggle.addEventListener('change', () => {
    if (darkModeToggle.checked) {
        body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
        themeIcon.classList.add('bxs-moon');
        themeIcon.classList.remove('bxs-sun');
    } else {
        body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
        themeIcon.classList.remove('bxs-moon');
        themeIcon.classList.add('bxs-sun');
    }
});


//основа
const input = document.querySelector('#input');
const btn = document.querySelector('#btn');
const result = document.querySelector('#result');
const completed = document.querySelector('#completed');

document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
});

btn.addEventListener('click', (e) => {
    if (input.value === '') {
        alert('You can\'t add an empty task!');
        return;
    }

    const taskAlreadyExists = checkTaskExists(input.value);
    if (taskAlreadyExists) {
        alert('Task already exists!');
        return;
    }
    createDeleteElements(input.value);
    input.value = '';
});

function checkTaskExists(task) {
    const tasks = loadTasksFromLocalStorage();

    if (tasks) {
        return tasks.some((savedTask) => savedTask.task === task);
    }

    return false;
}

function createDeleteElements(value, isCompleted) {
    const li = document.createElement('li');
    const div = document.createElement('div');
    const btn = document.createElement('button');
    const check = document.createElement('input');

    li.className = 'li';
    div.textContent = value;
    li.appendChild(div);

    check.type = 'checkbox';
    check.className = 'isComplete';
    check.checked = isCompleted;
    li.appendChild(check);

    btn.className = 'btn';
    btn.textContent = 'delete';

    li.append(btn);

    check.addEventListener('change', (e) => {
        const li = e.target.closest('.li');
        const isChecked = e.target.checked;

        if (isChecked) {
            completed.appendChild(li);
        } else {
            result.appendChild(li);
        }

        saveTasks();
        ifNoTasks();
    });

    btn.addEventListener('click', (e) => {
        let confirm1 = confirm('Do you really want to delete this task?');
        if (confirm1) {
            const isCompleted = completed.contains(li);
            if (isCompleted) {
                completed.removeChild(li);
            } else {
                result.removeChild(li);
            }

            saveTasks();
            ifNoTasks();
        }
    });

    if (isCompleted) {
        completed.appendChild(li);
    } else {
        result.appendChild(li);
    }

    saveTasks();
    ifNoTasks();
}

function ifNoTasks() {
    const noTasksTitle = document.querySelector('.text');
    const noCompletedTasksTitle = document.querySelector('.text2');

    const tasksArray = loadTasksFromLocalStorage();

    const isNotCompletedTaskExists = tasksArray.some(function(task) {
        return task.isCompleted === false;
    });
    if (isNotCompletedTaskExists) {
        noTasksTitle.style.display = 'none';
    } else {
        noTasksTitle.style.display = 'block';
    }

    const isCompletedTaskExists = tasksArray.some(function(task) {
        return task.isCompleted === true;
    });
    if (isCompletedTaskExists) {
        noCompletedTasksTitle.style.display = 'none';
    } else {
        noCompletedTasksTitle.style.display = 'block';
    }
}

function loadTasksFromLocalStorage() {
    try {
        const savedTasks = localStorage.getItem('tasks');
        return savedTasks ? JSON.parse(savedTasks) : [];
    } catch (error) {
        console.error('Error loading tasks from localStorage:', error);
        return [];
    }
}

function loadTasks() {
        const tasks = loadTasksFromLocalStorage();

        tasks.forEach((task) => {
            createDeleteElements(task.task, task.isCompleted);
        });

        ifNoTasks();
}

function saveTasks() {
    const tasks = Array.from(result.children).map((li) => {
        return {
            task: li.querySelector('div').textContent,
            isCompleted: li.querySelector('.isComplete').checked
        };
    });

    const completedTasks = Array.from(completed.children).map((li) => {
        return {
            task: li.querySelector('div').textContent,
            isCompleted: li.querySelector('.isComplete').checked
        };
    });

    localStorage.setItem('tasks', JSON.stringify(tasks.concat(completedTasks)));
}