import cors from 'cors';
import express from 'express';

import { createRoutes } from './routes';

const { PORT } = process.env;

const app = express();

app.use(cors());
app.use(express.json());

createRoutes(app);

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
