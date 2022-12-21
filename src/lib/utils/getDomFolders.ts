export function getDomFolders(): NodeListOf<HTMLDivElement> {
	return document.querySelectorAll('.folder') as NodeListOf<HTMLDivElement>;
}
