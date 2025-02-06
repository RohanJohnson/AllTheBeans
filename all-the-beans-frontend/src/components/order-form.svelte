<script lang="ts">
    import type { CoffeeBean } from "../lib/coffee-bean";
    export let bean: CoffeeBean;

    type Errors = {
        name?: string;
        email?: string;
        beanId?: string;
        quantity?: string;
    };

    let name: string = "";
    let email: string = "";
    let beanId: string = `${bean.id}`;
    let quantity: number = 1;
    let errors: Errors = {};
    let success: boolean = false;

    // Validate form data
    // I opted to use this rather than the built in HTML5 validation so that
    // I could display the user's errors to them in a way that feels integrated
    // with the site.
    function validateForm(): boolean {
        errors = {};

        if (!name.trim()) {
            errors.name = "Name is required.";
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailPattern.test(email)) {
            errors.email = "Please enter a valid email address.";
        }

        if (!beanId) {
            errors.beanId = "Please select a coffee bean.";
        }

        if (quantity < 1) {
            errors.quantity = "Quantity must be at least 1.";
        }

        return Object.keys(errors).length === 0;
    }

    async function submitOrder(): Promise<void> {
        // If there are any errors, do not submit order
        if (!validateForm()) return;

        try {
            // Send the order to the API endpoint
            const response = await fetch("http://localhost:3000/orders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, beanId, quantity }),
            });

            // If recieve a HTTP 200 code, tell the user their order has been made
            if (response.ok) {
                success = true;
                name = email = beanId = "";
                quantity = 1;
                errors = {};
            } 
            // If the request was not a success, relay that to the user
            else {
                alert("Failed to submit the order. Please try again.");
            }
        } catch (error) {
            alert("An error occurred while submitting the order.");
            console.error(error);
        }
    }
</script>

<form on:submit|preventDefault={submitOrder}>
    <p class="title">Order {bean.name}</p>
    {#if success}
        <p>Your order has been placed successfully!</p>
    {/if}
    <label>
        Name:
        <input
            type="text"
            bind:value={name}
            class={errors.name ? "error" : ""}
        />
        {#if errors.name}<p class="error-message">{errors.name}</p>{/if}
    </label>

    <label>
        Email:
        <input
            type="email"
            bind:value={email}
            class={errors.email ? "error" : ""}
        />
        {#if errors.email}<p class="error-message">{errors.email}</p>{/if}
    </label>

    <label>
        Quantity:
        <input
            type="number"
            bind:value={quantity}
            min="1"
            class={errors.quantity ? "error" : ""}
        />
        {#if errors.quantity}<p class="error-message">{errors.quantity}</p>{/if}
    </label>

    <button type="submit">Place Order</button>
</form>

<style lang="scss">
    form {
        display: flex;
        flex-direction: column;
        gap: 10px;
        max-width: 600px;
        background-color: #f5eedc;
        padding: 20px;
        border-radius: 12px;
        margin-top: 40px;
        flex-basis: 600px;
        width: 100%;

        p{
            
            color: #2a140e;
        
        &.title {
            text-transform: uppercase;
            font-size: 24px;
            font-weight: bold;
        }
        }

        label {
            color: #2a140e;
            display: flex;
            flex-direction: column;
        }
        input {
            color: #2a140e;
            padding: 5px 10px;
            font-size: 20px;
            border-radius: 6px;
        }

        .error {
            border: 1px solid red;
            &-message {
                color: red;
                font-size: 0.9em;
            }
        }

        button {
            padding: 10px 20px;
            background-color: #2a140e;
            color: #fff;
            border: none;
            border-radius: 5px;
            margin-top: 20px;
            cursor: pointer;

            &:hover {
                background-color: #3b1d12;
            }
        }
    }
</style>
