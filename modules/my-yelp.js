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

const getYelpData = async (req, res) => {
  try {
    const lat = req.query.lat;
    const lon = req.query.lon;
    const url = `https://api.yelp.com/v3/businesses/search?latitude=${lat}&longitude=${lon}&sort_by=best_match`;
    const weatherData = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${process.env.YELP_API_KEY}`,
      },
    })
      .then((response) => {
        return response.data.businesses;
      })
      .catch((error) => {
        console.log(error.message);
        res.status(400).send('Cannot find results.');
      });

    const resultArray = weatherData.map(result => {
      const { name, image_url, price, rating, url } = result;
      return new Buss(
        name,
        image_url,
        price,
        rating,
        url
      );
    });

    res.send(resultArray);
  } catch (error) {
    res.status(500).send('Yelp server error.');
  }
};

module.exports = getYelpData;
