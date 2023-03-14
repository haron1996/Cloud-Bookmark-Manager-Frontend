<script lang="ts">
	import { afterNavigate, goto } from '$app/navigation';
	import Googlebutton from './googleIconButton.svelte';
	import Logo from '$lib/images/logo.png';
	import { page } from '$app/stores';

	function goToHomePage() {
		goto($page.url.origin);
	}

	async function goToSignIn() {
		//await goto('http://localhost:5173/accounts/sign_in');
		window.location.href = '/accounts/sign_in';
	}
</script>

<nav>
	<div class="logo-sec">
		<!-- <a href={$page.url.origin} class="logo"> -->
		<img
			src="https://ewr1.vultrobjects.com/app-assets/5b1c843f-4e62-442e-9988-90c4fae1e737"
			alt="logo"
			on:click|preventDefault|stopPropagation={goToHomePage}
			on:keyup
		/>
		<!-- </a> -->
	</div>
	<!-- <div class="google_button">
		<Googlebutton />
	</div> -->
	<div class="links">
		<div class="g_button_wrapper">
			<Googlebutton />
		</div>
		{#if $page.url.pathname !== '/accounts/sign_in'}
			<a
				href="/accounts/sign_in"
				class="sign_in"
				class:hide_button={$page.url.pathname === '/accounts/email'}
			>
				<span>Sign in</span>
			</a>
		{/if}
		{#if $page.url.pathname !== '/accounts/email'}
			<a
				href="/accounts/email"
				class="signup"
				class:hide_button={$page.url.pathname === '/accounts/sign_in'}
			>
				<span>Sign up</span>
			</a>
		{/if}
	</div>
</nav>

<style lang="scss">
	nav {
		display: flex;
		align-items: center;
		position: fixed;
		top: 0;
		left: 0;
		height: 4.5rem;
		width: 100vw;
		justify-content: space-between;
		border-bottom: 0.1rem solid $border-color-regular;

		.logo-sec {
			min-width: max-content;
			height: 100%;
			display: flex;
			align-items: center;

			// .logo {
			// 	display: flex;
			// 	align-items: center;
			// 	width: max-content;
			// 	gap: 0.3em;
			// 	font-family: 'Product Sans Black', sans-serif;
			// 	cursor: pointer;
			// 	margin-left: 1em;
			// 	height: 3.7rem;
			// 	width: 3.7rem;

			img {
				width: 3.8rem;
				object-fit: contain;
				margin-left: 1em;
				cursor: pointer;
			}
		}

		.links {
			min-width: 50%;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: flex-end;
			//background-color: $blue;
			gap: 1em;
			padding-right: 1em;

			a {
				text-decoration: none;
				text-decoration-style: solid;
				text-decoration-color: $text-color-medium;
				transition: all 200ms ease-in-out;
				min-width: max-content;
				display: flex;
				align-items: center;
				justify-content: center;
				border-radius: 0.3rem;
				padding: 0.5em 1em;
				outline-color: transparent;

				span {
					font-size: 1.5rem;
					color: $text-color-regular-2;
					font-family: 'Arial CE', sans-serif;
					font-weight: 500;
					color: $text-color-dropbox;
				}
			}

			a.sign_in {
				background-color: transparent;
				border: 0.1rem solid $border-color-regular;

				&:hover {
					border: 0.1rem dashed $blue;
				}
			}

			a.signup {
				background-color: $blue;
				border: 0.1rem solid $blue;

				span {
					color: white;
				}

				&:hover {
					filter: brightness(95%);
				}
			}
		}
	}

	:global(.hide_button) {
		display: none !important;
	}
</style>
