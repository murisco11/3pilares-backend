import 'reflect-metadata';
import 'dotenv/config';
import { app } from './app';
import { AppDataSource } from './database/data-source';

const PORT = process.env.API_PORT || 3333;

AppDataSource.initialize() // Inicializar conexão com banco de dados
  .then(() => { // Conexão com banco de dados realizada com sucesso
    console.log('DB init');
    app.listen(PORT, () => {
      console.log(`Server init: http://localhost:${PORT}`);
    });
  })
  .catch((err) => { // Conexão com banco de dados realizada com sucesso
    console.error('Error on DB and server: ', err);
  });