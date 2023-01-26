<script lang="ts">
	import { afterNavigate, goto } from '$app/navigation';
	import Googlebutton from './googlebutton.svelte';
	import Logo from '$lib/images/logo.png';
	import { page } from '$app/stores';

	async function goToSignIn() {
		//await goto('http://localhost:5173/accounts/sign_in');
		window.location.href = '/accounts/sign_in';
	}
</script>

<nav>
	<div class="logo-sec">
		<a href={$page.url.origin} class="logo">
			<img src={Logo} alt="logo" />
		</a>
	</div>
	<!-- <div class="google_button">
		<Googlebutton />
	</div> -->
	<div class="links">
		{#if $page.url.pathname !== '/accounts/sign_in'}
			<a href="/accounts/sign_in" class="sign_in">
				<span>Sign in</span>
			</a>
		{/if}
		{#if $page.url.pathname !== '/accounts/email'}
			<a href="/accounts/email" class="signup">
				<span>Create my free account</span>
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
		//box-shadow: rgb(0 0 0 / 5%) 0px 6px 24px 0px, rgb(0 0 0 / 8%) 0px 0px 0px 1px;
		border-bottom: 0.1rem solid $border-color-regular;

		.logo-sec {
			min-width: max-content;
			height: 100%;
			display: flex;
			align-items: center;

			.logo {
				display: flex;
				align-items: center;
				width: max-content;
				gap: 0.3em;
				font-family: 'Product Sans Black', sans-serif;
				cursor: pointer;
				margin-left: 1em;
				height: 3.5rem;
				width: 3.5rem;

				img {
					width: 100%;
					object-fit: contain;
				}
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
			padding-right: 1.5em;

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
				transition: all 200ms ease-in-out;
				padding: 0.5em 1em;

				span {
					font-size: 1.5rem;
					color: $text-color-regular-2;
					font-family: 'Arial CE', sans-serif;
					font-weight: 500;
				}
			}

			a.sign_in {
				background-color: $yellow;

				span {
					color: rgb(0, 95, 153);
				}
			}

			a.signup {
				background-color: $blue;

				span {
					color: white;
				}

				&:hover {
					box-shadow: rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em,
						rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;
				}
			}
		}
	}
</style>
