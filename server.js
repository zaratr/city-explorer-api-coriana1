'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const weather = require('./modules/weather.js');
const movies = require('./modules/movie.js');
const yelp = require('./modules/my-yelp.js');

const app = express();
app.use(cors());

app.get('/forecast', weatherHandler);
app.get('/movie', movieHandler);
app.get('/weather', currWeatherHandler);
app.get('/yelp', yelpHandler );

//FORECAST
function weatherHandler(request, response) {
  const { lat, lon } = request.query;
  weather.getFWeather(lat, lon)
    .then(summaries => response.send(summaries))
    .catch((error) => {
      console.error(error);
      response.status(200).send('Sorry. Something went wrong with Weather API!');
    });
}

function currWeatherHandler(request, response) {
  const { lat, lon } = request.query;
  weather.getCurrWeather(lat,lon)
    .then(summaries => response.send(summaries))
    .catch((error) => {
      console.error(error);
      response.status(200).send('Sorry. Something went wrong with Weather API!');
    });
}

function movieHandler(request, response) {
  movies(request.query.city)
    .then(res => response.send(res))
    .catch((error) => {
      console.error(error);
      response.status(200).send('Sorry. Something went wrong with Movie API!');
    });
}

function yelpHandler(request, response) {
  const { lat, lon } = request.query;
  yelp(lat, lon)
    .then(summaries => response.send(summaries))
    .catch((error) => {
      console.error(error);
      response.status(200).send('Sorry. Something went wrong with Yelp.com API!');
    });
}


app.listen(process.env.PORT, () => console.log(`Server up on ${process.env.PORT}`));




// 'use strict';

// const express = require('express');
// require('dotenv').config();
// const cors = require('cors');
// let data = require('./data/petdata');
// let weatherData = require('./data/weather');
// const axios = require('axios');

// // app is now the server - need to call Express to create the server
// const app = express();

// //allows anyone to hit our server
// app.use(cors());

// // Selects port for the application from env or selects 3002 if original is not available
// const PORT = process.env.PORT || 3002;
// app.listen(PORT, () => console.log(`We are up on ${PORT}`));

// //  end points
// app.get('/', (request, response) => {
//   response.status(200).send('Welcome to my server');
// });
// app.get('/hello', (request, response) => {
//   let firstName = request.query.firstName;
//   let lastName = request.query.lastName;
//   console.log(request.query);
//   response
//     .status(200)
//     .send(`Hello ${firstName} ${lastName}, welcome to my server`);
// });

// //Card One location
// app.get('/weather', async (request, response, next) => {
//   try {

//     let localCity = request.query.city;
//     //let returnedCity = weatherData.find(city => city.city_name === localCity);
//     let localUrl = `https://api.weatherbit.io/v2.0/forecast/daily?city=${localCity}&country=US&key=${process.env.WEATHERBIT_API_KEY}`;
//     let returnedWeather = await axios.get(localUrl);
//     let dataToSend = new Weather(returnedWeather.data);
//     dataToSend.generateWeatherData();
//     dataToSend.generateForCity();

//     //console.log(dataToSend.myWeatherData);
//     // let returnedWeather = weatherData.find(weather => weather.data.description === )
//     response.status(200).send(dataToSend.cityWeatherData);
//   } catch (error) {
//     next(error);
//   }
// });

// class Weather {
//   constructor(weatherObj) {
//     (this.cityName = weatherObj.city_name),
//       (this.lattitude = weatherObj.lon),
//       (this.longitude = weatherObj.lat);
//     this.data = weatherObj.data;

//   }

//   myWeatherData = [];
//   cityWeatherData = [];
//   generateForCity() {
//     this.cityWeatherData = this.myWeatherData.reduce(
//       (allweather, dayweather) => {
//         allweather.push({
//           description: `Low of ${dayweather.lowtemp}, high of ${dayweather.hightemp} with ${dayweather.description}`,
//           date: dayweather.date,
//         });
//         return allweather;
//       },
//       []
//     );
//   }

//   generateWeatherData() {
//     this.myWeatherData = this.data.reduce((allweather, dayweather) => {
//       // console.log(dayweather.datetime);
//       // console.log(dayweather.high_temp);
//       // console.log(dayweather.low_temp);
//       allweather.push({
//         date: dayweather.datetime,
//         hightemp: dayweather.max_temp,
//         lowtemp: dayweather.min_temp,
//         description: dayweather.weather.description,
//       });
//       return allweather;
//     }, []);
//   }
// }
// app.get('/movies', async (request, response, next) => {
//   try {
//     let cityMovieSearch = request.query.city;
//     let myMovieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${cityMovieSearch}`;
//     let returnedMovies = await axios.get(myMovieUrl);
//     let dataToSend = returnedMovies.data.results.map(
//       (obj) => new MovieforCity(obj)
//     );
//     console.log('this works=====================================');
//     console.log('===============================================');
//     response.status(200).send(dataToSend);
//   } catch (error) {
//     next(error);
//   }
// });

// class MovieforCity {
//   constructor(movieObj) {
//     this.id = movieObj.id;
//     this.image = `https://image.tmdb.org/t/p/w500/${movieObj.poster_path}`;
//     this.title = movieObj.title;
//   }
// }
// // app.get('/pet', (request, response, next) => {
// //   try {
// //     //give pet query
// //     let queriedSpecies = request.query.species;
// //     let foundPet = data.find((pet) => pet.species === queriedSpecies);
// //     let dataToSend = new Pet(foundPet);
// //     response.status(200).send(dataToSend);
// //   } catch (error) {
// //     next(error);
// //   }
// // });

