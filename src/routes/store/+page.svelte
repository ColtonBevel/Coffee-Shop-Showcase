<script lang="ts">
	import Navbar from '$lib/components/navbar.svelte';
	import '$lib/basecss.css';

	import type { PageServerData } from './$types';

	export let data: PageServerData;

	let cartTooltip: boolean = false;

	let items: any[any];
	if (data && data.props && data.props.items) {
		items = data.props.items.body;
	}

	function convertBackToDollars(price: number) {
		return (price / 100).toFixed(2);
	}

	async function addItemToCart(event: SubmitEvent) {
		const itemId = (event.submitter as HTMLButtonElement).name;
		cartTooltip = true;
		let res = await fetch('api/catalog?action=addItemToCart', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				itemId: itemId,
				cart: localStorage.getItem('cart') || ''
			} as { itemId: string, cart: string })
		});

		if (res.ok) {
			if (!localStorage.getItem('cart')) {
				localStorage.setItem('cart', JSON.stringify(itemId))
			} else if (localStorage.getItem('cart')) {
				let cart: any[] = JSON.parse(localStorage.getItem('cart')); //<!--todo: fix this
				cart.push(itemId);
				localStorage.setItem('cart', JSON.stringify(cart));
			}
			setTimeout(() => {
				cartTooltip = false;
			}, 2000);
		} else {
			console.error('Failed to add item to cart');
		}
	}

	let navHeight: number;
</script>

<body style="--navbar-height: {navHeight}px">
	<Navbar bind:height={navHeight} />
	<div class="items">
		{#each items as item}
			<form class="item" on:submit|preventDefault={addItemToCart}>
				<h3>{item.item_data.name}</h3>
				<p>
					${convertBackToDollars(
						item.item_data.variations[0].item_variation_data.price_money.amount
					)}
				</p>
				<button name={item.id}>Add to Cart</button>
			</form>
		{/each}
	</div>
	{#if cartTooltip}
		{#await addItemToCart}
			<p class="cart-tooltip">Adding item to cart...</p>
		{:then response}
			<p class="cart-tooltip">Item added to cart</p>
		{:catch error}
			<p class="cart-tooltip">Failed to add item to cart</p>
		{/await}
	{/if}
</body>

<style>
	.items {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		margin-top: var(--navbar-height);
		height: 100vh;
	}

	.item {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin: 10px;
		padding: 10px;
		border: 1px solid black;
		border-radius: 5px;
		height: 25%;
		width: 25%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.cart-tooltip {
		position: fixed;
		top: calc(var(--navbar-height) + 10px);
		right: 0;
		padding: 10px;
		background-color: white;
		padding: 10px;
		box-shadow:
			0px 1px 2px rgba(0, 0, 0, 0.1),
			0px 0px 4px rgba(0, 0, 0, 0.1);
	}
</style>
