export interface Session {
	Account: {
		account_password: { String: ''; Valid: false };
		created_at: string;
		email: string;
		email_verified: boolean;
		fullname: string;
		id: number;
		intention: { String: ''; Valid: false };
		last_login: Date;
		picture: string;
	};
	access_token: string;
	refresh_token: string;
	expiry: Date;
}
