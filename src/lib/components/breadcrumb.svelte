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
					goto(`${$page.url.origin}/appv1/my_links`);
					//window.location.href = '/appv1/my_links';
				}}
				on:keyup
			>
				<span>{rootFolderName === '' ? 'Home' : rootFolderName}</span>
			</li>
			<i class="las la-long-arrow-alt-right" />
			{#if $ancestorsOfCurrentFolder.length > 0}
				{#each $ancestorsOfCurrentFolder as { folder_name, folder_id }}
					<i class="las la-long-arrow-alt-right" />
					<li data-id={folder_id}>
						<span
							on:click|preventDefault|stopPropagation={() => {
								goto(`${$page.url.origin}/appv1/my_links/${folder_id}`);
								//window.location.href = `/appv1/my_links/${folder_id}`;
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
		height: 3.5rem;
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
			padding-left: 1em;

			ul {
				display: flex;
				align-items: center;
				height: 100%;
				gap: 1em;
				width: min-content;
				inline-size: max-content;
				max-width: inherit;

				i {
					font-size: 1.3rem;

					&:first-of-type {
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
						color: $text-color-light;
						font-family: 'Arial CE', sans-serif;
						font-size: 1.25rem;
						cursor: pointer;
					}

					&:last-of-type {
						pointer-events: none;

						// span {
						// 	color: $text-color-medium;
						// }
					}

					&:not(li:last-of-type) {
						&:hover {
							span {
								color: $text-color-regular;
								text-decoration: underline;
							}
						}
					}
				}
			}
		}
	}
</style>
