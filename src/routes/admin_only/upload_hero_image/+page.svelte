<script lang="ts">
	import { apiURL } from '../../../stores/stores';
	//import src from '$lib/images/pexels-vova-kras.jpg';

	let imageFile: File;
	let baseURL = '';
	let src: string;

	function handleFileChange() {
		const fileField = document.querySelector('input[type="file"]') as HTMLInputElement | null;

		if (fileField === null) return;

		if (fileField.files) {
			src = URL.createObjectURL(fileField.files[0]);
			console.log(URL.createObjectURL(fileField.files[0]));
		}
	}

	const uploadHeroImageRequest = async () => {
		const formData = new FormData();

		const fileField = document.querySelector('input[type="file"]') as HTMLInputElement | null;

		if (fileField === null) return;

		if (fileField.files) {
			formData.append('heroImg', fileField.files[0]);
		}

		const unsub = apiURL.subscribe((value) => {
			baseURL = value;
		});

		unsub();

		const response = await fetch(`${baseURL}/public/uploadHeroImage`, {
			method: 'POST', // *GET, POST, PUT, DELETE, etc.
			mode: 'cors', // no-cors, *cors, same-origin
			cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
			credentials: 'include', // include, *same-origin, omit
			// headers: {
			// 	'Content-Type': 'multipart/form-data'
			// 	// 'Content-Type': 'application/x-www-form-urlencoded',
			// },
			redirect: 'follow', // manual, *follow, error
			referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
			body: formData
		});

		try {
			const data = await response.json();
			console.log(data);
		} catch (error) {
			console.log(error);
		}
	};
</script>

<div class="wrapper">
	<form>
		<div class="top">
			<p>Upload hero image</p>
		</div>
		<img {src} alt="" srcset="" />
		<div class="bottom">
			<input
				type="file"
				id="file"
				name="filename"
				accept="image/*"
				bind:value={imageFile}
				on:change={handleFileChange}
			/>
			<button type="submit" on:click|preventDefault|stopPropagation={uploadHeroImageRequest}>
				<i class="las la-upload" />
				<span>Upload selected image</span>
			</button>
		</div>
	</form>
</div>

<style lang="scss">
	.wrapper {
		position: fixed;
		top: 0;
		left: 0;
		height: 100vh;
		width: 100vw;
		background-color: rgb(253, 253, 189);
		display: flex;
		align-items: center;
		justify-content: center;

		form {
			min-height: max-content;
			width: max-content;
			min-width: 40rem;
			max-width: 40rem;
			background-color: white;
			padding: 1em;
			box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
			display: flex;
			flex-direction: column;
			gap: 2em;
			border-radius: 0.25rem;

			.top {
				display: flex;
				align-items: center;

				p {
					font-family: 'Arial CE', sans-serif;
					font-size: 1.5rem;
					color: $text-color-dropbox;
				}
			}

			img {
				width: 100%;
				object-fit: contain;
				border-radius: 0.3rem;
				box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
			}

			.bottom {
				display: flex;
				flex-direction: column;
				align-items: center;
				gap: 1.5em;

				input[type='file'] {
					display: flex;
					gap: 0.5em;
					font-family: 'Arial CE', sans-serif;
					font-size: 1.2rem;
					width: 100%;

					&::-webkit-file-upload-button {
						outline-color: transparent;
						border: 0.1rem solid $border-color-regular;
						font-family: 'Arial CE', sans-serif;
						font-size: 1.3rem;
						padding: 0.5em;
						cursor: pointer;
						box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
						border-radius: 0.2rem;
						// width: 100%;
					}
				}

				button {
					width: 100%;
					outline-color: transparent;
					border: 0.1rem solid transparent;
					background-color: $blue;
					cursor: pointer;
					padding: 0.5em 0;
					border-radius: 0.2rem;
					display: flex;
					align-items: center;
					justify-content: center;
					gap: 1em;

					i {
						font-size: 2rem;
						color: white;
					}

					span {
						font-family: 'Arial CE', sans-serif;
						font-size: 1.3rem;
						color: white;
					}

					&:hover {
						outline: 0.1rem dashed $blue;
						outline-offset: 0.2rem;
						border-radius: 0;
					}
				}
			}
		}
	}
</style>
