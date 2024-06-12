<script lang="ts" context="module">
    declare var Square: any;
</script>

<script lang="ts">
    import Navbar from '$lib/components/navbar.svelte';
	import '$lib/basecss.css';

	const appId = import.meta.env.VITE_SQUARE_APP_ID;
	const locationId = 'LMVZH848T9V88';

	let card: any;
	let paymentStatus: any;

    let navHeight: number;
    let processingPayment: boolean = false;
    let payBtnDisabled: boolean = false;

	async function initializePaymentForm() {
		if (!Square) {
			throw new Error('Square.js failed to load properly');
		}
		const payments = Square.payments(appId, locationId);
		try {
			card = await payments.card();
			await card.attach('#card-container');
		} catch (error) {
			console.error('Card failed to initialize', error);
			return;
		}
	}

	async function tokenize(paymentMethod: any) {
		const tokenResult = await paymentMethod.tokenize();
		if (tokenResult.status == 'OK') {
			return tokenResult.token;
		} else {
			let errorMessage = `Tokenization failed with status: ${tokenResult.status}`;
			if (tokenResult.errors) {
				errorMessage += `\n${JSON.stringify(tokenResult.errors, null, 2)}`;
			}
			throw new Error(errorMessage);
		}
	}

	async function handlePaymentMethodSubmission() {
		try {
			paymentStatus = '';
			const token = await tokenize(card);
			const paymentResponse = await fetch('/api/payment', {
				method: 'POST',
				headers: {
					'content-type': 'application/json'
				},
				body: JSON.stringify({
					locationId,
					sourceId: token
				})
			});

			if (paymentResponse.ok) {
                console.log(paymentResponse.ok);
                processingPayment = false;
				paymentStatus = 'Payment completed';
			} else {
				const errorBody = await paymentResponse.text();
				throw new Error(errorBody);
			}
		} catch (e: any) {
            processingPayment = false;
			paymentStatus = 'Payment failed';
			console.error(e.message);
		}
	}

    function processPayment() {
        processingPayment = true;
        setTimeout(() => {
            payBtnDisabled = true;
        }, 250);
    }
</script>

<body style="--navbar-height: {navHeight}px">
	<Navbar bind:height={navHeight} />
    <div class="cart">

    </div>
	<div class="checkout">
		<form on:submit|preventDefault={handlePaymentMethodSubmission}>
			{#await initializePaymentForm()}
				<p>Loading...</p>
			{:catch error}
				<p>{error}</p>
			{/await}
			<div id="card-container" />
            {#if payBtnDisabled}
                <button disabled>
                    {#if processingPayment}
                        Processing Payment...
                    {:else if paymentStatus}
                        Payment Completed
                    {:else}
                        Try Again
                    {/if}
                </button>
            {:else}
                <button on:click={processPayment}>Pay $1.00</button>
            {/if}
        </form>
        {#if paymentStatus}
            <div class="payment-status-container">{paymentStatus}</div>
        {/if}
	</div>
</body>

<style>
    .cart {
        width: calc(75% - 20px);
        height: 50vh;
        background-color: #fff;
        position: absolute;
        left: 0;
        top: var(--navbar-height);
        margin-top: 10px;
        margin-left: 10px;
        padding: 10px;
        box-shadow:
            0px 1px 2px rgba(0, 0, 0, 0.1),
            0px 0px 4px rgba(0, 0, 0, 0.1);
        border-radius: 6px;
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

	.checkout {
		display: flex;
        width: 25%;
        position: absolute;
        right: 0;
        top: var(--navbar-height);
        padding-top: 20px;
        text-align: center;
		height: auto;
        padding: 10px;
        flex-direction: column;
        gap: 20px;
	}

    .checkout > form {
        height: auto;
        width: auto;
        padding: 24px;
        border-radius: 6px;
        box-shadow:
            0px 1px 2px rgba(0, 0, 0, 0.1),
            0px 0px 4px rgba(0, 0, 0, 0.1);
        transition: all 0.2s ease-in-out;
    }

	button {
		color: #ffffff;
		background-color: #006aff;
		border-radius: 6px;
		cursor: pointer;
		border-style: none;
		font-size: 16px;
		line-height: 24px;
		padding: 12px 16px;
		width: 100%;
	}

    button:disabled {
        cursor: not-allowed;
    }

	button:hover {
		background-color: #005fe5;
	}

	button:active {
		background-color: #0055cc;
	}

	button:disabled {
		background-color: rgba(0, 0, 0, 0.05);
		color: rgba(0, 0, 0, 0.3);
	}

	.payment-status-container {
        width: auto;
		color: white;
		background: #1a1a1a;
		display: flex;
		padding: 12px;
		border-radius: 6px;
		box-shadow:
			0px 1px 2px rgba(0, 0, 0, 0.1),
			0px 0px 4px rgba(0, 0, 0, 0.1);
	}
</style>
