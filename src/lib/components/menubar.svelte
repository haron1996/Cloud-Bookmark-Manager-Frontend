<script lang="ts">
	import { afterNavigate, goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { makeContactFormVisible } from '$lib/utils/toggleContactForm';
	import { hideMenuBar } from '$lib/utils/toggleMenuBar';
	import { redirect } from '@sveltejs/kit';

	let origin: string;
	let pathname: string;

	afterNavigate(() => {
		const getPathname = page.subscribe((value) => {
			pathname = value.url.pathname;
		});

		getPathname();
	});

	const signOut = () => {
		window.localStorage.clear();

		window.location.replace(`${$page.url.origin}`);

		//window.location.reload();
	};

	const goHome = () => {
		const getPageOrigin = page.subscribe((value) => {
			origin = value.url.origin;
		});

		getPageOrigin();

		goto(`${origin}/appv1/my_links`);

		hideMenuBar();
	};

	const goToTrash = () => {
		const getPageOrigin = page.subscribe((value) => {
			origin = value.url.origin;
		});

		getPageOrigin();

		goto(`${origin}/appv1/my_links/trash`);

		hideMenuBar();
	};

	const goToSharedWithMe = () => {
		const getPageOrigin = page.subscribe((value) => {
			origin = value.url.origin;
		});

		getPageOrigin();

		goto(`${origin}/appv1/my_links/shared_with_me`);

		hideMenuBar();
	};
</script>

<div class="menu_bar" id="menu_bar">
	<div class="main">
		<div
			class="home"
			class:active={pathname === '/appv1/my_links'}
			on:click|preventDefault|stopPropagation={goHome}
			on:keyup
		>
			<i class="las la-home" />
			<span>Home</span>
		</div>
		<div
			class="trash"
			class:active={pathname === '/appv1/my_links/trash'}
			on:click|preventDefault|stopPropagation={goToTrash}
			on:keyup
		>
			<i class="las la-trash" />
			<span>Trash</span>
		</div>
		<div
			class="shared_with_me"
			class:active={pathname === '/appv1/my_links/shared_with_me'}
			on:click|preventDefault|stopPropagation={goToSharedWithMe}
			on:keyup
		>
			<i class="las la-user-friends" />
			<span>Shared with me</span>
		</div>
	</div>
	<div class="secondary">
		<!-- <div class="report_bug">
			<i class="las la-bug" />
			<span>Report bug</span>
		</div>
		<div class="suggest_feature">
			<i class="las la-bolt" />
			<span>Suggest feature</span>
		</div> -->
		<div
			class="contact_support"
			on:click|preventDefault|stopPropagation={makeContactFormVisible}
			on:keyup
		>
			<i class="las la-question" />
			<span>Help</span>
		</div>
	</div>
	<div class="tertiary">
		<div class="logout" on:click|preventDefault|stopPropagation={signOut} on:keyup>
			<i class="las la-sign-out-alt" />
			<span>Sign Out</span>
		</div>
	</div>
</div>

<style lang="scss">
	.menu_bar {
		position: fixed;
		top: 5rem;
		left: 1em;
		width: 25rem;
		min-height: max-content;
		background-color: white;
		display: flex;
		flex-direction: column;
		z-index: 5000;
		box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
		border-radius: 0.5rem;
		display: none;

		.main,
		.secondary,
		.tertiary {
			min-height: max-content;
			display: flex;
			flex-direction: column;
			border-bottom: 0.1rem solid $border-color-regular;
			padding: 0.5em 0;

			div {
				min-height: 4.5rem;
				display: flex;
				align-items: center;
				gap: 1em;
				width: 100%;
				padding: 0 1em;
				cursor: pointer;

				i {
					font-size: 2rem;
					border-radius: 100vh;
					display: flex;
					align-items: center;
					justify-content: center;
					color: $text-color-medium;
				}

				span {
					font-family: 'ArialMT', sans-serif;
					font-size: 1.3rem;
					color: $text-color-medium;
				}

				&:hover {
					background-color: $gray;
				}
			}
		}

		.secondary {
			div {
				i {
					font-size: 2.2rem;
				}
			}
		}

		.tertiary {
			border-bottom: none;
			display: flex;
			flex-direction: row;
			align-items: center;
		}
	}

	:global(.active) {
		i {
			color: $blue !important;
		}

		span {
			color: $blue !important;
		}
	}

	:global(.show_menu_bar) {
		display: flex !important;
	}
</style>
