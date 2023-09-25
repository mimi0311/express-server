const express = require('express');
const tasksRouter = require('./tasks.js');
const jwt = require('jsonwebtoken');
const db = require('./db.js')
require('dotenv').config();

const app = express();

app.use(express.json());

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    const user = db.getUser(username, password);
    
    if (!user) {
        return res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
    }

    const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
});

app.use('/tasks', tasksRouter);

const port = 3000;
app.listen(port, () => {
    console.log(`Servidor Express escuchando en el puerto ${port}`);
});