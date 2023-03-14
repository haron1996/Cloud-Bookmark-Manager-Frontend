
// this file is generated — do not edit it


/// <reference types="@sveltejs/kit" />

/**
 * Environment variables [loaded by Vite](https://vitejs.dev/guide/env-and-mode.html#env-files) from `.env` files and `process.env`. Like [`$env/dynamic/private`](https://kit.svelte.dev/docs/modules#$env-dynamic-private), this module cannot be imported into client-side code. This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://kit.svelte.dev/docs/configuration#env).
 * 
 * _Unlike_ [`$env/dynamic/private`](https://kit.svelte.dev/docs/modules#$env-dynamic-private), the values exported from this module are statically injected into your bundle at build time, enabling optimisations like dead code elimination.
 * 
 * ```ts
 * import { API_KEY } from '$env/static/private';
 * ```
 * 
 * Note that all environment variables referenced in your code should be declared (for example in an `.env` file), even if they don't have a value until the app is deployed:
 * 
 * ```
 * MY_FEATURE_FLAG=""
 * ```
 * 
 * You can override `.env` values from the command line like so:
 * 
 * ```bash
 * MY_FEATURE_FLAG="enabled" npm run dev
 * ```
 */
declare module '$env/static/private' {
	export const LESSOPEN: string;
	export const USER: string;
	export const npm_config_user_agent: string;
	export const XDG_SESSION_TYPE: string;
	export const npm_node_execpath: string;
	export const SHLVL: string;
	export const npm_config_noproxy: string;
	export const HOME: string;
	export const NVM_BIN: string;
	export const DESKTOP_SESSION: string;
	export const npm_package_json: string;
	export const NVM_INC: string;
	export const npm_package_engines_node: string;
	export const GNOME_SHELL_SESSION_MODE: string;
	export const GTK_MODULES: string;
	export const npm_config_userconfig: string;
	export const npm_config_local_prefix: string;
	export const MAKEFLAGS: string;
	export const DBUS_SESSION_BUS_ADDRESS: string;
	export const SYSTEMD_EXEC_PID: string;
	export const DBUS_STARTER_BUS_TYPE: string;
	export const npm_config_engine_strict: string;
	export const COLORTERM: string;
	export const COLOR: string;
	export const NVM_DIR: string;
	export const MAKE_TERMERR: string;
	export const npm_config_metrics_registry: string;
	export const MANDATORY_PATH: string;
	export const IM_CONFIG_PHASE: string;
	export const LOGNAME: string;
	export const _: string;
	export const npm_config_prefix: string;
	export const DEFAULTS_PATH: string;
	export const XDG_SESSION_CLASS: string;
	export const USERNAME: string;
	export const TERM: string;
	export const npm_config_cache: string;
	export const GNOME_DESKTOP_SESSION_ID: string;
	export const WINDOWPATH: string;
	export const npm_config_node_gyp: string;
	export const PATH: string;
	export const SESSION_MANAGER: string;
	export const NODE: string;
	export const npm_package_name: string;
	export const GNOME_TERMINAL_SCREEN: string;
	export const XDG_RUNTIME_DIR: string;
	export const XDG_MENU_PREFIX: string;
	export const MAKELEVEL: string;
	export const DISPLAY: string;
	export const npm_config_legacy_peer_deps: string;
	export const LANG: string;
	export const XDG_CURRENT_DESKTOP: string;
	export const XAUTHORITY: string;
	export const GNOME_TERMINAL_SERVICE: string;
	export const XDG_SESSION_DESKTOP: string;
	export const XMODIFIERS: string;
	export const LS_COLORS: string;
	export const npm_lifecycle_script: string;
	export const SSH_AGENT_LAUNCHER: string;
	export const SSH_AUTH_SOCK: string;
	export const GOPATH: string;
	export const SHELL: string;
	export const npm_package_version: string;
	export const npm_lifecycle_event: string;
	export const QT_ACCESSIBILITY: string;
	export const MAKE_TERMOUT: string;
	export const FLYCTL_INSTALL: string;
	export const GDMSESSION: string;
	export const LESSCLOSE: string;
	export const GPG_AGENT_INFO: string;
	export const QT_IM_MODULE: string;
	export const npm_config_globalconfig: string;
	export const npm_config_init_module: string;
	export const PWD: string;
	export const npm_execpath: string;
	export const XDG_DATA_DIRS: string;
	export const DBUS_STARTER_ADDRESS: string;
	export const XDG_CONFIG_DIRS: string;
	export const NVM_CD_FLAGS: string;
	export const npm_config_global_prefix: string;
	export const npm_command: string;
	export const MFLAGS: string;
	export const VTE_VERSION: string;
	export const INIT_CWD: string;
	export const EDITOR: string;
	export const NODE_ENV: string;
}

/**
 * Similar to [`$env/static/private`](https://kit.svelte.dev/docs/modules#$env-static-private), except that it only includes environment variables that begin with [`config.kit.env.publicPrefix`](https://kit.svelte.dev/docs/configuration#env) (which defaults to `PUBLIC_`), and can therefore safely be exposed to client-side code.
 * 
 * Values are replaced statically at build time.
 * 
 * ```ts
 * import { PUBLIC_BASE_URL } from '$env/static/public';
 * ```
 */
