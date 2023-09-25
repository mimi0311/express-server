const jwt = require('jsonwebtoken');
require('dotenv').config();

const validAttributes = {
    "id": "string",
    "isCompleted": "boolean",
    "description": "string",
}

function validateBody(req, res, next) {
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

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    
    if (!authHeader) {
        return res.status(403).json({ error: 'Se requiere token de autorización' });
    }

    const tokenParts = authHeader.split(' ');

    if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
        return res.status(403).json({ error: 'Formato de token inválido' });
    }

    const token = tokenParts[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Token inválido' });
        }

        req.user = decoded;
        next();
    });
};

module.exports = {validateBody, verifyToken}