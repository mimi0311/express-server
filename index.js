const express = require('express');

const listViewRouter = require('./list-view-router');
const listEditRouter = require('./list-edit-router');

const tasks = require('./db.js')

const app = express();

app.use(express.json());
app.use((req, res, next) => {
    if (!["GET", "POST", "PUT", "PATCH", "DELETE"].includes(req.method))
        return res.status(400).send(`Método ${req.method} inválido`)

    next()
})

app.get('/tasks', (req, res) => {
    res.json(tasks.getTasks());
});

app.use('/list-view', listViewRouter)
app.use('/list-edit', listEditRouter)

const port = 3000;
app.listen(port, () => {
    console.log(`Servidor Express escuchando en el puerto ${port}`);
});