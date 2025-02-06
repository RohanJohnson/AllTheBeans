<script lang="ts">
    import { onMount } from "svelte";
    import { api } from "../../lib/api";
    import type { CoffeeBean } from "../../lib/coffee-bean";
    import BeanSearch from "../../components/bean-search.svelte";

    let beans: CoffeeBean[] | null = null;

    onMount(async () => {
        // Get query from URI
        const urlParams = new URLSearchParams(window.location.search);
        const searchText = urlParams.get("search-text");

        // If query exist, send an API request to search the database using it
        if (searchText) {
            const response = await api.get<CoffeeBean[]>(
                `/coffee-beans/search?query=${searchText}`,
            );
            beans = response.data;
            console.log(beans);
        } 
        // If the query doesn't exist, return all beans
        else {
            const response = await api.get<CoffeeBean[]>("/coffee-beans");
            beans = response.data;
            console.log(beans);
        }
    });
</script>

<div class="container">
    <h1>Discover our beans</h1>

    <BeanSearch></BeanSearch>

    <div class="beans">
        {#if beans}
            {#each beans as bean}
                <a href={`/discover/${bean.id}`} class="bean-card">
                    <img
                        src={bean.image + "?w=200&h=200&fit=crop"}
                        alt={bean.name}
                        class="bean-image"
                    />
                    <div class="bean-info">
                        <p>{bean.name}</p>
                        <p>{bean.colour}</p>
                        <p>{bean.country}</p>
                    </div>
                </a>
            {/each}
        {/if}
    </div>
</div>

<style lang="scss">
    .beans {
        display: flex;
        gap: 20px;
        flex-wrap: wrap;
        width: fit-content;
        margin: 0 auto;

        .bean-card {
            display: flex;
            flex-direction: column;
            width: 200px;

            img {
                filter: saturate(0.5);
                transition: 0.1s;
            }

            .bean-info {
                position: relative;
                height: 95px;
                bottom: 100px;
                left: 5px;
                background-color: #1a0a05dd;
                width: fit-content;
                padding: 5px 10px;
                transition: 0.1s;
                transform-origin: bottom left;
                margin-bottom: -80px;

                p {
                    text-transform: uppercase;
                }
                p:not(:first-child) {
                    border-top: #f5eedc 1px solid;
                }
            }

            &:hover {
                img {
                    filter: saturate(1);
                }
            }
        }
    }
</style>
