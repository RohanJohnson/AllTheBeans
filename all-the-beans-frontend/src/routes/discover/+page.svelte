<script lang="ts">
    import { onMount } from "svelte";
    import { api } from "../../lib/api";
    import type { CoffeeBean } from "../../lib/coffee-bean";

    let beans: CoffeeBean[] | null = null;

    onMount(async () => {
        const response = await api.get<CoffeeBean[]>("/coffee-beans");
        beans = response.data;
        console.log(beans);
    });
</script>

{#if beans}
    {#each beans as bean}
        <div class="container">
            <p>{bean.name}</p>
        </div>
    {/each}
{:else}
    <p>Loading...</p>
{/if}

<style lang="scss">
    .container {
        max-width: 1000px;
    }
</style>
