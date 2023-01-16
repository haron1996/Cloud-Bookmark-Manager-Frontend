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
			<i class="las la-fill-drip" />
			<!-- <span>bookmarkbucket</span> -->
		</div>
	</div>
	<!-- <div class="google_button">
		<Googlebutton />
	</div> -->
	<div class="links">
		<a
			href="https://www.bookmarkbucket.com/accounts/email"
			on:click|preventDefault|stopPropagation={goToSignIn}
		>
			<span>Sign In</span>
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
		height: 7vh;
		width: 100%;
		justify-content: space-between;

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
				margin-left: 2em;

				i {
					color: $blue;
					font-size: 4rem;
				}

				// span {
				// 	font-size: 2rem;
				// 	font-family: 'Product Sans Medium', sans-serif;
				// 	//text-transform: capitalize;
				// 	font-family: 'Product Sans Black', sans-serif;
				// }
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
				background-color: $blue;
				min-width: 7rem;
				display: flex;
				align-items: center;
				justify-content: center;
				min-height: 3.5rem;
				border-radius: 0.3rem;
				transition: all 200ms ease-in-out;

				span {
					font-size: 1.5rem;
					color: white;
					font-family: 'Arial CE', sans-serif;
					font-weight: 600;
				}

				&:hover {
					box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
				}
			}
		}
	}
</style>
