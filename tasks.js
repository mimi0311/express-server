const express = require('express');
const tasks = require('./db.js')
const middlewares = require('./middlewares.js')

const router = express.Router()

router.post('/', middlewares.verifyToken, middlewares.validateBody, (req, res) => {
    const newTask = req.body;
    tasks.addTask(newTask);
    res.status(201).json(newTask);
});

router.get('/', middlewares.verifyToken, (req, res) => {
    const completas = req.query["completas"]

    if (completas !== undefined) {
        if (completas === "true") {
            const completedTasks = tasks.getTasks(task => task.isCompleted);
            res.json(completedTasks);
        }
        else if (completas === "false") {
            const notCompletedTasks = tasks.getTasks(task => !task.isCompleted);
            res.json(notCompletedTasks);
        }
    }

    res.json(tasks.getTasks());
});

router.get('/:id', middlewares.verifyToken, (req, res) => {
    const taskId = req.params.id;

    const [task, index] = tasks.getTask(taskId);

    if (index === -1)
        return res.status(404).send("Tarea no encontrada");

    res.json(task);
})

router.put('/:id', middlewares.verifyToken, middlewares.validateBody, (req, res) => {
    const taskId = req.params.id;
    const updatedTask = req.body;

    const [, index] = tasks.getTask(taskId);

    if (index === -1)
        return res.status(404).send("Tarea no encontrada");

    tasks.setTask(index, updatedTask)

    res.json(updatedTask);
});

router.delete('/:id', middlewares.verifyToken, (req, res) => {
    const taskId = req.params.id;

    if (!tasks.removeTask(taskId)) {
        return res.status(404).send("Tarea no encontrada");
    }

    res.status(204).json({});
});

module.exports = router;