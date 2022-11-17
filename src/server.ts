import express, { json } from 'express';
import { routes } from './routes';
import path from 'node:path';

const app = express();

app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));

app.use(json());

app.use(routes);

app.listen(3333, () => {
  console.log('Server is running!');
});
