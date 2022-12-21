export function highlightInitialInputContent(elementID: string) {
	const el = document.getElementById(elementID) as HTMLInputElement | null;

	if (el === null) return;

	el.focus();

	el.select();
}
