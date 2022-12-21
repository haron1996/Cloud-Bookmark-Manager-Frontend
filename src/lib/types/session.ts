export interface Session {
	Account: {
		account_password: { String: ''; Valid: false };
		created_at: string;
		email: string;
		fullname: string;
		id: number;
		intention: { String: ''; Valid: false };
		last_login: Date;
		picture: string;
	};
	access_token: string;
	expiry: Date;
}
