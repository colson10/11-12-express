'use strict';

import { Router } from 'express';
import bodyParser from 'body-parser';
import Restaurant from '../model/restaurant';
import logger from '../lib/logger';

const jsonParser = bodyParser.json();

const restaurantRouter = new Router();

restaurantRouter.post('/api/v1/restaurants', jsonParser, (request, response) => {
  logger.log(logger.INFO, 'POST - processing a request');
  if (!request.body.name || !request.body.location) {
    logger.log(logger.INFO, 'Responding with a 400 error code');
    return response.sendStatus(400);
  }
  return new Restaurant(request.body).save()
    .then((restaurant) => {
      logger.log(logger.INFO, 'POST - responding with a 200 status code');
      logger.log(logger.INFO, restaurant);
      return response.json(restaurant);
    })
    .catch((error) => {
      logger.log(logger.ERROR, '__POST_ERROR__');
      logger.log(logger.ERROR, error);
      return response.sendStatus(500);
    });
});

restaurantRouter.get('/api/v1/restaurants/:id', (request, response) => {
  logger.log(logger.INFO, 'GET - processing a request');

  return Restaurant.findById(request.params.id)
    .then((restaurant) => {
      if (!restaurant) {
        logger.log(logger.INFO, 'GET - responding with a 404 status code - (!restaurant)');
        return response.sendStatus(404);
      }
      logger.log(logger.INFO, 'GET - responding with a 200 status code');
      return response.json(restaurant);
    })
    .catch((error) => { // mongodb error or parsing id error
      if (error.message.toLowerCase().indexOf('cast to objectid failed') > -1) {
        logger.log(logger.INFO, 'GET - responding with a 404 status code - objectId');
        logger.log(logger.VERBOSE, `Could not parse the specific object id ${request.params.id}`);
        response.sendStatus(404);
      }
      logger.log(logger.ERROR, '__GET_ERROR__ Returning a 500 status code');
      logger.log(logger.ERROR, error);
      return response.sendStatus(500);
    });
});

export default restaurantRouter;
