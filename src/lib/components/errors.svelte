<script lang="ts">
	import { errors } from '../../stores/stores';

	let el: HTMLElement;

	function clearErrors() {
		el = document.getElementById('error') as HTMLDivElement;

		el.style.transform = 'translateX(500%)';

		setTimeout(() => {
			errors.set([]);
		}, 1000);
	}

	$: $errors,
		setTimeout(() => {
			clearErrors();
		}, 6000);
</script>

<div class="errors">
	{#if $errors.length > 0}
		{#each $errors as error}
			<div class="error" id="error">
				<svg
					width="20px"
					height="20px"
					stroke-width="1.5"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					color="#000000"
					><path
						d="M20.043 21H3.957c-1.538 0-2.5-1.664-1.734-2.997l8.043-13.988c.77-1.337 2.699-1.337 3.468 0l8.043 13.988C22.543 19.336 21.58 21 20.043 21zM12 9v4"
						stroke="#000000"
						stroke-width="1.5"
						stroke-linecap="round"
					/><path
						d="M12 17.01l.01-.011"
						stroke="#000000"
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
				<span>{error}</span>
				<svg
					width="20px"
					height="20px"
					stroke-width="1.5"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					color="#000000"
					class="cancel"
					id="cancel"
					on:click|preventDefault|stopPropagation={clearErrors}
					on:keyup
					><path
						d="M6.758 17.243L12.001 12m5.243-5.243L12 12m0 0L6.758 6.757M12.001 12l5.243 5.243"
						stroke="#000000"
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</div>
		{/each}
	{/if}
</div>

<style lang="scss">
	.errors {
		position: fixed;
		bottom: 0;
		right: 0;
		width: 100vw;
		height: 100vh;
		background-color: transparent;
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		justify-content: flex-end;
		z-index: 100;

		// ! ! fixing error

		.error {
			min-height: 5rem;
			min-width: 20rem;
			width: max-content;
			padding: 0.5em 1em;
			background-color: white;
			box-shadow: rgba(255, 255, 255, 0.2) 0px 0px 0px 1px inset, rgb(214, 28, 78) 0px 0px 0px 1px;
			margin-right: 3em;
			margin-bottom: 3em;
			display: flex;
			align-items: center;
			justify-content: center;
			gap: 1em;
			animation: zoom 0.5s ease-in-out;
			transition: all 200ms ease-in-out;

			svg {
				path {
					stroke: #ff9494;
					stroke: rgb(214, 28, 78);
				}
			}

			span {
				font-size: 1.3rem;
				font-weight: 500;
				font-family: 'Arial CE', sans-serif;
				color: #ff9494;
				color: rgb(214, 28, 78);
			}

			svg.cancel {
				cursor: pointer;
				transition: all 200ms ease-in-out;

				&:hover {
					path {
						stroke: #d61c4e;
					}
				}
			}

			@keyframes zoom {
				0% {
					transform: translateX(500%);
				}

				100% {
					transform: translateX(0);
				}
			}
		}
	}
</style>
