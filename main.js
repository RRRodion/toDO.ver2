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
const input = document.querySelector('#input')
const btn = document.querySelector('#btn')
const result = document.querySelector('#result')

document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
    console.log(localStorage)
});

btn.addEventListener('click', (e) => {
    if (input.value === '') {
        alert('You can\'t add an empty task!')
        return
    }

    const taskAlreadyExists = checkTaskExists(input.value);
    if (taskAlreadyExists) {
        alert('Task already exists!');
        return;
    }
    createDeleteElements(input.value)
    input.value = ''
})

function checkTaskExists(task) {
    const savedTasks = localStorage.getItem('tasks');

    if (savedTasks) {
        const tasks = JSON.parse(savedTasks);
        return tasks.some((savedTask) => savedTask.task === task);
    }

    return false;
}

function createDeleteElements(value, isCompleted) {
    const li = document.createElement('li');
    const span = document.createElement('span');
    const btn = document.createElement('button');
    const check = document.createElement('input');

    li.className = 'li';
    span.textContent = value;
    li.appendChild(span);

    check.type = 'checkbox';
    check.className = 'isComplete';
    check.checked = isCompleted; // Устанавливаем значение флага isCompleted
    li.appendChild(check);

    btn.className = 'btn';
    btn.textContent = 'delete';

    li.append(btn);

    check.addEventListener('change', (e) => {
        const li = e.target.closest('.li');
        const taskText = li.querySelector('span').textContent;
        const isChecked = e.target.checked;

        updateTaskCompletion(taskText, isChecked);
    });


    btn.addEventListener('click', (e) => {
        let confirm1 = confirm('Do you really want to delete this task?');
        if (confirm1) {
            result.removeChild(li);
        } else {
            return;
        }
        saveTasks();
    });

    result.appendChild(li);
    saveTasks();
}

function updateTaskCompletion(taskText, isChecked) {
    const tasks = Array.from(result.children).map((li) => {
        return {
            task: li.querySelector('span').textContent,
            isCompleted: li.querySelector('.isComplete').checked
        };
    });

    const updatedTasks = tasks.map((task) => {
        if (task.task === taskText) {
            return {
                task: taskText,
                isCompleted: isChecked
            };
        }
        return task;
    });

    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
}

function saveTasks() {
    const tasks = Array.from(result.children).map((li) => {
        return {
            task: li.querySelector('span').textContent,
            isCompleted: li.querySelector('.isComplete').checked // Сохранение значения флага isCompleted
        };
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const savedTasks = localStorage.getItem('tasks');

    if (savedTasks) {
        try {
            const tasks = JSON.parse(savedTasks);

            tasks.forEach((task) => {
                createDeleteElements(task.task, task.isCompleted);
            });

            // Если нет сохраненных задач
            if (tasks.length === 0) {
                result.innerHTML = 'No tasks';
            }
        } catch (error) {
            console.error('Ошибка при парсинге JSON:', error);
        }
    } else {
        // Если нет сохраненных задач
        result.innerHTML = 'No tasks';
    }
}












const savedTasks = localStorage.getItem('tasks');

if (savedTasks === '[]') {
    result.innerHTML = 'No tasks';
}
