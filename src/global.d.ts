/// <reference types="@sveltejs/kit" />

// THIS I ALLOWED, POPULATE THESE INTERFACS
// TO GET TYPE SAFTY
declare namespace App {
	interface Locals {
		user: UserType;
	}

	// interface Platform {}

	interface Session {
		user: UserType;
	}

	// interface Stuff {}
}

type CoinType = {
	id: number;
	title: string;
	shitcoin: boolean;
};

// POPULATE THIS
