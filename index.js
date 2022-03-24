const appendBtn = document.querySelector('.add-button');
const taskInput = document.getElementById('task-description');
const tasksWrapper = document.querySelector('.tasks-wrapper');

let tasks;
!localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks'));

function Task(description) {
    this.description = description;
    this.completed = false;
};

const createTemplate = (task, index) => {
    return `
        <div class="task-item ${task.completed ? 'checked' : ''}">
            <div class="description">${task.description}</div>
            <div class="buttons">
                <input class="finish-btn" type="checkbox" ${task.completed ? 'checked' : ''}>
                <button class="delete-btn">Delete</button>
            </div>
        </div>
    `;
};

const fillHtmlList = () => {
    tasksWrapper.innerHTML = "";
    if (tasks.length > 0) {
        tasks.forEach(item, index => {
            tasksWrapper.innerHTML += createTemplate(item, index);
        });
    }
};

fillHtmlList();

const updateLocal = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

appendBtn.addEventListener('click', () => {
    tasks.push(new Task(taskInput.value));
    updateLocal();
});