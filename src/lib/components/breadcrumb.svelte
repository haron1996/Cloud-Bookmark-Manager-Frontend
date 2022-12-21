<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { getAncestorsOfCurrentFolder } from '$lib/utils/getAncestorsOfCurrentFolder';
	import { ancestorsOfCurrentFolder } from '../../stores/stores';
	import { resetAncestorsOfCurrentFolder } from '$lib/utils/resetAncestorsOfCurrentFolder';

	export let rootFolderName: string = '';
</script>

<div class="breadcrumb">
	<nav>
		<ul>
			<li
				on:click|preventDefault|stopPropagation={() => {
					goto('http://localhost:5173/appv1/my_links');
				}}
				on:keyup
			>
				<span>{rootFolderName === '' ? 'My links' : rootFolderName}</span>
			</li>
			<div class="separator">
				<span>&#8594;</span>
			</div>
			{#if $ancestorsOfCurrentFolder.length > 0}
				{#each $ancestorsOfCurrentFolder as { folder_name, folder_id }}
					<div class="separator">
						<span>&#8594;</span>
					</div>
					<li data-id={folder_id}>
						<span
							on:click|preventDefault|stopPropagation={() => {
								goto(`http://localhost:5173/appv1/my_links/${folder_id}`);
							}}
							on:keyup>{folder_name}</span
						>
					</li>
				{/each}
			{/if}
		</ul>
	</nav>
</div>

<style lang="scss">
	.breadcrumb {
		position: absolute;
		top: 0;
		left: 0;
		height: 7vh;
		width: 100vw;
		z-index: 15;
		display: flex;
		align-items: center;
		justify-content: space-between;
		background-color: transparent;

		nav {
			width: 100%;
			height: 100%;
			padding-left: 0.5em;
			display: flex;
			align-items: center;
			overflow-x: scroll;

			ul {
				display: flex;
				align-items: center;
				height: 100%;
				gap: 0.3em;
				width: min-content;
				inline-size: max-content;
				max-width: inherit;

				.separator {
					display: flex;
					align-items: center;
					justify-content: center;
					height: 75%;

					span {
						height: 100%;
						display: flex;
						align-items: center;
						justify-content: center;
						font-size: 1.3rem;
						color: #565959;
					}
				}

				.separator:first-of-type {
					span {
						display: none;
					}
				}

				li {
					list-style: none;
					height: 100%;
					inline-size: max-content;
					display: flex;
					align-items: center;

					span {
						text-decoration: none;
						display: flex;
						align-items: center;
						justify-content: center;
						height: 55%;
						backdrop-filter: brightness(100%);
						inline-size: max-content;
						padding: 0 1em;
						border-radius: 0.3rem;
						color: #565959;
						font-family: 'Product Sans Medium', sans-serif;
						font-size: 1.1rem;
						cursor: pointer;
						//background-color: rgb(30, 144, 255);
						box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;

						&:hover {
							//backdrop-filter: brightness(95%);
							box-shadow: rgba(255, 255, 255, 0.2) 0px 0px 0px 1px inset,
								rgba(0, 0, 0, 0.9) 0px 0px 0px 1px;
							background-color: $yellow;
							color: $text-color-regular;
						}
					}
				}

				li:last-of-type {
					pointer-events: none;

					span {
						color: $text-color-regular;
					}
				}
			}
		}
	}
</style>
