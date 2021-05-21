import 'reflect-metadata';
import express from 'express';

import 'express-async-errors';
import createConnection from '../typeorm';
import '../../container';
import { router } from './routes';

createConnection();
const app = express();

app.use(express.json());

app.get('/', (request, response) => {
  return response.json({ message: 'GET funcionou!' });
});

app.post('/', (request, response) => {
  const { name } = request.body;

  return response.json({ message: `${name}, o POST funcionou!` });
});

app.use(router);

export { app };
