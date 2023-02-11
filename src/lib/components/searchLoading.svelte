<script lang="ts">
	import searchLoadingGif from '$lib/gifs/search-loading.gif';
	import { searching } from '../../stores/stores';
</script>

{#if $searching}
	<div class="wrapper">
		<img src={searchLoadingGif} alt="loding gif" />
	</div>
{/if}

<style lang="scss">
	.wrapper {
		position: fixed;
		top: 4.5rem;
		left: 0;
		height: calc(100% - 4.5rem);
		width: 100vw;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 8000;
		background-color: white;

		img {
			height: 20rem;
			width: 20rem;
			object-fit: contain;
		}
	}
</style>
