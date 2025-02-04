<script lang="ts">
    import { onMount } from "svelte";
    import { api } from "../lib/api";
    import type { CoffeeBean } from "../lib/coffee-bean";
    import BeanDetails from "./bean-details.svelte";

    let bean: CoffeeBean | null = null;

    onMount(async () => {
        const response = await api.get<CoffeeBean>("/bean-of-the-day");
        bean = response.data;
        console.log(bean);
    });
</script>

<BeanDetails {bean}></BeanDetails>