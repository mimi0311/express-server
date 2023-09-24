const tasks = [
    {
        id: '123456',
        isCompleted: false,
        description: 'Walk the dog',
    }
];

function addTask(task) {
    tasks.push(task)
}

function getTasks() {
    return tasks
}

module.exports = { addTask, getTasks }