import express from 'express';
import cors from 'cors';

import config from './config.js';
import UserRoute from './Routes/userRoute.js';

const app = express();

app.use(cors());
app.use(express.json());

//routes
app.use('/api', UserRoute);

app.listen(config.port, () =>
  console.log(`Server is live @ ${config.hostUrl}`),
);