const express = require('express');
const app = express();
const axios = require('axios');

app.use(express.json());

app.get('/api/getDistance', async (req, res) => {
  const { pickupAddress, deliveryAddress } = req.query;
  const apiKey = 'AIzaSyCfRPl1B_VNo2j4oToAEhHBaiDr54MpA2w'; // Replace with your API key

  try {
    const response = await axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${pickupAddress}&destinations=${deliveryAddress}&key=${apiKey}`);
    const distanceInMeters = response.data.rows[0].elements[0].distance.value;
    res.json({ distanceInMeters });
  } catch (error) {
    res.status(500).json({ error: 'Error calculating distance' });
  }
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
