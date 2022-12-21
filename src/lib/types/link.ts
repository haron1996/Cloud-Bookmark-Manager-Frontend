export interface Link {
	link_id: string;
	link_title: string;
	link_thumbnail: string;
	link_favicon: string;
	link_hostname: string;
	link_url: string;
	link_notes: string;
	account_id: string;
	folder_id: { String: string; Valid: Boolean };
}
