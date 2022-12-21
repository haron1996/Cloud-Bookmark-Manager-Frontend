<script lang="ts">
	import folderIcon from '$lib/images/folder.png';
	import linkIcon from '$lib/images/link.png';
	import { createButtonToggled } from '../../stores/stores';

	function toggleMenu() {
		$createButtonToggled = !$createButtonToggled;
	}
</script>

<button on:click|preventDefault|stopPropagation={toggleMenu} class:b-active={$createButtonToggled}>
	<svg
		width="24px"
		height="24px"
		stroke-width="1.5"
		viewBox="0 0 24 24"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		color="#000000"
		><path
			d="M6 12h6m6 0h-6m0 0V6m0 6v6"
			stroke="#000000"
			stroke-width="1.5"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
	</svg>
</button>

<div class="create-button-menu" id="create-button-menu" class:active={$createButtonToggled}>
	<div class="new-folder">
		<div class="folder-icon-wrapper">
			<img src={folderIcon} alt="folder" />
		</div>
		<span>New Folder</span>
	</div>
	<div class="new-link">
		<div class="link-icon-wrapper">
			<img src={linkIcon} alt="link" />
		</div>
		<span>New Link</span>
	</div>
</div>

<style lang="scss">
	button {
		border: none;
		outline: none;
		height: 4rem;
		width: 4rem;
		background-color: $main-blue;
		border-radius: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		position: fixed;
		right: 0.5em;
		bottom: 0.5em;
		cursor: pointer;
		z-index: 5;
		box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
		transition: background-color 0.2s linear;

		svg {
			transform: scale(1.3);
			transition: transform 0.2s linear;

			path {
				stroke: white;
			}
		}

		&:hover {
			background-color: #1d1ce5;

			svg {
				transform: scale(1.5);
			}
		}
	}

	:global(.b-active) {
		background-color: #1d1ce5 !important;

		svg {
			transform: scale(1.5) !important;
		}
	}

	.create-button-menu {
		position: fixed;
		bottom: 6em;
		right: 1em;
		border: 0.1rem solid $border-color-regular;
		z-index: 5;
		height: max-content;
		width: 18rem;
		box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
		box-shadow: 0 1px 10px #00000040;
		border-radius: 0.3rem;
		padding: 0.5em;
		transform: scale(0);
		transition: transform 0.2s linear;

		.new-folder {
			display: flex;
			align-items: center;
			height: 4rem;
			cursor: pointer;
			padding-left: 1em;
			gap: 1em;
			width: 100%;
			background-color: transparent;
			border-radius: inherit;
			backdrop-filter: brightness(100%);
			transition: backdrop-filter 0.2s linear;

			.folder-icon-wrapper {
				height: 2rem;
				width: 2rem;
				display: flex;
				align-items: center;
				justify-content: center;

				img {
					max-inline-size: 100%;
					max-width: 100%;
					height: 100%;
					width: 100%;
					object-fit: contain;
				}
			}

			span {
				color: $text-color-regular;
				font-size: 1.4rem;
				font-family: 'Arial CE', sans-serif;
				line-height: 1.6;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}

			&:hover {
				backdrop-filter: brightness(90%);
			}
		}

		.new-link {
			display: flex;
			align-items: center;
			height: 4rem;
			cursor: pointer;
			padding-left: 1em;
			gap: 1em;
			width: 100%;
			background-color: transparent;
			border-radius: inherit;
			backdrop-filter: brightness(100%);
			transition: backdrop-filter 0.2s linear;

			.link-icon-wrapper {
				height: 2rem;
				width: 2rem;
				display: flex;
				align-items: center;
				justify-content: center;

				img {
					max-inline-size: 100%;
					max-width: 100%;
					height: 100%;
					width: 100%;
					object-fit: contain;
				}
			}

			span {
				color: $text-color-regular;
				font-size: 1.4rem;
				font-family: 'Arial CE', sans-serif;
				line-height: 1.6;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}

			&:hover {
				//background-color: $gray;
				backdrop-filter: brightness(90%);
			}
		}
	}

	:global(.active) {
		transform: scale(1) !important;
	}
</style>
