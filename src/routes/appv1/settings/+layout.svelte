<script lang="ts">
	import { goto } from '$app/navigation';
	import { tick } from 'svelte';

	function backToDashboard() {
		goto('http://localhost:5173/appv1/my_links');
	}

	function goToPage() {
		goto('http://localhost:5173/appv1/settings/my_profile');
	}
</script>

<svelte:head>
	<title>Settings - Nested</title>
</svelte:head>

<div class="nav">
	<span on:click|preventDefault|stopPropagation={backToDashboard} on:keyup>Back to dashboard</span>
	<span>Need help?</span>
</div>

<ul class="sidebar">
	<div class="inner_cont">
		<li>
			<a
				href="http://localhost:5173/appv1/settings/my_profile"
				on:click|preventDefault|stopPropagation={goToPage}
			>
				<div class="my_profile">
					<i class="las la-user-alt" />
					<span>My profile</span>
				</div>
			</a>
		</li>
	</div>
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
		background-color: rgb(58, 79, 122);
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
			//text-decoration: underline;
			//text-decoration-color: $text-color-medium;
			color: white;
			padding: 0.3em 1em;
			background-color: whitesmoke;
			color: $text-color-regular-2;
			border-radius: 0.3rem;

			&:hover {
				background-color: rgb(255, 255, 255);
				//text-decoration-color: white;
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
		//background-color: rgb(251, 251, 250);
		overflow: auto;
		//background-color: rgb(58, 79, 122);
		background-color: rgb(255, 255, 255);
		display: flex;
		align-items: center;
		justify-content: center;

		.inner_cont {
			height: 95%;
			width: 95%;
			border-radius: 0.6rem;
			padding: 1em;
			box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;

			li {
				list-style: none;

				a {
					text-decoration: none;

					.my_profile {
						display: flex;
						align-items: center;
						gap: 1em;

						i {
							font-size: 2rem;
							color: white;
							color: $text-color-regular;
						}

						span {
							font-size: 1.3rem;
							font-family: 'Arial CE', sans-serif;
							color: $text-color-medium;
							text-decoration: underline;
							text-decoration-color: transparent;
							color: white;
							color: $text-color-regular;

							&:hover {
								color: white;
								text-decoration-color: white;
								color: $text-color-regular;
								text-decoration-color: $text-color-regular;
							}
						}
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
