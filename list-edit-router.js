const express = require('express');
const tasks = require('./db.js')

const router = express.Router();

const validAttributes = {
    "id": "string",
    "isCompleted": "boolean",
    "description": "string",
}

function middleware(req, res, next) {
    if (JSON.stringify(req.body) === "{}")
        return res.status(400).send("Body vacio")
    
    for (key in req.body) {
        if (!Object.keys(validAttributes).includes(key)) 
            return res.status(400).send(`Atributo ${key} no válido`)

        if (typeof req.body[key] !== validAttributes[key])
            return res.status(400).send(`Tipo de dato de ${key} no válido (recibido: ${typeof req.body[key]}, esperado: ${validAttributes[key]})`)
    }

    if (JSON.stringify(Object.keys(req.body).sort()) !== JSON.stringify(Object.keys(validAttributes).sort()))
        return res.status(400).send("Llaves no válidas")

    next()
}

// [
//     {
//         "Id": "123456",
//         "Iscompleted": True,
//         "Description": "Walk The Cat"
//     }
// ]
router.post('/create-task', middleware, (req, res) => {
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

router.put('/update-task/:id', middleware, (req, res) => {
    const taskId = req.params.id;
    const updatedTask = req.body;
    const index = tasks.getTasks().findIndex(task => task.id === taskId);
    if (index !== -1) {
        tasks.getTasks()[index] = updatedTask;
    }
    res.json(updatedTask);
});

module.exports = router;