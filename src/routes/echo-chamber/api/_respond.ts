// THIS IS GOING TO BE A HELPER FOR HANDLING JWT
// I GUESS THAT IS WHY IT IS UNDERSCORED FILE
import type { User } from '@prisma/client';
import { encodeToken } from '$util/jwt';

// IDEA IS THAT WE PASS USER RECORD (FROM DATABASE)
// HERE AS AN ARGUMENT
// AND WE MAKE jwt COOKIE ENTRY FROM THE VALUES OF USER (FROM email AND id)

export function respond(userData: { errors?: any; user?: User }) {
	if (userData.errors || !userData.user) {
		return { status: 401, userData };
	}

	// WE WILL CREATE BASE64 FROM THIS DATA

	const { id, email } = userData.user;
	const json = JSON.stringify({ id, email });
	const base64Value = encodeToken(json);

	// THIS IS A REDIRECT
	// AND WE MAKE jwt COOKIE ENTRY
	return {
		status: 302,
		headers: {
			'set-cookie': `jwt=${base64Value}; Path=/; HttpOnly`,
			Location: '/echo-chamber/posts'
		},
		body: userData
	};
}
