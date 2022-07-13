// THIS IS GOING TO BE A HELPER WHN HANDLING JWT
// I GUESS THAT IS WHY IT IS UNDERSCORED FILE
import { encodeToken } from '$util/jwt';

export function respond(body: any) {
	if (body.errors) {
		return { status: 401, body };
	}

	// WE WILL CREATE BASE64 FROM THIS DATA

	const { id, email } = body.user;
	const json = JSON.stringify({ id, email });
	const base64Value = encodeURI(json);

	// THIS IS A REDIRECT
	return {
		status: 302,
		headers: {
			'set-cookie': `jwt=${base64Value}; Path=/; HttpOnly`,
			Location: '/echo-chamber/posts'
		},
		body
	};
}
