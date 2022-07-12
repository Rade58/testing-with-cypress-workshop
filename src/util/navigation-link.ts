// SINCE page IS THE STORE; WE CAN USE subscribe
// TO BE PRECISE page IS READABLE STORE

import { page } from '$app/stores';

// CREATING A FUNCTIO

export const navigationLink = (node: HTMLLinkElement) => {
	const unsubscribe = page.subscribe(({ url: { pathname } }) => {});
};
