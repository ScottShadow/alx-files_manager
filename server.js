import express from 'express';
import http from 'http';
import routes from './routes/index.js';

const app = express();
const PORT = process.env.PORT || 5000;
const env = process.env.npm_lifecycle_event || 'dev';

app.use(express.json());

app.use(routes)

app.listen(PORT, () => {
  console.log(`[${env}] API has started listening at port:${PORT}`);
})

export default app;
