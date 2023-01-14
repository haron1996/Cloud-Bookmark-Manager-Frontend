export const manifest = {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png","robots.txt"]),
	mimeTypes: {".png":"image/png",".txt":"text/plain"},
	_: {
		entry: {"file":"_app/immutable/start-63a4902c.js","imports":["_app/immutable/start-63a4902c.js","_app/immutable/chunks/index-1a91d0d7.js","_app/immutable/chunks/singletons-2b4c3ece.js","_app/immutable/chunks/index-6134f29b.js"],"stylesheets":[]},
		nodes: [
			() => import('./nodes/0.js'),
			() => import('./nodes/1.js'),
			() => import('./nodes/2.js'),
			() => import('./nodes/3.js'),
			() => import('./nodes/4.js'),
			() => import('./nodes/5.js'),
			() => import('./nodes/6.js'),
			() => import('./nodes/7.js'),
			() => import('./nodes/8.js'),
			() => import('./nodes/9.js'),
			() => import('./nodes/10.js'),
			() => import('./nodes/11.js'),
			() => import('./nodes/12.js'),
			() => import('./nodes/13.js'),
			() => import('./nodes/14.js'),
			() => import('./nodes/15.js'),
			() => import('./nodes/16.js'),
			() => import('./nodes/17.js'),
			() => import('./nodes/18.js'),
			() => import('./nodes/19.js'),
			() => import('./nodes/20.js')
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				names: [],
				types: [],
				optional: [],
				page: { layouts: [0], errors: [1], leaf: 4 },
				endpoint: null
			},
			{
				id: "/accounts",
				pattern: /^\/accounts\/?$/,
				names: [],
				types: [],
				optional: [],
				page: { layouts: [0], errors: [1], leaf: 5 },
				endpoint: null
			},
			{
				id: "/accounts/email",
				pattern: /^\/accounts\/email\/?$/,
				names: [],
				types: [],
				optional: [],
				page: { layouts: [0], errors: [1], leaf: 6 },
				endpoint: null
			},
			{
				id: "/accounts/sign_in",
				pattern: /^\/accounts\/sign_in\/?$/,
				names: [],
				types: [],
				optional: [],
				page: { layouts: [0], errors: [1], leaf: 7 },
				endpoint: null
			},
			{
				id: "/appv1",
				pattern: /^\/appv1\/?$/,
				names: [],
				types: [],
				optional: [],
				page: { layouts: [0], errors: [1], leaf: 8 },
				endpoint: null
			},
			{
				id: "/appv1/my_links",
				pattern: /^\/appv1\/my_links\/?$/,
				names: [],
				types: [],
				optional: [],
				page: { layouts: [0,2], errors: [1,,], leaf: 9 },
				endpoint: null
			},
			{
				id: "/appv1/my_links/recycle_bin",
				pattern: /^\/appv1\/my_links\/recycle_bin\/?$/,
				names: [],
				types: [],
				optional: [],
				page: { layouts: [0,2], errors: [1,,], leaf: 11 },
				endpoint: null
			},
			{
				id: "/appv1/my_links/[folder_id=folder_id]",
				pattern: /^\/appv1\/my_links\/([^/]+?)\/?$/,
				names: ["folder_id"],
				types: ["folder_id"],
				optional: [false],
				page: { layouts: [0,2], errors: [1,,], leaf: 10 },
				endpoint: null
			},
			{
				id: "/appv1/settings",
				pattern: /^\/appv1\/settings\/?$/,
				names: [],
				types: [],
				optional: [],
				page: { layouts: [0,3], errors: [1,,], leaf: 12 },
				endpoint: null
			},
			{
				id: "/appv1/settings/billing",
				pattern: /^\/appv1\/settings\/billing\/?$/,
				names: [],
				types: [],
				optional: [],
				page: { layouts: [0,3], errors: [1,,], leaf: 13 },
				endpoint: null
			},
			{
				id: "/appv1/settings/members",
				pattern: /^\/appv1\/settings\/members\/?$/,
				names: [],
				types: [],
				optional: [],
				page: { layouts: [0,3], errors: [1,,], leaf: 14 },
				endpoint: null
			},
			{
				id: "/appv1/settings/my_profile",
				pattern: /^\/appv1\/settings\/my_profile\/?$/,
				names: [],
				types: [],
				optional: [],
				page: { layouts: [0,3], errors: [1,,], leaf: 15 },
				endpoint: null
			},
			{
				id: "/appv1/settings/my_profile/change_email",
				pattern: /^\/appv1\/settings\/my_profile\/change_email\/?$/,
				names: [],
				types: [],
				optional: [],
				page: { layouts: [0,3], errors: [1,,], leaf: 16 },
				endpoint: null
			},
			{
				id: "/appv1/settings/my_profile/change_password",
				pattern: /^\/appv1\/settings\/my_profile\/change_password\/?$/,
				names: [],
				types: [],
				optional: [],
				page: { layouts: [0,3], errors: [1,,], leaf: 17 },
				endpoint: null
			},
			{
				id: "/appv1/settings/my_profile/confirm_email",
				pattern: /^\/appv1\/settings\/my_profile\/confirm_email\/?$/,
				names: [],
				types: [],
				optional: [],
				page: { layouts: [0,3], errors: [1,,], leaf: 18 },
				endpoint: null
			},
			{
				id: "/auth/continue_with_google",
				pattern: /^\/auth\/continue_with_google\/?$/,
				names: [],
				types: [],
				optional: [],
				page: { layouts: [0], errors: [1], leaf: 19 },
				endpoint: null
			},
			{
				id: "/auth/thankyou",
				pattern: /^\/auth\/thankyou\/?$/,
				names: [],
				types: [],
				optional: [],
				page: { layouts: [0], errors: [1], leaf: 20 },
				endpoint: null
			}
		],
		matchers: async () => {
			const { match: folder_id } = await import('./entries/matchers/folder_id.js')
			return { folder_id };
		}
	}
};
