let error: string = '';

export function validateFolderName(folder_name: string): string {
	if (folder_name === '') {
		error = 'Folder name is required';
	}

	return error;
}