declare module '$env/static/public' {

}

/**
 * This module provides access to runtime environment variables, as defined by the platform you're running on. For example if you're using [`adapter-node`](https://github.com/sveltejs/kit/tree/master/packages/adapter-node) (or running [`vite preview`](https://kit.svelte.dev/docs/cli)), this is equivalent to `process.env`. This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://kit.svelte.dev/docs/configuration#env).
 * 
 * This module cannot be imported into client-side code.
 * 
 * ```ts
 * import { env } from '$env/dynamic/private';
 * console.log(env.DEPLOYMENT_SPECIFIC_VARIABLE);
 * ```
 * 
 * > In `dev`, `$env/dynamic` always includes environment variables from `.env`. In `prod`, this behavior will depend on your adapter.
 */
declare module '$env/dynamic/private' {
	export const env: {
		LESSOPEN: string;
		USER: string;
		npm_config_user_agent: string;
		XDG_SESSION_TYPE: string;
		npm_node_execpath: string;
		SHLVL: string;
		npm_config_noproxy: string;
		HOME: string;
		NVM_BIN: string;
		DESKTOP_SESSION: string;
		npm_package_json: string;
		NVM_INC: string;
		npm_package_engines_node: string;
		GNOME_SHELL_SESSION_MODE: string;
		GTK_MODULES: string;
		npm_config_userconfig: string;
		npm_config_local_prefix: string;
		MAKEFLAGS: string;
		DBUS_SESSION_BUS_ADDRESS: string;
		SYSTEMD_EXEC_PID: string;
		DBUS_STARTER_BUS_TYPE: string;
		npm_config_engine_strict: string;
		COLORTERM: string;
		COLOR: string;
		NVM_DIR: string;
		MAKE_TERMERR: string;
		npm_config_metrics_registry: string;
		MANDATORY_PATH: string;
		IM_CONFIG_PHASE: string;
		LOGNAME: string;
		_: string;
		npm_config_prefix: string;
		DEFAULTS_PATH: string;
		XDG_SESSION_CLASS: string;
		USERNAME: string;
		TERM: string;
		npm_config_cache: string;
		GNOME_DESKTOP_SESSION_ID: string;
		WINDOWPATH: string;
		npm_config_node_gyp: string;
		PATH: string;
		SESSION_MANAGER: string;
		NODE: string;
		npm_package_name: string;
		GNOME_TERMINAL_SCREEN: string;
		XDG_RUNTIME_DIR: string;
		XDG_MENU_PREFIX: string;
		MAKELEVEL: string;
		DISPLAY: string;
		npm_config_legacy_peer_deps: string;
		LANG: string;
		XDG_CURRENT_DESKTOP: string;
		XAUTHORITY: string;
		GNOME_TERMINAL_SERVICE: string;
		XDG_SESSION_DESKTOP: string;
		XMODIFIERS: string;
		LS_COLORS: string;
		npm_lifecycle_script: string;
		SSH_AGENT_LAUNCHER: string;
		SSH_AUTH_SOCK: string;
		GOPATH: string;
		SHELL: string;
		npm_package_version: string;
		npm_lifecycle_event: string;
		QT_ACCESSIBILITY: string;
		MAKE_TERMOUT: string;
		FLYCTL_INSTALL: string;
		GDMSESSION: string;
		LESSCLOSE: string;
		GPG_AGENT_INFO: string;
		QT_IM_MODULE: string;
		npm_config_globalconfig: string;
		npm_config_init_module: string;
		PWD: string;
		npm_execpath: string;
		XDG_DATA_DIRS: string;
		DBUS_STARTER_ADDRESS: string;
		XDG_CONFIG_DIRS: string;
		NVM_CD_FLAGS: string;
		npm_config_global_prefix: string;
		npm_command: string;
		MFLAGS: string;
		VTE_VERSION: string;
		INIT_CWD: string;
		EDITOR: string;
		NODE_ENV: string;
		[key: `PUBLIC_${string}`]: undefined;
		[key: string]: string | undefined;
	}
}

/**
 * Similar to [`$env/dynamic/private`](https://kit.svelte.dev/docs/modules#$env-dynamic-private), but only includes variables that begin with [`config.kit.env.publicPrefix`](https://kit.svelte.dev/docs/configuration#env) (which defaults to `PUBLIC_`), and can therefore safely be exposed to client-side code.
 * 
 * Note that public dynamic environment variables must all be sent from the server to the client, causing larger network requests — when possible, use `$env/static/public` instead.
 * 
 * ```ts
 * import { env } from '$env/dynamic/public';
 * console.log(env.PUBLIC_DEPLOYMENT_SPECIFIC_VARIABLE);
 * ```
 */
declare module '$env/dynamic/public' {
	export const env: {
		[key: `PUBLIC_${string}`]: string | undefined;
	}
}
