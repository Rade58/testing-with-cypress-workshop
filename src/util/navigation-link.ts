// SINCE page IS THE STORE; WE CAN USE subscribe
// TO BE PRECISE page IS READABLE STORE

import { page } from '$app/stores';

// LATTER ON I'LL WRITE DOWN WHERE THIS WILL BE USED

export const navigationLink = (node: HTMLLinkElement) => {
	const unsubscribe = page.subscribe(({ url: { pathname } }) => {
		if (pathname.startsWith(node.getAttribute('href') || '')) {
			node.dispatchEvent(new CustomEvent('routeChnge', { detail: true }));
		} else {
			node.dispatchEvent(new CustomEvent('routeChange', { detail: false }));
		}

		return {
			destroy() {
				return unsubscribe();
			}
		};
	});
};
