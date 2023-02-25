<svelte:head>
	<title>Title will be current folder name</title>
	<!-- Hotjar Tracking Code for my site -->
	<script>
		(function (h, o, t, j, a, r) {
			h.hj =
				h.hj ||
				function () {
					(h.hj.q = h.hj.q || []).push(arguments);
				};
			h._hjSettings = { hjid: 3383648, hjsv: 6 };
			a = o.getElementsByTagName('head')[0];
			r = o.createElement('script');
			r.async = 1;
			r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
			a.appendChild(r);
		})(window, document, 'https://static.hotjar.com/c/hotjar-', '.js?sv=');
	</script>
</svelte:head>

<nav>
	<div class="logo">
		<img
			src="https://nested.sfo3.digitaloceanspaces.com/assets%2Flanding-page-assets%2Flogo.png"
			alt="logo"
		/>
	</div>
	<a href="/">
		<span>Sign in</span>
	</a>
</nav>
<div>
	<p>Show shared collection and its children here</p>
</div>

<style lang="scss">
	nav {
		background-color: rgb(255, 255, 255);
		position: fixed;
		left: 0;
		top: 0;
		width: 100dvw;
		height: 4.5rem;
		display: flex;
		align-items: center;
		justify-content: space-between;

		.logo {
			height: 3.5rem;
			width: 3.5rem;
			display: flex;
			align-items: center;
			justify-content: center;
			margin-left: 1em;
			cursor: pointer;

			img {
				max-inline-size: 100%;
				object-fit: contain;
			}
		}

		a {
			text-decoration: none;
			background-color: $blue;
			padding: 0.5em 2em;
			margin-right: 1em;
			border-radius: 0.3rem;
			transition: all 200ms ease-in-out;

			span {
				font-family: 'Arial CE', sans-serif;
				color: white;
				font-size: 1.5rem;
				font-weight: 500;
			}

			&:hover {
				filter: brightness(90%);
				box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
			}
		}
	}
</style>
