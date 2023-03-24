/** @type {import('./$types').PageLoad} */

import { browser } from "$app/environment"
import type {Folder} from "$lib/types/folder"
import type {Link} from "$lib/types/link"
import { Session } from "$lib/types/session"
import { GetNewAccessToken } from "$lib/utils/GetNewAccessToken"
import { redirect } from "@sveltejs/kit"
import { apiURL } from "../../../../stores/stores"

let baseApiEndpoint: string = ''
let s: Partial<Session> = {}
let folders: Partial<Folder>[] = [];
let links: Partial<Link>[] = [];


export async function load({ fetch, params, url, route }: any) {
	if (browser) {
		const sessionString: string | null = window.localStorage.getItem('session');

		if (sessionString === '' || sessionString === null) {
			//alert('no session');
			window.localStorage.clear();

			throw redirect(302, `${url.origin}`);
		}

		if (sessionString) {
			s = JSON.parse(sessionString);

			const getApiEndPoint = apiURL.subscribe((value) => {
				baseApiEndpoint = value;
			});

			getApiEndPoint();

            const endPoint:string = `${baseApiEndpoint}/private/getFoldersAndLinksMovedToTrash/${s.Account?.id}`;
        
			const res = await fetch(endPoint, {
				method: 'GET',
				mode: 'cors',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json',
					authorization: `Bearer${s.access_token}`
				}
			});

           
                const result = await res.json();
                

                if (result.message) {
                    // this token has expired
                    //alert(result.message);
    
                    // get new session
                    const newSession: Partial<Session> = await GetNewAccessToken(fetch, url);
    
                    // add new session to local storage
                    window.localStorage.removeItem('session');
    
                    window.localStorage.setItem('session', JSON.stringify(newSession));
    
                    // get api endpoint
                    const getApiEndPoint = apiURL.subscribe((value) => {
                        baseApiEndpoint = value;
                    });
    
                    getApiEndPoint();
    
                    // fetch links using new session
                    const res = await fetch(
                        endPoint,
                        {
                            method: 'GET',
                            mode: 'cors',
                            credentials: 'include',
                            headers: {
                                'Content-Type': 'application/json',
                                authorization: `Bearer${newSession.access_token}`
                            }
                        }
                    );
    
                    const newResult = await res.json();
    
                    // get folders from new result
                    folders = newResult[0].folders;
    
                    // get links from new result
                    links = newResult[0].links;
    
                    return { links, folders };
                }
    
                folders = result[0].folders;
    
                links = result[0].links;
    
                return { links, folders };
            
		}
	}
}