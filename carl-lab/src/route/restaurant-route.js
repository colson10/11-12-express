'use strict';

import { Router } from 'express';
import bodyParser from 'body-parser';
import HttpErrors from 'http-errors';
import Restaurant from '../model/restaurant';
import logger from '../lib/logger';

const jsonParser = bodyParser.json();

const restaurantRouter = new Router();

restaurantRouter.post('/api/v1/restaurants', jsonParser, (request, response, next) => {
  if (!request.body.name || !request.body.location) {
    logger.log(logger.INFO, 'Responding with a 400 error code');
    return next(new HttpErrors(400, 'name and location are required'));
  }
  return new Restaurant(request.body).save()
    .then((restaurant) => {
      logger.log(logger.INFO, 'POST - responding with a 200 status code');
      logger.log(logger.INFO, restaurant);
      return response.json(restaurant);
    })
    .catch(next);
});

restaurantRouter.get('/api/v1/restaurants/:id', (request, response, next) => {
  return Restaurant.findById(request.params.id)
    .then((restaurant) => {
      if (!restaurant) {
        logger.log(logger.INFO, 'GET - responding with a 404 status code - (!restaurant)');
        return next(new HttpErrors(404));
      }
      logger.log(logger.INFO, 'GET - responding with a 200 status code');
      return response.json(restaurant);
    })
    .catch(next);
});

// GET all
restaurantRouter.get('/api/v1/restaurants', (request, response, next) => {
  return Restaurant.find()
    .then((restaurants) => {
      if (!restaurants) {
        logger.log(logger.INFO, 'GET ALL - responding with a 404 status code - (!restaurants)');
        return next(new HttpErrors(404, 'No restaurants found'));
      }
      logger.log(logger.INFO, 'GET ALL - responding with a 200 status code');
      return response.json(restaurants.map(restaurant => restaurant.name));
    })
    .catch(next);
});

restaurantRouter.put('/api/v1/restaurants/:id', jsonParser, (request, response, next) => {
  const options = { runValidators: true, new: true };
  return Restaurant.findByIdAndUpdate(request.params.id, request.body, options)
    .then((updatedRestaurant) => {
      if (!updatedRestaurant) {
        logger.log(logger.INFO, 'PUT - responding with a 404 status code- (!updatedRestaurant)');
        return next(new HttpErrors(404, 'restaurant not found'));
      }
      logger.log(logger.INFO, 'PUT - responding with a 200 status code');
      return response.json(updatedRestaurant);
    })
    .catch(next);
});

restaurantRouter.delete('/api/v1/restaurants/:id', (request, response, next) => {
  return Restaurant.findByIdAndRemove(request.params.id)
    .then((restaurant) => {
      if (!restaurant) {
        logger.log(logger.INFO, 'DELETE - responding with a 404 status code - (!restaurant)');
        return next(new HttpErrors(404));
      }
      logger.log(logger.INFO, 'DELETE - responding with a 200 status code');
      return response.sendStatus(204);
    })
    .catch(next);
});

export default restaurantRouter;
