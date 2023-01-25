<div class="menu_bar" id="menu_bar">
	<div class="main">
		<div class="home">
			<i class="las la-home" />
			<span>Home</span>
		</div>
		<div class="trash">
			<i class="las la-trash" />
			<span>Trash</span>
		</div>
	</div>
	<div class="secondary">
		<div class="report_bug">
			<i class="las la-bug" />
			<span>Report bug</span>
		</div>
		<div class="suggest_feature">
			<!-- <i class="las la-lightbulb" /> -->
			<i class="las la-bolt" />
			<span>Suggest feature</span>
		</div>
		<div class="contact_support">
			<i class="las la-question" />
			<span>Contact support</span>
		</div>
	</div>
	<div class="tertiary">
		<div class="logout">
			<i class="las la-sign-out-alt" />
			<span>Sign out</span>
		</div>
	</div>
</div>

<style lang="scss">
	.menu_bar {
		position: fixed;
		top: 5rem;
		left: 1em;
		width: 30rem;
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

	:global(.show_menu_bar) {
		display: flex !important;
	}
</style>
