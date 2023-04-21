const axios = require('axios');

class Buss {
  constructor(name, image_url, price, rating, url) {
    this.name = name;
    this.image_url = image_url;
    this.price = price;
    this.rating = rating;
    this.url = url;
  }
}

const getYelpData = async (lat, lon) => {
  try {
    // const lat = req.query.lat;
    // const lon = req.query.lon;
    const url = `https://api.yelp.com/v3/businesses/search?latitude=${lat}&longitude=${lon}&sort_by=best_match`;
    // const url = `https://api.yelp.com/v3/businesses/search?latitude=${lat}&longitude=${lon}&sort_by=best_match`;
    // const content = { Authorization: `Bearer ${process.env.YELP_API_KEY}` } ;

    const weatherData = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${process.env.YELP_API_KEY}`,
      }
    });
    console.log('weather data', weatherData.data.businesses);
    // console.log('RES HERE', res);
    // .then((response) => {
    //   return response.data.businesses;
    // })
    // .catch((error) => {
    //   console.log(error.message);
    //   res.status(400).send('Cannot find results.');
    // });

    const resultArray = weatherData.data.businesses.map(result => {
      const { name, image_url, price, rating, url } = result;
      return new Buss(
        name,
        image_url,
        price,
        rating,
        url
      );
    });
    return resultArray;
    // res.send(resultArray);
    // res.send(weatherData);
  } catch (error) {
    console.log('THIS IS THE ERROR', error);
    // res.status(500).send('Yelp server error.');
  }
};

module.exports = getYelpData;
