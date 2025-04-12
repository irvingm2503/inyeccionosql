const express = require('express');
const path = require('path');
const connectToDatabase = require('./db'); // Archivo para manejar la conexión a MongoDB

const app = express();
const PORT = 3000; 


app.use(express.urlencoded({ extended: true })); // Permite manejar datos en formato x-www-form-urlencoded
app.use(express.json()); // Permite manejar datos en formato JSON

app.use(express.static(path.join(__dirname, 'public')));

// RUta conexion html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.post('/login', async (req, res) => {
    const { username, password } = req.body; 

    try {
        // Conectar a MongoDB
        const db = await connectToDatabase();
        const usersCollection = db.collection('Users'); 
        // Busca el usuario en la base de datos
        const user = await usersCollection.findOne({ username, password});

        // Verificar si el usuario existe
        if (user) {
            res.send("<h1>¡Felicidades, existes!</h1>");
        } else {
            res.send("<h1>Usuario o contraseña incorrectos.</h1>");
        }
    } catch (error) {
        console.error("Error durante la autenticación:", error);
        res.status(500).send("<h1>Error interno del servidor.</h1>");
    }
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});