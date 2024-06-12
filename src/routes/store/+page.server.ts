import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = (async ({ fetch }) => {
    let res = await fetch('/api/catalog?action=getAllItems');

    if (!res.ok) {
        return {
            status: res.status,
            error: res.statusText
        };
    } else if (res.ok) {
        let items = await res.json();
        return {
            status: res.status,
            props: {
                items: items
            }
        }
    }
});