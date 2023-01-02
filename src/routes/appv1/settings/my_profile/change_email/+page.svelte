<script lang="ts">
	import { goto } from '$app/navigation';

	let email: string = '';

	function backToProfile() {
		goto('http://localhost:5173/appv1/settings/my_profile');
	}

	function handleFormSubmit() {
		sessionStorage.removeItem('new_email');

		sessionStorage.setItem('new_email', email);
	}
</script>

<svelte:head>
	<title>Change email - Nested</title>
</svelte:head>

<div class="change_email">
	<!-- <div class="top_nav">
		<svg
			width="20px"
			height="20px"
			stroke-width="1.5"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			color="#000000"
			><path
				d="M18.5 12H6m0 0l6-6m-6 6l6 6"
				stroke="#000000"
				stroke-width="1.5"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
		<span on:click|preventDefault|stopPropagation={backToProfile} on:keyup>Back to profile</span>
	</div> -->
	<form class="email">
		<!-- <label for="email">Your new email address</label> -->
		<div class="input-box">
			<input
				type="email"
				name="email"
				id="email"
				placeholder="Enter new email address"
				autocomplete="off"
				bind:value={email}
			/>
			<span>We’ll send a code to your new email address to verify it.</span>
		</div>
		<button on:click|preventDefault|stopPropagation={handleFormSubmit}>
			<span>Get verification code</span>
		</button>
	</form>
</div>

<style lang="scss">
	.change_email {
		position: fixed;
		top: 7vh;
		left: 20%;
		width: calc(100% - 20%);
		max-width: calc(100% - 20%);
		height: calc(100vh - 7vh);
		max-height: calc(100vh - 7vh);

		// .top_nav {
		// 	display: flex;
		// 	align-items: center;
		// 	gap: 0.5em;
		// 	cursor: pointer;
		// 	padding: 2em;

		// 	svg {
		// 		path {
		// 			stroke: $text-color-medium;
		// 		}
		// 	}

		// 	span {
		// 		font-size: 1.3rem;
		// 		font-family: 'Arial CE', sans-serif;
		// 		color: $text-color-medium;
		// 	}

		// 	&:hover {
		// 		svg {
		// 			path {
		// 				stroke: $text-color-regular;
		// 			}
		// 		}

		// 		span {
		// 			color: $text-color-regular;
		// 		}
		// 	}
		// }

		form.email {
			width: 100%;
			height: 100%;
			overflow: auto;
			padding-top: 2em;
			display: flex;
			flex-direction: column;
			gap: 1em;
			padding: 2em;

			// label {
			// 	font-size: 1.2rem;
			// 	font-family: 'Product Sans Medium', sans-serif;
			// 	font-weight: 500;
			// 	text-transform: uppercase;
			// }

			.input-box {
				display: flex;
				flex-direction: column;
				gap: 0.3em;
				width: 100%;

				input[type='email'] {
					padding: 0.5em;
					font-family: 'Arial CE', sans-serif;
					border: 0.1rem solid $border-color-regular;
					outline: transparent;
					background-color: rgb(239, 243, 246);

					&::placeholder {
						font-family: 'Arial CE', sans-serif;
						color: $text-color-medium;
					}

					&:hover {
						box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
					}

					&:focus {
						box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
					}
				}

				span {
					font-family: 'Arial CE', sans-serif;
					color: $text-color-medium;
					font-size: 1.2rem;
				}
			}

			button {
				width: max-content;
				padding: 0.5em;
				border: none;
				background-color: $blue;
				cursor: pointer;

				span {
					font-size: 1.3rem;
					font-weight: 500;
					color: white;
					font-family: 'Arial CE', sans-serif;
				}

				&:hover {
					box-shadow: rgba(255, 255, 255, 0.2) 0px 0px 0px 1px inset,
						rgba(0, 0, 0, 0.9) 0px 0px 0px 1px;
				}
			}
		}
	}
</style>
