const tasks = [
    {
        id: '123456',
        isCompleted: false,
        description: 'Walk the dog',
    }
];

const users = [
    { username: 'user1', password: 'password1' },
    { username: 'user2', password: 'password2' }
];

function getTasks(filterFunc = null) {
    if (filterFunc != null) {
        return tasks.filter(filterFunc);
    }

    return tasks
}

function addTask(task) {
    tasks.push(task)
}

function setTask(index, newTask) {
    tasks[index] = newTask
}

function getTask(taskId) {
    index = tasks.findIndex(task => task.id === taskId)

    return index === -1? [null, -1]: [tasks[index], index]
}

function removeTask(taskId) {
    const index = tasks.findIndex(task => task.id === taskId);
    if (index !== -1) {
        tasks.splice(index, 1);

        return true;
    }

    return false;
}

function getUser(username, password) {
    return users.find(u => u.username === username && u.password === password);
}

module.exports = { getTasks, addTask, setTask, getTask, removeTask, getUser }