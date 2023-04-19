'use strict';

// **** REQUIRE *** (like import but for the backend)

const express = require('express');
require('dotenv').config();
const cors = require('cors');

let weatherData = require('./data/weather.json');

// *** app === server - Need to call Express to create the server
const app = express();
app.use(cors());

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => console.log(`Yay we are up on port ${PORT}`));

// **** ENDPOINTS ****
app.get('/', (request, response) => {
  response.status(200).send('Welcome to my server!');
});

app.get('/hello', (request, response) => {
  let firstName = request.query.userFirstName;
  let lastName = request.query.userLastName;

  console.log(request.query);

  response.status(200).send(`Hello ${firstName} ${lastName}, welcome to my server!`);

});

app.get('/pet', (request, response, next) => {

  try {
    let queriedSpecies = request.query.species;

    let foundPet = petData.find(pet => pet.species === queriedSpecies);
    let dataToSend = new Pet(foundPet);

    response.status(200).send(dataToSend);
  } catch (error) {
    next(error);
  }
});

// *** CLASS TO GROOM BULKY DATA ***
class Pet {
  constructor(petObj) {
    this.name = petObj.name;
    this.breed = petObj.breed;
  }
}

// *** HELPFUL START FOR YOUR LAB ***
class Forecast {
  constructor(data) {
    this.date = data.valid_date;
    this.description = data.weather.description;

  }
}
app.get('/weather', (request, response, next) => {

  try {
    let lat = request.query.lat;
    let lon = request.query.lon;
    let searchQuery = request.query.searchQuery;

    let weather = weatherData.find(city => city.city_name === searchQuery)

    let result = weather.data.map(day => new Forecast(day))

    response.status(200).send(result)
    // if (lat && lon) {
    //   result = weather.searchByLocation(lat, lon);
    // } else if (searchQuery) {
    //   result = weather.searchByQuery(searchQuery);
    // } else {
    //   throw new Error('Please provide either lat and lon or a search query.');
    // }

    // if (!result) {
    //   throw new Error('Weather data not found.');
    // }

    // response.json(result);
  } catch (error) {
    console.log(error.message);
    next(error.message);
  }
});


// *** CATCH ALL ENDPOINT SHOULD BE THE LAST DEFINED ***
app.get('*', (request, response) => {
  response.status(404).send('This page does not exist');
});


// **** ERROR HANDLING - PLUG AND PLAY CODE FROM EXPRESS DOCS ****
app.use((error, request, response, next) => {
  console.log(error.message);
  response.status(500).send(error.message);
});