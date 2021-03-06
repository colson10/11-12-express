'use strict';

import faker from 'faker';
import superagent from 'superagent';
import Restaurant from '../model/restaurant';
import { startServer, stopServer } from '../lib/server';

const apiURL = `http://localhost:${process.env.PORT}/api/v1/restaurants`;

const createMockRestaurant = () => {
  return new Restaurant({
    name: faker.lorem.words(10),
    location: faker.lorem.words(20),
    cuisine: faker.lorem.words(12),
  }).save();
};

describe('/api/v1/restaurants', () => {
  beforeAll(startServer);
  afterAll(stopServer);
  afterEach(() => Restaurant.remove({}));
  test('POST - It should respond with a 200 status', () => {
    const restaurantToPost = {
      name: faker.lorem.words(1),
      location: faker.lorem.words(2),
      cuisine: faker.lorem.words(2),
    };
    return superagent.post(apiURL)
      .send(restaurantToPost)
      .then((response) => {
        expect(response.status).toEqual(200);
        expect(response.body.name).toEqual(restaurantToPost.name);
        expect(response.body.location).toEqual(restaurantToPost.location);
        expect(response.body.cuisine).toEqual(restaurantToPost.cuisine);
        expect(response.body._id).toBeTruthy();
        expect(response.body.timestamp).toBeTruthy();
      });
  });
  test('POST - it shoudl respond with a 400 status', () => {
    const restaurantToPost = {
      location: faker.lorem.words(2),
    };
    return superagent.post(apiURL)
      .send(restaurantToPost)
      .then(Promise.reject)
      .catch((response) => {
        expect(response.status).toEqual(400);
      });
  });
  describe('GET /api/v1/restaurants', () => {
    test('should respond with 200 if there are no errors', () => {
      let restaurantToTest = null;
      return createMockRestaurant()
        .then((restaurant) => {
          restaurantToTest = restaurant;
          return superagent.get(`${apiURL}/${restaurant.id}`);
        })
        .then((response) => {
          expect(response.status).toEqual(200);
          expect(response.body.name).toEqual(restaurantToTest.name);
          expect(response.body.location).toEqual(restaurantToTest.location);
          expect(response.body.cuisine).toEqual(restaurantToTest.cuisine);
        });
    });
    test('should respond with 404 if there is no note to be found', () => {
      return superagent.get(`${apiURL}/ThisIsAnInvalidId`)
        .then(Promise.reject)
        .catch((response) => {
          expect(response.status).toEqual(404);
        });
    });
  });
});

