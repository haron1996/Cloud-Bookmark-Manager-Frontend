import type * as Kit from '@sveltejs/kit';

type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never;
type RouteParams = {  }
type RouteId = '/';
type MaybeWithVoid<T> = {} extends T ? T | void : T;
export type RequiredKeys<T> = { [K in keyof T]-?: {} extends { [P in K]: T[K] } ? never : K; }[keyof T];
type OutputDataShape<T> = MaybeWithVoid<Omit<App.PageData, RequiredKeys<T>> & Partial<Pick<App.PageData, keyof T & keyof App.PageData>> & Record<string, any>>
type EnsureDefined<T> = T extends null | undefined ? {} : T;
type OptionalUnion<U extends Record<string, any>, A extends keyof U = U extends U ? keyof U : never> = U extends unknown ? { [P in Exclude<A, keyof U>]?: never } & U : never;
export type Snapshot<T = any> = Kit.Snapshot<T>;
type PageParentData = EnsureDefined<LayoutData>;
type LayoutRouteId = RouteId | "/" | "/about" | "/accounts" | "/accounts/accept_invite" | "/accounts/email" | "/accounts/request_password_reset_link" | "/accounts/reset_password" | "/accounts/sign_in" | "/accounts/thankyou" | "/admin_only/upload_hero_image" | "/appv1" | "/appv1/my_links" | "/appv1/my_links/[folder_id=folder_id]" | "/appv1/my_links/shared_with_me" | "/appv1/my_links/trash" | "/appv1/settings" | "/appv1/settings/billing" | "/appv1/settings/members" | "/appv1/settings/my_profile" | "/appv1/settings/my_profile/change_email" | "/appv1/settings/my_profile/change_password" | "/appv1/settings/my_profile/confirm_email" | "/appv1/share/[folder_id=folder_id]" | "/auth/continue_with_google" | "/contact" | null
type LayoutParams = RouteParams & { folder_id?: string }
type LayoutParentData = EnsureDefined<{}>;

export type PageServerData = null;
export type PageLoad<OutputData extends OutputDataShape<PageParentData> = OutputDataShape<PageParentData>> = Kit.Load<RouteParams, PageServerData, PageParentData, OutputData, RouteId>;
export type PageLoadEvent = Parameters<PageLoad>[0];
export type PageData = Expand<Omit<PageParentData, keyof Kit.AwaitedProperties<Awaited<ReturnType<typeof import('./proxy+page.js').load>>>> & OptionalUnion<EnsureDefined<Kit.AwaitedProperties<Awaited<ReturnType<typeof import('./proxy+page.js').load>>>>>>;
export type LayoutServerData = null;
export type LayoutData = Expand<LayoutParentData>;