<script lang="ts">
	import { SwitchOffCreateMode } from '$lib/utils/switchOffCreateMode';
	import { stop_propagation } from 'svelte/internal';
	import { createMode } from '../../stores/stores';
	import { showCreateFolderForm } from '$lib/utils/toggleCreateFolderForm';
	import { showAddLinkForm } from '$lib/utils/showAddLinkForm';
</script>

{#if $createMode}
	<div class="wrapper" on:click|preventDefault|stopPropagation={SwitchOffCreateMode} on:keyup>
		<div class="card" on:keydown|stopPropagation={stop_propagation}>
			<div class="top">
				<span>What do you want to do?</span>
				<i
					class="las la-times"
					on:click|preventDefault|stopPropagation={SwitchOffCreateMode}
					on:keyup
				/>
			</div>
			<div class="choices">
				<div
					class="collection"
					on:click|preventDefault|stopPropagation={showCreateFolderForm}
					on:keyup
				>
					<i class="las la-folder-open" />
					<span>Create collection</span>
				</div>
				<div class="link" on:click|preventDefault|stopPropagation={showAddLinkForm} on:keyup>
					<i class="las la-link" />
					<span>Add link</span>
				</div>
			</div>
		</div>
	</div>
{/if}

<style lang="scss">
	.wrapper {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		z-index: 1000;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: rgba(0, 0, 0, 0.4);
		backdrop-filter: blur(8px);

		.card {
			height: 30rem;
			width: 40rem;
			background-color: rgb(255, 255, 255);
			border-radius: 0.6rem;
			box-shadow: $modal_box_shadow;
			display: flex;
			flex-direction: column;
			padding: 2em;
			animation: animate_card 0.5s ease-in-out;

			.top {
				height: 10%;
				display: flex;
				align-items: center;
				justify-content: space-between;

				span {
					font-family: 'Arial CE', sans-serif;
					font-size: 1.5rem;
					color: $text-color-regular;
				}

				i {
					font-size: 1.8rem;
					color: $text-color-regular;
					cursor: pointer;
					background-color: transparent;
					border-radius: 100vh;
					padding: 0.1em;
					transition: background-color 150ms ease-in-out;

					&:hover {
						background-color: $gray;
					}
				}
			}

			.choices {
				height: 90%;
				display: flex;
				align-items: center;
				justify-content: space-between;
				gap: 1em;

				div {
					flex: 1;
					//border: 0.1rem solid $yellow;
					height: 70%;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					gap: 1em;
					border-radius: 0.5rem;
					cursor: pointer;
					background-color: $gray;
					transition: all 150ms ease-in-out;

					i {
						font-size: 2.5rem;
					}

					span {
						font-size: 1.3rem;
						font-family: 'Arial CE', sans-serif;
						color: $text-color-regular;
						transition: all 150ms ease-in-out;
					}

					&:hover {
						box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;

						// i {
						// 	color: $blue;
						// }
					}
				}

				.link {
					i {
						font-size: 2.7rem;
					}
				}
			}
		}

		@keyframes animate_card {
			0% {
				transform: translateY(-50px);
				opacity: 0;
			}

			100% {
				transform: translateY(0);
				opacity: 1;
			}
		}
	}
</style>
