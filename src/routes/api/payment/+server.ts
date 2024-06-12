import { json } from '@sveltejs/kit';
import { Client, Environment } from 'square';
import { randomUUID } from 'crypto';

console.log(import.meta.env.VITE_SQUARE_ACCESS_TOKEN);

const { paymentsApi } = new Client({
  accessToken: import.meta.env.VITE_SQUARE_ACCESS_TOKEN,
  environment: Environment.Sandbox,
});

declare global {
  interface BigInt {
    toJSON(): string;
  }
}

BigInt.prototype.toJSON = function () {
  return this.toString();
};

export async function POST({ request }) {
  const { locationId, sourceId } = await request.json();
  try {
    const { result } = await paymentsApi.createPayment({
      locationId,
      sourceId,
      idempotencyKey: randomUUID(),
      amountMoney: {
        amount: BigInt(100),
        currency: 'USD',
      },
    });
    console.log(result);
    return json(result);
  } catch (error: any) {
    console.log(error);
    return new Response(error, { status: 500 });
  }
}
