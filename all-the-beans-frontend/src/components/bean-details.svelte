<script lang="ts">
    import type { CoffeeBean } from "../lib/coffee-bean";
    export let bean: CoffeeBean | null = null;
</script>

<div class="container mt-0">
    {#if bean}
        <div class="container-left">
            <img
                src={bean.image + "?w=400&h=400&fit=crop"}
                alt={bean.name}
                class="bean-image"
            />
        </div>
        <div class="container-right">
            <h1>{bean.name}</h1>
            <p><strong>Origin:</strong> {bean.country}</p>
            <p><strong>Roast:</strong> {bean.colour}</p>
            <p><strong>Price:</strong> £{bean.cost}</p>
            <br />
            <p class="description">{bean.description}</p>
        </div>
    {/if}
</div>

<style lang="scss">
    .container {
        display: flex;
        gap: 20px;
        flex-wrap: wrap;

        &-right {
            flex-basis: 480px;
            flex-grow: 1;
        }

        .bean-image {
            width: 100%;
            aspect-ratio: 1/1;
            object-fit: cover;
        }
    }
</style>
