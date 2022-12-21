<script lang="ts">
	import { goto } from '$app/navigation';

	function backToDashboard() {
		goto('http://localhost:5173/appv1/my_links');
	}

	function goToPage() {
		goto('http://localhost:5173/appv1/settings/my_profile');
	}
</script>

<div class="nav">
	<span on:click|preventDefault|stopPropagation={backToDashboard} on:keyup>Back to dashboard</span>
	<span>Need help?</span>
</div>

<ul class="sidebar">
	<li>
		<a
			href="http://localhost:5173/appv1/settings/my_profile"
			on:click|preventDefault|stopPropagation={goToPage}
		>
			<span>My profile</span>
		</a>
	</li>
</ul>

<div class="profile" />

<slot />

<style lang="scss">
	.nav {
		position: fixed;
		top: 0;
		left: 0;
		height: 7vh;
		width: 100vw;
		background-color: white;
		z-index: 100;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 1em;
		//box-shadow: rgb(0 0 0 / 5%) 0px 6px 24px 0px, rgb(0 0 0 / 8%) 0px 0px 0px 1px;
		border-bottom: 0.1rem solid $border-color-regular;

		span {
			font-family: 'Arial CE', sans-serif;
			font-size: 1.3rem;
			color: $text-color-medium;
			cursor: pointer;
			text-decoration: underline;
			text-decoration-color: $text-color-medium;

			&:hover {
				text-decoration-color: $text-color-regular;
				color: $text-color-regular;
			}
		}
	}

	.sidebar {
		position: fixed;
		top: 7vh;
		left: 0;
		width: 20%;
		height: calc(100vh - 7vh);
		max-height: calc(100vh - 7vh);
		background-color: rgb(251, 251, 250);
		padding-top: 2em;
		overflow: auto;
		padding: 1em;

		li {
			list-style: none;

			a {
				text-decoration: none;

				span {
					font-size: 1.3rem;
					font-family: 'Arial CE', sans-serif;
					color: $text-color-medium;
					text-decoration: underline;
					text-decoration-color: transparent;

					&:hover {
						color: $text-color-regular;
						text-decoration-color: $text-color-regular;
					}
				}
			}
		}
	}

	.profile {
		height: 100vh;
		width: 100vw;
		background-color: white;
		//background-color: $blue;
	}
</style>
