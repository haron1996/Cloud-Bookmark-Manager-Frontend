<script lang="ts">
	import { page } from "$app/stores";
	import { onMount } from "svelte";
    import { selectedFolders, selectedLinks, showFolderInTrashAlert } from "../../stores/stores";
    import { restoreLinksAndFoldersFromTrash } from "$lib/utils/restoreLinksAndFoldersFromTrash";
    import { restoreFoldersFromTrash } from "$lib/utils/restoreFoldersFromTrash";
    import { restoreLinksFromTrash } from "$lib/utils/restoreLinksFromTrash";
let pathname: string

    onMount(() => {
getPathname()
    })

    const getPathname = () => {
page.subscribe((value) => {
    pathname = value.url.pathname
})
    }

    async function handleClickOnRestoreButton() {
		console.log($selectedFolders, $selectedLinks);
		if (
			$selectedFolders &&
			$selectedLinks &&
			$selectedFolders.length > 0 &&
			$selectedLinks.length > 0
		) {
			// restore both links and folders
			console.log('restore links and folders');
			await restoreLinksAndFoldersFromTrash($selectedFolders, $selectedLinks);
		} else if (
			$selectedFolders &&
			$selectedFolders.length > 0 &&
			$selectedLinks &&
			$selectedLinks.length < 1
		) {
			// restore folders
			console.log('restore folders');
			await restoreFoldersFromTrash($selectedFolders);
		} else if (
			$selectedFolders &&
			$selectedLinks &&
			$selectedFolders.length < 1 &&
			$selectedLinks.length > 0
		) {
			// restore links
			console.log('restore links');
			await restoreLinksFromTrash($selectedLinks);
		}
	}

    function closeFolderInTrashAlert() {
        showFolderInTrashAlert.set(false)
    }
</script>

{#if pathname === '/appv1/my_links/trash' && $showFolderInTrashAlert}
    <div class="wrapper">
    <div class="card">
        <div class="text">
            <h3>This collection is in your trash!</h3>
        <p>To view it, you'll need to restore it first.</p>
        </div>
        <div class="buttons">
            <!-- <button on:click|preventDefault|stopPropagation={handleClickOnRestoreButton}
				on:keyup>
                <span>Restore</span>
            </button> -->
            <button on:click|preventDefault|stopPropagation={closeFolderInTrashAlert}
				on:keyup>
                <span>Got it</span>
            </button>
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
           min-height: max-content;
           //min-height: 13rem;
			width: 40rem;
			background-color: rgb(255, 255, 255);
			border-radius: 0.6rem;
			box-shadow: $modal_box_shadow;
			display: flex;
			flex-direction: column;
			padding: 2em;
			animation: animate_card 0.5s ease-in-out;

            .text {
                flex: 1;
                gap: .5em;
                display: flex;
                flex-direction: column;

                h3 {
                    font-size: 1.5rem;
                    font-family: 'Arial CE', sans-serif;
                    color: $text-color-medium;
                }

                p {
                    font-family: 'Arial CE', sans-serif;
                    color: $text-color-medium;
                    font-size: 1.4rem;
                }
            }

            .buttons {
                flex: 1;
                display: flex;
                align-items: center;
                justify-content: flex-end;
                gap: .5em;

                button {
					height: 3.5rem;
					min-width: 7rem;
					border: none;
					background-color: $gray;
					cursor: pointer;
					display: flex;
					align-items: center;
					justify-content: center;
					background-image: linear-gradient(to top, #e1e8eb 50%, $gray 50%);
					background-size: 100% 200%;
					background-position: top;
					transition: background-position 100ms ease-in-out;
					border-radius: 0.3rem;

					span {
						font-family: 'Arial CE', sans-serif;
						font-size: 1.3rem;
						color: $text-color-regular;
					}

					&:hover {
						background-position: bottom;

						span {
							color: $text-color-regular;
						}
					}
				}

                button:first-of-type {
                    background-image: linear-gradient(to top, #0081c9 50%, $blue 50%);

					span {
						color: white;
					}

					&:hover {
						background-position: bottom;
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
    }
</style>