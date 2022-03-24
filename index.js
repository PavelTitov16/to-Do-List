const appendBtn = document.getElementById('add-button');
const taskInput = document.getElementById('task-description');
const tasksWrapper = document.querySelector('.tasks-wrapper');

let tasks;
!localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks'));

let taskItems = [];

function Task(description) {
    this.description = description;
    this.completed = false;
};

const createTemplate = (task, index) => {
    return `
        <div class="task-item ${task.completed ? 'checked' : ''}">
            <div class="description">${task.description}</div>
            <div class="buttons">
                <input onclick="finishTask(${index})" class="finish-btn" type="checkbox" ${task.completed ? 'checked' : ''}>
                <button onclick="deleteTask(${index})" class="delete-btn">Delete</button>
            </div>
        </div>
    `
};

const filterTasks = () => {
    const activeTasks = tasks.length && tasks.filter(item => item.completed == false);
    const finishedTasks = tasks.length && tasks.filter(item => item.completed == true);
    tasks = [...activeTasks,...finishedTasks];
}

const fillHtmlList = () => {
    tasksWrapper.innerHTML = "";
    if (tasks.length > 0) {
        filterTasks();
        tasks.forEach((item, index) => {
            tasksWrapper.innerHTML += createTemplate(item, index);
        });
        taskItems = document.querySelectorAll('.task-item');
    }
};

fillHtmlList();

const updateLocal = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

const finishTask = (index) => {
    tasks[index].completed = !tasks[index].completed;
    if (tasks[index].completed) {
        taskItems[index].classList.add('checked');
    } else {
        taskItems[index].classList.remove('checked');
    }
    updateLocal();
    fillHtmlList();
};

appendBtn.addEventListener('click', () => {
    tasks.push(new Task(taskInput.value));
    updateLocal();
    fillHtmlList();
    taskInput.value = '';
});

const deleteTask = (index) => {
    taskItems[index].classList.add('delition');
    setTimeout(() => {
        tasks.splice(index, 1);
        updateLocal();
        fillHtmlList();
    }, 500);
};