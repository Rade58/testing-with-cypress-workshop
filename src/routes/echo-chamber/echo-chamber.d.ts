type UserType = {
	id: number;
	email: string;
};

type PostType = {
	id: number;
	content: string;
	createdAt: string;
	author: User;
};
