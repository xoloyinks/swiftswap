import { Client, Environment } from 'square';
import crypto from 'crypto';

const client = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
  environment: Environment.Sandbox, // Change to Environment.Production in production
});

export async function POST(req) {
  const { sourceId, amount } = await req.json();

  try {
    const paymentsApi = client.paymentsApi;
    const idempotencyKey = crypto.randomBytes(22).toString('hex'); // Unique identifier to avoid duplicate charges
    const requestBody = {
      sourceId,
      idempotencyKey,
      amountMoney: {
        amount: parseInt(amount, 10), // Amount in cents
        currency: 'USD',
      },
    };
    const response = await paymentsApi.createPayment(requestBody);
    return new Response(JSON.stringify({ success: response.payment.status === 'COMPLETED' }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Payment processing error' }), { status: 500 });
  }
}
