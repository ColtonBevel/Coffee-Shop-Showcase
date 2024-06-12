import { writable } from 'svelte/store';

const cart = writable<{ [key: string]: any }>({});

export function addItem(itemId: any, name: any, price: number) {
    cart.update((items: { [key: string]: any }) => {
        if (items[itemId]) {
            items[itemId].quantity++;
        } else {
            items[itemId] = {
                id: itemId,
                name,
                price,
                quantity: 1
            };
        }

        return items;
    });
}

export function getCart() {
    let items: any;
    cart.subscribe((item: any) => {
        items = item;
    });

    //todo: unsubscribe from the store, also sync the store to the local storage
    //! This is a bug, the store should be synced to the local storage 
    //! otherwise the cart will be lost on page refresh
    //? maybe use locals in svelte instead of local storage, not sure

    return items;
}