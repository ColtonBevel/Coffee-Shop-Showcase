import { Client, Environment } from 'square';
import { randomUUID } from 'crypto';
import { addItem, getCart } from '$lib/cart.store.js';

const client = new Client({
    accessToken: import.meta.env.VITE_SQUARE_ACCESS_TOKEN,
    environment: Environment.Sandbox,
});

function itemLookup(itemId: string) {
    return new Promise((resolve, reject) => {
        client.catalogApi.retrieveCatalogObject(itemId).then((result: any) => {
            resolve(JSON.parse(result.body).object);
        }).catch((error: any) => {
            reject(error);
        });
    });
}

export async function GET({ url }) {
    const query = url.searchParams;
    const action = query.get('action');

    switch (action) {
        case 'getAllItems':
            const result: any = await client.catalogApi.listCatalog();

            let items: any[any] = JSON.parse(result.body).objects;

            const replacer = (key: any, value: any) => typeof value === 'bigint' ? value.toString() : value;
            return new Response(JSON.stringify({
                status: 200,
                body: items
            }, replacer));
    }
}

export async function POST({ request }: { request: Request }) {
    const query = new URL(request.url).searchParams;
    const action = query.get('action');

    switch (action) {
        case 'addItemToCart':
            const body = await request.json();  // Parse the JSON body
            const itemId = body.itemId;

            await itemLookup(itemId)
                .then((result: any) => {
                    addItem(
                        result.id,
                        result.item_data.name,
                        result.item_data.variations[0].item_variation_data.price_money.amount
                    )
                });

            //todo: finish this

            // console log the cart from the store
            console.log(getCart());
            
            return new Response(JSON.stringify({
                status: 200,
                body: 'Item added to cart'
            }));
        
        default: 
            return new Response(JSON.stringify({
                status: 400,
                body: 'Invalid action'
            }));
    }
}
