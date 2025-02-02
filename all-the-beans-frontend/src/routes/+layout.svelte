<script lang="ts">
	import "../app.css";
	let { children } = $props();
</script>

<header class="header">
	<div class="header-left">
		<div class="logo">All The Beans&trade;</div>
	</div>
	<div class="header-right">
		<div class="search">
			<form action="/discover">
				<input
					type="text"
					name="search-text"
					id="search-text"
					placeholder="Search our beans..."
					class="search-bar"
				/>
				<button class="search-button" type="submit">
					Search
					<img src="search-icon.svg" alt="Search" />
				</button>
			</form>
		</div>
		<nav class="nav-links">
			<a href="/" class="nav-link">Home</a>
			<a href="/discover" class="nav-link">Discover</a>
			<a href="/bean-of-the-day" class="nav-link">Bean of the Day</a>
			<a href="/sign-in" class="nav-link">Sign In</a>
		</nav>
	</div>
</header>

{@render children()}

<footer></footer>

<style lang="scss">
	.header {
		padding: 10px 20px;
		margin: 0 auto;
		border-bottom: #2a140e 1px solid;
		height: 80px;
		max-width: 1200px;

		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 40px;

		&-left {
			.logo {
				font-weight: bold;
				color: #2a140e;
				font-size: 20px;
			}
		}
		&-right {
			display: flex;
			align-items: center;
			flex-grow: 1;
			max-width: 1200px;
			justify-content: flex-end;
			gap: 100px;

			form {
				display: flex;
				gap: 10px;

				.search {
					&-bar {
						padding: 0 10px;
						border-left: #aaaaaa 1px solid;
						border-right: #aaaaaa 1px solid;

						&:focus-visible {
							outline: none;
						}
					}

					&-button {
						display: flex;
						gap: 5px;
						padding: 5px 10px;
						border-radius: 5px;
						border: #2a140e 2px solid;
						color: #2a140e;
						font-weight: 600;

						&:hover{
							background-color: #2a140e11;
						}

						&:active{
							background-color: #2a140e55;
						}
					}
				}
			}

			.nav {
				&-links {
					display: flex;
					gap: 40px;
				}

				&-link {
				}
			}
		}
	}
</style>
