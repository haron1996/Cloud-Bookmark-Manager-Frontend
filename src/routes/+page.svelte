<script lang="ts">
	import Mainnav from '$lib/components/mainnav.svelte';
	import BookmarkManagerScreenshot from '$lib/images/bookmarkbucket_screenshot.png';
	import Logo from '$lib/images/flavicon.png';
	import { prevent_default } from 'svelte/internal';
</script>

<svelte:head>
	<title>Bookmark Bucket - Free online standalone bookmark manager</title>
</svelte:head>

<Mainnav />

<div class="copy">
	<div class="above_the_fold">
		<div class="heading_and_subheading">
			<h1>Free online standalone bookmark manager.</h1>
			<p>Save your most important links. Online. In one place.</p>
		</div>
		<div class="cta">
			<a href="/accounts/email" class="sign_up">
				<span>Create my free account</span>
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
	<div class="features">
		<div class="heading">
			<h2>Brief overview of what's inside.</h2>
			<p>Here's what you get when you create your free account.</p>
		</div>
		<div class="bullets">
			<div class="nested_folders">
				<i class="las la-sitemap" />
				<span>Nested collections</span>
				<p>Create unlimited categories and subcategories so you can better organize your links.</p>
			</div>
			<div class="link_thumbnails">
				<i class="las la-image" />
				<span>Link thumbnails</span>
				<p>We automatically add thumbnails to your links for faster skimming on your end.</p>
			</div>
			<div class="lightning_fast_search">
				<i class="lab la-searchengin" />
				<span>Fast search</span>
				<p>
					Lighning-fast search-as-you-type experince. As in, find what you're looking for. Fast.
				</p>
			</div>
			<div class="recycle_bin">
				<i class="las la-recycle" />
				<span>Recycle bin</span>
				<p>Accidentally deleted a link? Easily restore it from the recycle bin!</p>
			</div>
			<div class="bulk_edit">
				<i class="las la-edit" />
				<span>Bulk edit</span>
				<p>
					Select and edit multiple links at once... so you don't have to manage each one by one.
				</p>
			</div>
			<div class="drag_to_move">
				<i class="las la-arrows-alt" />
				<span>Drag to move</span>
				<p>Move items by dragging them from one collection to another.</p>
			</div>
		</div>
		<div class="button">
			<a href="/accounts/email">
				<span>Create my free account</span>
			</a>
		</div>
	</div>
	<div class="footer">
		<div class="footer_links">
			<a href="/about" on:click|preventDefault={prevent_default}>
				<span>About us</span>
			</a>
			<a href="mailto:support@bookmarkbucket.com" target="_blank">
				<span>Email us</span>
			</a>
		</div>
		<span>Copyright © 2023 bookmarkbucket</span>
	</div>
</div>

<style lang="scss">
	.copy {
		width: 100%;
		height: 100%;
		overflow: auto;
		display: flex;
		flex-direction: column;
		background-color: #e3f6ff;
		padding-bottom: 2em;
		align-items: center;
		//justify-content: center;
		gap: 2em;

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
					font-weight: 500;
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
					height: 5rem;
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
						font-weight: 500;
					}

					&:hover {
						box-shadow: rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em,
							rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;
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

	.features {
		min-height: 80vh;
		width: 90%;
		border-radius: 0.6rem;
		display: flex;
		flex-direction: column;
		text-align: center;
		//border: 0.2rem dashed $green;
		align-items: center;
		justify-content: center;
		margin-top: 3em;
		gap: 3em;
		padding: 1em 0;
		//background-color: rgb(255, 255, 255);

		.heading {
			flex: 1;
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 0.5em;
			//background-color: chocolate;
			width: 100%;

			h2 {
				font-size: 2.5rem;
				line-height: 1.6;
				color: #2b3a55;
				font-family: 'Product Sans Medium', sans-serif;
				font-weight: 600;
			}

			p {
				font-size: 1.7rem;
				color: #263159;
				font-family: 'Arial CE', sans-serif;
				font-weight: 500;
			}
		}

		.bullets {
			width: 80%;
			flex: 2;
			display: grid;
			grid-template-columns: repeat(3, 1fr);
			//background-color: yellow;
			align-items: center;
			align-content: center;
			gap: 2em;

			div {
				display: flex;
				flex-direction: column;
				//background-color: lightgreen;
				align-items: center;
				gap: 1em;

				i {
					font-size: 3.5rem;
					color: $blue;
				}

				span {
					font-size: 1.5rem;
					font-family: 'Arial CE', sans-serif;
					font-weight: 500;
				}

				p {
					//max-width: 75%;
					font-family: 'Arial CE', sans-serif;
					font-weight: 500;
					font-size: 1.4rem;
					color: $text-color-regular-2;
				}
			}
		}

		.button {
			//background-color: bisque;
			flex: 1;
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: center;

			a {
				height: 5rem;
				width: 50%;
				background-color: $blue;
				display: flex;
				align-items: center;
				justify-content: center;
				border-radius: 0.3rem;
				text-decoration: none;
				transition: all 200ms ease-in-out;

				span {
					font-size: 1.5rem;
					color: white;
					font-family: 'Arial CE', sans-serif;
					font-weight: 500;
				}

				&:hover {
					box-shadow: rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em,
						rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;
				}
			}
		}
	}

	.footer {
		min-height: 5vh;
		width: 100vw;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 1em;

		.footer_links {
			display: flex;
			align-items: center;
			gap: 1em;
		}

		span {
			font-size: 1.3rem;
			font-family: 'Arial CE', sans-serif;
			font-weight: 500;
			color: $text-color-medium;
		}
	}
</style>
