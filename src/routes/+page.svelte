<script lang="ts">
	import Mainnav from '$lib/components/mainnav.svelte';
	import BookmarkManagerScreenshot from '$lib/images/bookmarkbucket_screenshot.png';
</script>

<Mainnav />

<div class="copy">
	<div class="above_the_fold">
		<div class="heading_and_subheading">
			<h1>Free online standalone bookmark manager.</h1>
			<p>Save your most important links. Online. In one place.</p>
		</div>
		<div class="cta">
			<a href="/accounts/email" class="sign_up">
				<span>Get my free account</span>
			</a>
			<div class="benefits">
				<div class="free_forever">
					<i class="las la-check" />
					<span>It's free, forever.</span>
				</div>
				<div class="no_instalation">
					<i class="las la-check" />
					<span>No instalation required.</span>
				</div>
				<div class="no_credit_required">
					<i class="las la-check" />
					<span>No credit card required.</span>
				</div>
			</div>
		</div>
	</div>
	<div class="screenshot">
		<div class="screenshot_container">
			<img src={BookmarkManagerScreenshot} alt="site dashboard screenshot" />
		</div>
	</div>
</div>

<style lang="scss">
	.copy {
		width: 100%;
		height: 100%;
		overflow: auto;
		display: flex;
		flex-direction: column;

		.above_the_fold {
			//background-color: yellow;
			min-height: 50%;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			gap: 2.5em;

			.heading_and_subheading {
				display: flex;
				flex-direction: column;
				align-items: center;
				text-align: center;
				gap: 1.5em;

				h1 {
					font-size: 3rem;
					line-height: 1.6;
					color: #2b3a55;
					font-family: 'Product Sans Medium', sans-serif;
					font-weight: 600;
				}

				p {
					font-size: 1.7rem;
					color: #263159;
					font-family: 'Arial CE', sans-serif;
					font-weight: 600;
				}
			}

			.cta {
				display: flex;
				flex-direction: column;
				//background-color: yellow;
				min-width: 50%;
				display: flex;
				align-items: center;
				gap: 1.5em;

				a.sign_up {
					text-decoration: none;
					min-width: 40%;
					height: 3.5rem;
					display: flex;
					align-items: center;
					justify-content: center;
					background-color: $blue;
					border-radius: 0.3rem;
					transition: all 200ms ease-in-out;

					span {
						font-size: 1.5rem;
						color: white;
						font-family: 'Arial CE', sans-serif;
						font-weight: 600;
					}

					&:hover {
						box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
						background-color: rgb(109, 103, 228);
					}
				}

				.benefits {
					display: flex;
					align-items: center;
					justify-content: space-between;
					gap: 1em;

					div {
						display: flex;
						align-items: center;
						gap: 0.5em;

						i {
							font-size: 1.6rem;
							color: rgb(12, 169, 64);
						}

						span {
							font-size: 1.5rem;
							font-family: 'Arial CE', sans-serif;
							color: $text-color-regular-2;
						}
					}
				}
			}
		}
	}

	.screenshot {
		width: 100vw;
		height: auto;
		display: flex;
		align-items: center;
		justify-content: center;
		padding-bottom: 2em;

		.screenshot_container {
			width: 90%;
			height: auto;

			img {
				width: 100%;
				height: 100%;
				object-fit: contain;
				border-radius: 0.6rem;
				box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
			}
		}
	}
</style>
