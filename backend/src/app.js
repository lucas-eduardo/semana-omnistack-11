import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import Youch from 'youch';
import { errors } from 'celebrate';

import 'express-async-errors';

import 'dotenv/config';

import routes from './routes';

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  middlewares() {
    this.server
      .use(helmet())
      .use(cors())
      .use(express.json());
  }

  routes() {
    this.server.use('/', routes);
    this.server.use(errors());
  }

  exceptionHandler() {
    this.server.use(async (err, req, res, next) => {
      if (process.env.NODE_ENV === 'development') {
        const error = await new Youch(err, req).toJSON();
        return res.status(500).json(error);
      }

      return res.status(500).json({ error: 'Internal server error' });
    });
  }
}

export default new App().server;
