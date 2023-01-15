export const manifest = {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png","robots.txt"]),
	mimeTypes: {".png":"image/png",".txt":"text/plain"},
	_: {
		entry: {"file":"_app/immutable/start-b832c0ed.js","imports":["_app/immutable/start-b832c0ed.js","_app/immutable/chunks/index-bb81482e.js","_app/immutable/chunks/singletons-d146787d.js","_app/immutable/chunks/index-90bf16fc.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			() => import('./nodes/0.js'),
			() => import('./nodes/1.js'),
			() => import('./nodes/2.js'),
			() => import('./nodes/3.js'),
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
				id: "/accounts",
				pattern: /^\/accounts\/?$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 4 },
				endpoint: null
			},
			{
				id: "/accounts/email",
				pattern: /^\/accounts\/email\/?$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 5 },
				endpoint: null
			},
			{
				id: "/accounts/sign_in",
				pattern: /^\/accounts\/sign_in\/?$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 6 },
				endpoint: null
			},
			{
				id: "/appv1",
				pattern: /^\/appv1\/?$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 7 },
				endpoint: null
			},
			{
				id: "/appv1/my_links",
				pattern: /^\/appv1\/my_links\/?$/,
				params: [],
				page: { layouts: [0,2], errors: [1,,], leaf: 8 },
				endpoint: null
			},
			{
				id: "/appv1/my_links/recycle_bin",
				pattern: /^\/appv1\/my_links\/recycle_bin\/?$/,
				params: [],
				page: { layouts: [0,2], errors: [1,,], leaf: 10 },
				endpoint: null
			},
			{
				id: "/appv1/my_links/[folder_id=folder_id]",
				pattern: /^\/appv1\/my_links\/([^/]+?)\/?$/,
				params: [{"name":"folder_id","matcher":"folder_id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,2], errors: [1,,], leaf: 9 },
				endpoint: null
			},
			{
				id: "/appv1/settings",
				pattern: /^\/appv1\/settings\/?$/,
				params: [],
				page: { layouts: [0,3], errors: [1,,], leaf: 11 },
				endpoint: null
			},
			{
				id: "/appv1/settings/billing",
				pattern: /^\/appv1\/settings\/billing\/?$/,
				params: [],
				page: { layouts: [0,3], errors: [1,,], leaf: 12 },
				endpoint: null
			},
			{
				id: "/appv1/settings/members",
				pattern: /^\/appv1\/settings\/members\/?$/,
				params: [],
				page: { layouts: [0,3], errors: [1,,], leaf: 13 },
				endpoint: null
			},
			{
				id: "/appv1/settings/my_profile",
				pattern: /^\/appv1\/settings\/my_profile\/?$/,
				params: [],
				page: { layouts: [0,3], errors: [1,,], leaf: 14 },
				endpoint: null
			},
			{
				id: "/appv1/settings/my_profile/change_email",
				pattern: /^\/appv1\/settings\/my_profile\/change_email\/?$/,
				params: [],
				page: { layouts: [0,3], errors: [1,,], leaf: 15 },
				endpoint: null
			},
			{
				id: "/appv1/settings/my_profile/change_password",
				pattern: /^\/appv1\/settings\/my_profile\/change_password\/?$/,
				params: [],
				page: { layouts: [0,3], errors: [1,,], leaf: 16 },
				endpoint: null
			},
			{
				id: "/appv1/settings/my_profile/confirm_email",
				pattern: /^\/appv1\/settings\/my_profile\/confirm_email\/?$/,
				params: [],
				page: { layouts: [0,3], errors: [1,,], leaf: 17 },
				endpoint: null
			},
			{
				id: "/auth/continue_with_google",
				pattern: /^\/auth\/continue_with_google\/?$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 18 },
				endpoint: null
			},
			{
				id: "/auth/thankyou",
				pattern: /^\/auth\/thankyou\/?$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 19 },
				endpoint: null
			}
		],
		matchers: async () => {
			const { match: folder_id } = await import ('./entries/matchers/folder_id.js')
			return { folder_id };
		}
	}
};
