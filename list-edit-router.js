const express = require('express');
const tasks = require('./db.js')

const router = express.Router();

// [
//     {
//         "Id": "123456",
//         "Iscompleted": True,
//         "Description": "Walk The Cat"
//     }
// ]
router.post('/create-task', (req, res) => {
    const newTask = req.body;
    tasks.addTask(newTask);
    res.json(newTask);
});

router.delete('/delete-task/:id', (req, res) => {
    const taskId = req.params.id;
    const index = tasks.getTasks().findIndex(task => task.id === taskId);
    if (index !== -1) {
        tasks.getTasks().splice(index, 1);
    }
    res.json({ message: 'Tarea eliminada con éxito' });
});

router.put('/update-task/:id', (req, res) => {
    const taskId = req.params.id;
    const updatedTask = req.body;
    const index = tasks.getTasks().findIndex(task => task.id === taskId);
    if (index !== -1) {
        tasks.getTasks()[index] = updatedTask;
    }
    res.json(updatedTask);
});

module.exports = router;