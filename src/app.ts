import * as cors from 'cors';
import * as express from 'express';
import { errorHandler } from './middlewares/errorHandler';

import { createRoutes } from './routes';

const { PORT } = process.env;

const app = express();

app.use(cors());
app.use(express.json());

createRoutes(app);

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
