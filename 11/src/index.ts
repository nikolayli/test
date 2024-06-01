import express from 'express';
import userRoutes from './routes/userRoutes';
import { connectToDatabase } from './config/dbConfig';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json())

app.use('/', userRoutes);

const PORT = process.env.PORT || 3000;

connectToDatabase()
  .then(async connection => {
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  })
  .catch(error => console.log('TypeORM connection error: ', error));