<script lang="ts">
    export function submitForm(event: SubmitEvent): void {
        event.preventDefault();

        // Get the search text from the form and use it to redirect
        // the user to the discover page with the query pre-filled
        const form = event.target as HTMLFormElement;
        const searchText = form.elements.namedItem(
            "search-text",
        ) as HTMLInputElement;

        // I'm using window.location.href rather than svelte's 'goto' so that the state fully resets on load of the discover page
        window.location.href = `/discover?search-text=${searchText.value}`;
    }
</script>

<div class="search">
    <form onsubmit={submitForm}>
        <input
            type="text"
            name="search-text"
            id="search-text"
            placeholder="Search our beans..."
            class="search-bar"
        />
        <button class="search-button" type="submit">
            Search
            <img src="/search-icon.svg" alt="Search" />
        </button>
    </form>
</div>

<style lang="scss">
    .search {
        margin-bottom: 40px;
        form {
            display: flex;
            gap: 10px;
            flex-wrap: wrap;
            max-width: 400px;
        }

        &-bar {
            padding: 0 10px;
            border-left: #f5eedc 2px solid;
            border-right: #f5eedc 2px solid;
            background-color: #f5eedc22;
            caret-color: #f5eedc;
            color: #f5eedc;
            min-height: 40px;
            flex-grow: 1;

            &::placeholder {
                color: #f5eedc;
            }

            &:focus-visible {
                outline: none;
            }
        }

        &-button {
            display: flex;
            min-height: 40px;
            gap: 5px;
            padding: 5px 10px;
            border-radius: 5px;
            border: #f5eedc 2px solid;
            color: #f5eedc;
            font-weight: 600;
            flex-grow: 1;
            justify-content: center;

            &:hover {
                background-color: #f5eedc22;
            }

            &:active {
                background-color: #fefefe55;
            }
        }
    }
</style>
