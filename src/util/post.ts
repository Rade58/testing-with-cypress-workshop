// FIRST TIME USING Parameters TYPE
// IT IS GOING TO OBTAIN PARAMETERS TYPE FROM
// A FUNCTION SIGNATURE (THAT'S WHY WE USED typeof)

// WE WANT TYPE OF FIRST PARAMETER OF JSON.stringify FUNCTION

export const post = (endpoint: string, data?: Parameters<typeof JSON.stringify>[0]) => {
	return fetch(endpoint, {
		method: 'POST',
		credentials: 'include',
		body: JSON.stringify(data || {}),
		headers: {
			'Content-Type': 'application/json'
		}
	}).then((res) => res.json());
};