// // // class to goorm bulky data
// // class Pet {
// //   constructor(petObj) {
// //     this.name = petObj.name;
// //     this.breed = petObj.breed;
// //   }
// // }

// app.get('/photos', async (request, response, next) => {
//   try {

//     //generate variable for key value inside the query
//     let myLocalCity = request.query.city;

//     //url for the api to be queried
//     let url = `https://api.unsplash.com/search/photos?client_id=${process.env.UNSPLASH_API_KEY}&query=${myLocalCity}`;
//     let photosFromAxios = await axios.get(url);

//     //the data will have to be mapped through every object in the class
//     //loops through an array of objects and creates a Photo object based only on the needed info from the data
//     let dataToSend = photosFromAxios.data.results.map((obj = new Photo(obj)));
//     response.status(200).send(dataToSend);
//   } catch (error) {
//     next(error);
//   }
// });

// class Photo {
//   constructor(picObj) {
//     this.src = picObj.urls.regular;
//     this.alt = picObj.alt_description;
//     this.userName = picObj.user.name;
//   }
// }
// //NOTE:this * will catch all of the bad links that do not exist, this function needs to be at the end of the file
// app.get('*', (request, response) => {
//   response.status(404).send('This page does not exist');
// });

// //This also lives at the bottom of the page handles errors read docs from express
// app.use((error, request, response, next) => {
//   console.log(error.message);
//   response.status(500).send(error.message);
// });
// //to start nodemon in the console










// // **** REQUIRE *** (like import but for the backend)

// const express = require('express');
// require('dotenv').config();
// const cors = require('cors');
// const axios = require('axios');

// // set variable for weather.json
// const weatherData = require('./data/weather.json');

// // *** app === server - Need to call Express to create the server
// const app = express();

// // *** MIDDLEWARE *** allow anyone to hit our server
// app.use(cors());


// // Select port of the app
// const PORT = process.env.PORT || 3002;


// // Verifty port is running
// app.listen(PORT, () => console.log(`Yay we are up on port ${PORT}`));

// // **** ENDPOINTS ****


// // Welcome to server prompt
// app.get('/', (request, response) => {
//   response.status(200).send('Welcome to my server!');
// });
// console.log('response');

// // Get user name from parameter input


// app.get('/weather', (req, res, next) => {
//   console.log('Weather endpoint hit');
//   console.log('All weather data:', weatherData);
//   try {
//     let lat = parseFloat(req.query.lat);
//     let lon = parseFloat(req.query.lon);
//     let searchQuery = req.query.searchQuery;

//     console.log('lat:', lat, 'lon:', lon, 'searchQuery:', searchQuery);

//     let foundWeather = weatherData.find(city => city.city_name.toLowerCase() === searchQuery.toLowerCase() ||
//       Math.abs(parseFloat(city.lat) - parseFloat(lat)) < 0.01 ||
//       Math.abs(parseFloat(city.lon) - parseFloat(lon)) < 0.01);


//     console.log('foundWeather:', foundWeather);


//     if (!foundWeather) {
//       return res.status(404).send('No weather found');
//     }

//     let forecasts = foundWeather.data.map(weatherData => new Forecast(weatherData));

//     res.status(200).send(forecasts);
//   } catch (error) {
//     next(error);
//   }
// });


// //LAB 8 BUILDING ENDPOINS THAT WILL CALL OUT AN API
// app.get('/photos', async (request, response, next) => {
//   try {
//     let myLocalCity = request.query.city;

//     let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${cityMovieSearch}`;
    
//     // `https://api.unsplash.com/search/photos?client_id=${process.env.UNSPLASH_API_KEY}&query=${myLocalCity}`;

//     let photosFromAxios = await axios.get(url);

//     let dataToSend = photosFromAxios.data.results.map(obj => new Photo(obj));

//     //LAB 8 TODO ACCEPT OR DEFINE QUERIES 
//     response.status(200).send('Test from photos endpoints');
//   } catch (error) {
//     next(error);
//   }
// });

// // TODO: LAB 8 DEFINE MY PHOTO CLASS and info I want to send to the front end
// class Photo {
//   constructor(picObj) {
//     this.src = picObj.urls.regular;
//     this.alt = picObj.alt_description;
//     this.username = picObj.user.name;
//   }
// }



// app.get('*', (request, response) => {
//   response.status(404).send('This page does not exist');
// });

// // **** LAB 8 ERROR HANDLING - PLUG AND PLAY CODE FROM EXPRESS DOCS ****

// app.use((error, request, response, next) => {
//   console.log(error.message);
//   response.status(500).send(error.message);
// });


// // **** LAB 7 CLASS TO CLEAN UP BULKY DATA ****
// class Forecast {
//   constructor(forecastData) {
//     this.date = forecastData.datetime;
//     this.description = forecastData.weather.description;
//     this.minTemp = forecastData.min_temp;
//     this.maxTemp = forecastData.max_temp;
//     this.icon = forecastData.weather.icon;
//   }
// }


// // *** CATCH ALL ENDPOINT SHOULD BE THE LAST DEFINED ***
// app.get('*', (request, response) => {
//   response.status(404).send('This page does not exist');
// });

// // **** ERROR HANDLING - PLUG AND PLAY CODE FROM EXPRESS DOCS ****
// app.use((error, request, response, next) => {
//   console.log(error.message);
//   response.status(500).send(error.message);
// });



