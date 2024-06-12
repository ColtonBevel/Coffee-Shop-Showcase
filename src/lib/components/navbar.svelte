<script lang="ts">
    export let height: number = 0;
</script>

<div class="nav-bar" bind:clientHeight={height}>
    <ul>
        <li class="centered"><a href="/">Local Coffee Shop</a></li>
        <li><a href="/contact">Contact Us</a></li>
        <li><a href="/store">Shop Coffee</a></li>
        <li><a href=/store/checkout>Cart</a></li>
    </ul>
</div>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: "Roboto", sans-serif;
        font-weight: 400;
        font-style: normal;
    }

    .centered {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
    }

    .nav-bar {
        display: flex;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        justify-content: right;
        align-items: center;
        background-color: #fff;
        color: black;
        padding: 10px;
        padding-block: 20px;
        border-bottom: solid 1px #000;
        z-index: 999;
    }

    .nav-bar ul {
        display: flex;
        gap: 100px;
        color: inherit;
        list-style: none;
    }

    .nav-bar ul li {
        color: inherit;
        margin-right: 10px;
    }

    .nav-bar ul li a {
        color: inherit;
        text-decoration: none;
        position: relative;
    }

    .nav-bar ul li a:after {
        content: "";
        width: 100%;
        height: 2px;
        background-color: black;
        position: absolute;
        left: 0;
        bottom: -5px;
        transition: transform 0.2s ease-in-out;
        transform: scaleX(0);
        transform-origin: left;
    }

    .nav-bar ul li a:hover:after {
        transform-origin: right;
        transform: scaleX(100%);
    }
</style>