import axios from 'axios';

export async function GET(req) {
  const { pickupAddress, deliveryAddress } = req.query;
  const apiKey = process.env.GOOGLE_MAPS_API_KEY; // Replace with your API key

  try {
    const response = await axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${pickupAddress}&destinations=${deliveryAddress}&key=${apiKey}`);
    const distanceInMeters = response.data.rows[0].elements[0].distance.value;
    return new Response(JSON.stringify({ distanceInMeters }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error calculating distance' }), { status: 500 });
  }
}
