import { Client, Environment } from 'square';
import { randomUUID } from 'crypto';

const client = new Client({
    accessToken: import.meta.env.VITE_SQUARE_ACCESS_TOKEN,
    environment: Environment.Sandbox,
});

export async function GET() {
    const result = await client.catalogApi.listCatalog();
    console.log(result);
    return {
        body: result,
    };
}