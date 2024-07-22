const express = require('express');
const path = require('path');
const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para el login (simulada)
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username === 'admin' && password === 'admin') {
        res.status(200).send('Login exitoso');
    } else {
        res.status(401).send('Usuario o contraseña incorrecta');
    }
});

// Ruta para el inventario (simulada)
app.get('/inventory', (req, res) => {
    const inventory = [
        { name: 'Item 1', quantity: 10 },
        { name: 'Item 2', quantity: 5 },
        { name: 'Item 3', quantity: 15 }
    ];
    res.json(inventory);
});

// Iniciar el servidor en el puerto 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
