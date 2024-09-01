import express from 'express';
import http from 'http';
import routes from './routes/index.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use(routes)

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
})

export default app;
