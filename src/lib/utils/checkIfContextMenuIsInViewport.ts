export function contextMenuIsInViewport(element: HTMLElement, e: MouseEvent) {
	const bounding = element.getBoundingClientRect();

	const viewportWidth = window.innerWidth || document.documentElement.clientWidth;

	const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

	const contextMenuIsInViewport =
		bounding.top >= 0 &&
		bounding.left >= 0 &&
		bounding.bottom <= viewportHeight &&
		bounding.right <= viewportWidth;

	if (contextMenuIsInViewport) {
		if (bounding.left < 10) {
			element.style.cssText = `display: flex; left: 1em; top: ${e.clientY}px`;
		}
	} else {
		if (!(bounding.right <= viewportWidth) && !(bounding.bottom <= viewportHeight)) {
			element.style.cssText = 'display: flex; right: 1em; bottom: 1em';
		} else if (!(bounding.bottom <= viewportHeight)) {
			if (bounding.left < 10) {
				element.style.cssText = `display: flex; left: 1em; bottom: 1em`;
			} else {
				element.style.cssText = `display: flex; left: ${e.clientX}px; bottom: 1em`;
			}
		} else if (!(bounding.right <= viewportWidth)) {
			element.style.cssText = `display: flex; right: 1em; top: ${e.clientY}px`;
		}
	}
}
