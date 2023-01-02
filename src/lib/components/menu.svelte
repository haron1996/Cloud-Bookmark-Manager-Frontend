<script lang="ts">
	import { menuToggled } from '../../stores/stores';
</script>

<div class="menu" class:menu_visible={$menuToggled}>
	<div class="new_link">
		<i class="las la-plus" />
		<span>New link</span>
	</div>
	<div class="new_folder">
		<i class="las la-folder-plus" />
		<span>New folder</span>
	</div>
	<div class="search">
		<i class="las la-search" />
		<span>Search</span>
	</div>
	<div class="my_profile">
		<i class="las la-user" />
		<span>My profile</span>
	</div>
	<div class="help">
		<i class="las la-headset" />
		<span>Help</span>
	</div>
	<div class="logout">
		<i class="las la-sign-out-alt" />
		<span>Log Out</span>
	</div>
</div>

<style lang="scss">
	.menu {
		position: fixed;
		top: 7vh;
		left: 0;
		height: calc(100vh - 7vh);
		max-height: calc(100vh - 7vh);
		background-color: rgb(246, 248, 250);
		width: 100vw;
		overflow: auto;
		z-index: 2000;
		transform: translateY(100%);
		transition: transform 0.5s ease-in-out;
		padding: 1em;

		div {
			display: flex;
			align-items: center;
			gap: 1em;
			padding: 1em;
			background-color: transparent;
			cursor: pointer;
			transition: background-color 200ms ease-in-out;

			i {
				font-size: 2rem;
				color: rgb(58, 79, 122);
			}

			span {
				color: rgb(58, 79, 122);
				font-size: 1.3rem;
				font-family: 'Arial CE', sans-serif;
			}

			&:hover {
				background-color: rgb(214, 228, 229);
			}
		}
	}

	.menu_visible {
		transform: translateX(0);
	}
</style>
