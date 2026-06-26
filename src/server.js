import dotenv from 'dotenv';
import app from './app.js';
import { connectToDatabase } from './config/database.js';

dotenv.config();

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await connectToDatabase();

    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error('Erro ao iniciar o servidor:', error.message);
    process.exit(1);
  }
}

startServer();