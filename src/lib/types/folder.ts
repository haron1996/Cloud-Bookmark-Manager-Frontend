export interface Folder {
	account_id: string;
	folder_created_at: string;
	folder_deleted_at: { Time: Date; Valid: false };
	folder_id: string;
	folder_name: string;
	folder_updated_at: string;
	label: string;
	path: string;
	starred: boolean;
	subfolder_of: { String: string; Valid: boolean };
}
