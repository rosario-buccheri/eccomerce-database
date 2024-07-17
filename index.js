const express = require('express');
const app = express();
const port = 3000;

// Middleware per il parsing del corpo della richiesta
app.use(express.json());

// Importa e usa le rotte
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// Avvio del server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
