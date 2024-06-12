<script lang="ts">
	import Navbar from "$lib/components/navbar.svelte";
    import "$lib/basecss.css";
</script>

<body>
    <Navbar />
    <div class="content">
        <div>
            <h1>Welcome to the Local Coffee Shop</h1>
            <p>We are a local coffee shop that specializes in providing the best coffee in town. We have a wide variety of coffee beans and blends to choose from. We also offer a selection of pastries and snacks to enjoy with your coffee. Come visit us today and experience the Local Coffee Shop difference!</p>
        </div>
    </div>
</body>

<style>
    .content {
        padding: 20px;
        background-image: url('/images/coffee_background.jpg');
        height: 100vh;
        width: 100%;
        background-size: cover;
        background-position: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: white;
        font-size: 1.5rem;
        text-align: center;
    }

    .content > div {
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(20px);
        padding: 50px;
        border-radius: 15px;
    }

    .content > div > h1 {
        font-size: 3rem;
        text-shadow: 0px 0px 10px #000;
    }

    .content > div > p {
        max-width: 800px;
        margin-top: 20px;
        text-shadow: 0px 0px 10px #000;
    }
</style>