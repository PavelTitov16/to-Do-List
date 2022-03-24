const appendBtn = document.querySelector('.add-button');
const taskInput = document.getElementById('task-description');
const tasksWrapper = document.querySelector('.tasks-wrapper');

let tasks = [];
!localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks'));

function Task(description) {
    this.description = description;
    this.completed = false;
}

const updateLocal = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

appendBtn.addEventListener('click', () => {
    tasks.push(new Task(taskInput.value));
    updateLocal();
});