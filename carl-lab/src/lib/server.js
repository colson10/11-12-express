'use strict';

import express from 'express';
import mongoose from 'mongoose';
import logger from './logger';
import restaurantRoutes from '../route/restaurant-route';
import loggerMiddleware from './logger-middleware';
import errorMiddleware from './error-middleware';

const app = express();
let server = null;

app.use(loggerMiddleware); // logger middleware at the app-level

app.use(restaurantRoutes); // express handling our routes

app.all('*', (request, response) => { // express catching all routes that are not in restaurantRoutes
  logger.log(logger.INFO, 'Returning a 404 from the catch/all default route');
  return response.sendStatus(404);
});

app.use(errorMiddleware); // error catching middleware...this is 'next'

const startServer = () => {
  return mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
      server = app.listen(process.env.PORT, () => {
        logger.log(logger.INFO, `Server is listening on port ${process.env.PORT}`);
      });
    });
};

const stopServer = () => {
  return mongoose.disconnect()
    .then(() => {
      server.close(() => {
        logger.log(logger.INFO, 'Server is off');
      });
    });
};

export { startServer, stopServer };

