import 'reflect-metadata';
import express, { json } from 'express';
import { routes } from './routes';
import './shared/container';
import path from 'node:path';
import swagger from 'swagger-ui-express';
import swaggerFile from './swagger.json';
import cors from 'cors';

const app = express();

app.use(cors());

app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));

app.use(json());

app.use('/api-docs', swagger.serve, swagger.setup(swaggerFile));

app.use(routes);

app.listen(3333, () => {
	console.log('Server is running!');
});
