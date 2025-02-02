<!-- <script lang="ts">
    import { onMount } from "svelte";
    import { api } from "../lib/api";
    import type { CoffeeBean } from "../lib/coffee-bean";

    let bean: CoffeeBean | null = null;

    onMount(async () => {
        const response = await api.get<CoffeeBean>("/bean-of-the-day");
        bean = response.data;
        console.log(bean);
    });
</script>

{#if bean}
    <div class="container">
        <h1>Bean of the Day: {bean.name}</h1>
        <p>{bean.description}</p>
        <img src={bean.image} alt={bean.name} />
    </div>
{:else}
    <p>Loading...</p>
{/if}

<style lang="scss">
    .container{
        h1{
            color: blue;
        }
    }
</style> -->


<script></script>



<style lang="scss">
</style>