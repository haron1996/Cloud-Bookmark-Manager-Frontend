<script lang="ts">
	import { goto } from '$app/navigation';
	import Googlebutton from './googlebutton.svelte';

	async function goToSignIn() {
		//await goto('http://localhost:5173/accounts/sign_in');
		window.location.href = '/accounts/sign_in';
	}
</script>

<nav>
	<div class="logo-sec">
		<div class="logo">
			<svg
				width="24px"
				height="24px"
				stroke-width="1.5"
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				color="#000000"
				><path
					d="M8.5 12h7v10L12 20l-3.5 2V12z"
					stroke="#000000"
					stroke-width="1.5"
					stroke-linecap="round"
					stroke-linejoin="round"
				/><path
					d="M20 17.607c1.494-.585 3-1.918 3-4.607 0-4-3.333-5-5-5 0-2 0-6-6-6S6 6 6 8c-1.667 0-5 1-5 5 0 2.689 1.506 4.022 3 4.607"
					stroke="#000000"
					stroke-width="1.5"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
			<strong>BookmarkManager</strong>
		</div>
	</div>
	<!-- <div class="google_button">
		<Googlebutton />
	</div> -->
	<div class="sign_in">
		<a
			href="http://localhost:5173/accounts/email"
			on:click|preventDefault|stopPropagation={goToSignIn}
		>
			<span>Sign in</span>
		</a>
	</div>
</nav>

<style lang="scss">
	nav {
		display: flex;
		align-items: center;
		position: fixed;
		top: 0;
		left: 0;
		height: 10vh;
		width: 100%;

		.logo-sec {
			min-width: 90%;
			height: 100%;
			display: flex;
			align-items: center;

			.logo {
				display: flex;
				align-items: center;
				width: max-content;
				gap: 1em;
				font-family: 'Product Sans Black', sans-serif;
				cursor: pointer;
				margin-left: 2em;

				strong {
					font-size: 1.5rem;
					color: $text-color-regular;
					color: rgb(29, 45, 53);
					font-weight: 600;
					letter-spacing: -0.025em;
					line-height: 1.485em;
				}
			}
		}

		.sign_in {
			min-width: 10%;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;

			a {
				text-decoration: underline;
				text-decoration-style: solid;
				text-decoration-color: $text-color-medium;
				transition: all 200ms ease-in-out;

				span {
					font-size: 1.5rem;
					color: $text-color-medium;
					font-family: 'Arial CE', sans-serif;
					transition: all 200ms ease-in-out;
				}

				&:hover {
					text-decoration-color: $text-color-regular;
					span {
						color: $text-color-regular;
					}
				}
			}
		}
	}
</style>
