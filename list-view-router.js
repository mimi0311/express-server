const express = require('express');
const tasks = require('./db.js')

const router = express.Router()

router.get('/completed-tasks', (req, res) => {
    const completedTasks = tasks.getTasks().filter(task => task.isCompleted);
    res.json(completedTasks);
});

router.get('/incomplete-tasks', (req, res) => {
    const incompleteTasks = tasks.getTasks().filter(task => !task.isCompleted);
    res.json(incompleteTasks);
});

module.exports = router;