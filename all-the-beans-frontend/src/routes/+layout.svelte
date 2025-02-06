<script lang="ts">
	import "../app.css";
	import NavBar from "../components/nav-bar.svelte";
	let { children } = $props();
</script>

<header class="header">
	<div class="header-left">
		<a href="/" class="logo">All The Beans&trade;</a>
	</div>
	<div class="header-right">
		<NavBar>
			{@render children()}
		</NavBar>
	</div>
</header>

{@render children()}

<footer>
	<div class="container">
		<p>All The Beans&trade; HQ</p>
		<p>123 Roastery Lane, Beanville, SR1 4PQ, UK</p>
		<p>Email: hello@allthebeans.com | Phone: +44 1234 567890</p>
	</div>
</footer>

<style lang="scss">
	.header {
		padding: 10px 20px;
		margin: 0 auto;
		border-bottom: #f5eedc 1px solid;
		height: 80px;
		max-width: 1200px;

		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 40px;

		&-left {
			.logo {
				font-weight: bold;
				color: #f5eedc;
				font-size: 20px;

				&:hover {
					color: #d4a373;
				}
			}
		}
		&-right {
			display: flex;
			align-items: center;
			flex-grow: 1;
			max-width: 1200px;
			justify-content: flex-end;
			gap: 100px;
		}
	}

	footer {
		margin-top: 40px;
		border-top: 2px solid #110604;
		background-image: url("/footer.jpg");
		width: 100%;
		height: fit-content;
		padding: 20px;
		background-size: 400px;
		background-repeat: repeat;

		.container {
			margin-top: 0;
			display: flex;
			gap: 20px 40px;
			flex-wrap: wrap;
		}
	}
</style>
