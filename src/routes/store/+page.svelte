<script lang="ts">
    import Navbar from "$lib/components/navbar.svelte";
    import "$lib/basecss.css";
	import { onMount } from "svelte";

    let items: any[] = [];
    async function getItems(): Promise<any> {
        const res = await fetch("/api/catalog");
        items = await res.json();
        return res.json();
    };

    onMount(() => {
        getItems();
    });
</script>

<body>
    <Navbar />
    <div class="items">
        {#await getItems}
            <p>Loading...</p>
        {/await}
        {#each items as item}
            <div class="item">
                <h3>{item.name}</h3>
                <p>{item.price}</p>
            </div>
        {/each}
    </div>
</body>