# Lab 11 - Express
**Author**: Carl Olson
**Version**: 1.0.1

## Overview
For this lab project I used express and mongoDB to make a simple restaurant database management system. 

Post a restaurant to the db by making a POST request to the /api/v1/restaurants endpoint. If a name or location is not included, a 400 status error code will be sent. If the restaurant is successfully posted to the database, a 200 status code will be logged and a response will be sent with the full restaurant db info (including an automatically generated id).

Retrieve all restaurants in the db using a GET request to the api/v1/restaurants endpoint. To retrieve a specific restaurant make the request to api/v1/restaurants/:id. A 200 status code will be logged and the restaurant will be sent as a response. If the id does not exist in the db, a 404 status code will be sent. 

Delete a restaurant from the db by making a DELETE request to the api/v1/restaurants/:id enpoint. A 200 status code will be logged and a message with the name of the restaurant and saying it has been deleted will be sent as a response. If the id does not exist in the db, a 404 status code will be sent.

Update a restaurant in the db by making a PUT request to the api/v1/restaurants/:id endpoint. A 200 status code will be logged and a response with the updated restaurant info will be passed back. 

## Getting Started
Install dependencies. Start server using nodemon. As an example for how to use the api, to retrieve all restaurants in the db, enter in the command line in a different tab than nodemon: http GET :3000/api/v1/restaurants

To run tests, first enter in the command line: ```npm run dbon``` to start MongoDB, then enter ```npm run test``` to run tests via jest. When done, enter ```npm run dboff``` to turn MongoDB off. 

## Architecture
JavaScript, Node, Express, MongoDB, Mongoose, superagent, winston, logger, jest, babel, dotenv, body-parser, faker.

## Credits and Collaborations
Thanks to my TA Seth, and classmates. 