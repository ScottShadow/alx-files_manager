import express from 'express';
import routes from './routes/index.js';
import injectMiddlewares from './libs/middlewares.js';
import startServer from './libs/boot.js';

const sever = express();
const PORT = process.env.PORT || 5000;

server.use(express.json());

injectMiddlewares(server);
injectRoutes(server);
startServer(server);

export default server;
