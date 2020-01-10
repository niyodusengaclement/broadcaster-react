import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import bodyParser from 'body-parser';
import fileupload from 'express-fileupload';
import env from 'dotenv';
import compression from 'compression';
import routes from './routes/index';
import dbRoutes from './routes/index2';

env.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(helmet());
app.use(compression());
app.use(fileupload({
  createParentPath: true,
  useTempFiles: true,
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/v1', routes);
app.use('/api/v2', dbRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port} `);
});

export default app;
