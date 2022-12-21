<script lang="ts">
	import { hideShowOptionsMenu } from '$lib/types/hideShowOptionsMenu';
	import { hideContextMenu } from '$lib/utils/hideContextMenu';
	import { hideSelectShowCategoryMenu } from '$lib/utils/hideSelectSearchCategory';
	import { toggleSelectSearchCategoryMenu } from '$lib/utils/toggleSelectSearchCategory';
	import { onMount, stop_propagation } from 'svelte/internal';
	import { activeSearchCategory, showSelectSearchCategory } from '../../stores/stores';

	let el: HTMLOptionElement;
	let optionValue: string;

	onMount(() => {
		const input = document.getElementById('search') as HTMLInputElement;

		input.focus();
	});

	function toggleSearchCategory() {
		hideContextMenu();

		toggleSelectSearchCategoryMenu();
	}

	function selectSearchCategory() {
		el = window.event?.currentTarget as HTMLOptionElement;

		optionValue = el.value;

		if (optionValue === 'links') {
			activeSearchCategory.set('My links');
		} else if (optionValue === 'folders') {
			activeSearchCategory.set('My folders');
		}

		hideSelectShowCategoryMenu();
	}

	function handleSearch() {
		hideContextMenu();

		hideSelectShowCategoryMenu();
	}
</script>

<div class="search">
	<form>
		<div
			class="select_search_category"
			on:click|preventDefault|stopPropagation={toggleSearchCategory}
			on:keyup
		>
			<div class="search_category">
				<span>{$activeSearchCategory}</span>
			</div>
			{#if $showSelectSearchCategory}
				<div class="icon">
					<svg
						width="24px"
						height="24px"
						stroke-width="1.5"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						color="#000000"
						><path
							d="M6 15l6-6 6 6"
							stroke="#000000"
							stroke-width="1.5"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
				</div>
			{:else}
				<div class="icon">
					<svg
						width="24px"
						height="24px"
						stroke-width="1.5"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						color="#000000"
						><path
							d="M6 9l6 6 6-6"
							stroke="#000000"
							stroke-width="1.5"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
				</div>
			{/if}

			{#if $showSelectSearchCategory}
				<div class="options">
					<option
						value="links"
						on:click|preventDefault|stopPropagation={selectSearchCategory}
						class:active={$activeSearchCategory === 'My links'}>My links</option
					>
					<option
						value="folders"
						on:click|preventDefault|stopPropagation={selectSearchCategory}
						class:active={$activeSearchCategory === 'My folders'}>My folders</option
					>
				</div>
			{/if}
		</div>
		<input
			type="search"
			name="search"
			id="search"
			placeholder={`Search my ${$activeSearchCategory === 'My links' ? 'links' : 'folders'}...`}
			on:click|stopPropagation={stop_propagation}
		/>
		<button type="submit" on:click|preventDefault|stopPropagation={handleSearch}>
			<span>Go</span>
		</button>
	</form>
</div>

<style lang="scss">
	.search {
		position: fixed;
		left: 0;
		top: 0;
		width: 100vw;
		height: 100vh;
		display: flex;
		z-index: 200;
		background-color: #fff9b0;

		form {
			display: flex;
			align-items: center;
			height: 7vh;
			width: 100%;
			background-color: white;
			border: 0.1rem solid $border-color-regular;
			border-left: none;
			border-right: none;

			.select_search_category {
				height: 100%;
				display: flex;
				align-items: center;
				background-color: rgb(30, 144, 255);
				background-color: rgb(241, 243, 244);
				position: relative;
				min-width: 10%;
				cursor: pointer;

				.search_category {
					width: 80%;
					height: 100%;
					display: flex;
					align-items: center;

					span {
						color: white;
						color: $text-color-regular;
						padding-left: 1em;
						font-family: 'Product Sans Medium', sans-serif;
						font-size: 1.3rem;
						font-weight: 500;
					}
				}

				.icon {
					width: 20%;
					height: 100%;
					display: flex;
					align-items: center;
					justify-content: center;

					svg {
						path {
							fill: white;
							fill: $text-color-regular;
							stroke: transparent;
						}
					}
				}

				.options {
					position: absolute;
					top: 100%;
					left: 0;
					right: 0;
					height: max-content;
					background-color: rgb(30, 144, 255);
					background-color: rgb(241, 243, 244);
					z-index: 100;

					option {
						height: 7vh;
						padding-left: 1em;
						font-size: 1.3rem;
						font-weight: 500;
						font-family: 'Product Sans Medium', sans-serif;
						color: white;
						color: $text-color-regular-2;
						display: flex;
						align-items: center;
						border-top: 0.1rem solid rgba(0, 0, 0, 0.1);

						&:hover {
							background-color: rgb(27, 129, 229);
							background-color: rgb(241, 243, 244);
							color: white;
							color: $text-color-regular;
						}
					}

					// .active {
					// 	background-color: rgb(27, 129, 229);
					// }
				}
			}

			input[type='search'] {
				min-width: 80%;
				height: 100%;
				border: none;
				outline: none;
				padding: 0 0.5em;
				font-family: 'Arial CE', sans-serif;
				background-color: rgb(241, 243, 244);

				&::placeholder {
					font-family: 'Arial CE', sans-serif;
				}

				&:focus {
					background-color: white;
				}
			}

			button[type='submit'] {
				min-width: 10%;
				height: 100%;
				border: none;
				outline: none;
				background-color: $yellow;
				cursor: pointer;
				transition: all 200ms ease-in-out;

				span {
					font-size: 1.5rem;
					font-family: 'Arial CE', sans-serif;
					font-family: 'Product Sans Medium', sans-serif;
					color: $text-color-regular;
				}

				&:hover {
					background-color: #fce700;
				}
			}
		}
	}
</style>
