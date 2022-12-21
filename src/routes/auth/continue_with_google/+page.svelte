<body>
	<div class="container">
		<div class="card">
			<div class="title">
				<div class="icon">
					<svg
						width="24px"
						height="24px"
						stroke-width="1.5"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						color="#000000"
						><path
							d="M3 16V8a5 5 0 015-5h8a5 5 0 015 5v8a5 5 0 01-5 5H8a5 5 0 01-5-5z"
							stroke="#000000"
							stroke-width="1.5"
						/><path
							d="M16.5 14.5s-1.5 2-4.5 2-4.5-2-4.5-2"
							stroke="#000000"
							stroke-width="1.5"
							stroke-linecap="round"
							stroke-linejoin="round"
						/><path
							d="M8.5 10a.5.5 0 110-1 .5.5 0 010 1zM15.5 10a.5.5 0 110-1 .5.5 0 010 1z"
							fill="#000000"
							stroke="#000000"
							stroke-width="1.5"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
				</div>
				<span> Register with Google </span>
			</div>
			<div class="button">
				<div
					id="g_id_onload"
					data-client_id="459207285092-4bjlivofrpo73pgv4v2g6cimlu40pk98.apps.googleusercontent.com"
					data-context="use"
					data-ux_mode="popup"
					data-callback="handleCredentialResponse"
					data-auto_prompt="false"
				/>

				<div
					class="g_id_signin"
					data-type="standard"
					data-shape="rectangular"
					data-theme="filled_blue"
					data-text="continue_with"
					data-size="large"
					data-locale="en-US"
					data-logo_alignment="left"
					data-width="400"
				/>
			</div>
		</div>
	</div>

	<script src="https://accounts.google.com/gsi/client" async defer></script>
</body>

<style lang="scss">
	body {
		height: 100vh;
		width: 100vw;
		max-height: 100vh;

		.container {
			height: 100%;
			width: 100%;
			position: fixed;
			top: 0;
			left: 0;
			display: flex;
			align-items: center;
			justify-content: center;

			.card {
				height: 80%;
				width: 60%;
				display: flex;
				flex-direction: column;
				align-items: center;
				gap: 2em;

				.title {
					display: flex;
					align-items: center;
					justify-content: center;
					gap: 1em;

					.icon {
						height: 3rem;
						width: 3rem;
						display: flex;
						align-items: center;
						justify-content: center;

						svg path {
							stroke: $stroke;
						}
					}

					span {
						font-size: 1.5rem;
						font-family: 'Arial Rounded MT Bold', sans-serif;
					}
				}

				.button {
					box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
					display: flex;
					align-items: center;
					justify-content: center;
					width: max-content;
				}
			}
		}
	}
</style>
