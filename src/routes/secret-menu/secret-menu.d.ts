type SecretMenuItemType = {
	name: string;
	whereToOrder: string;
	sourceUrl: string;
	description: string;
	imageUrl: string;
	availability: string;
	secret: string;
	ingredients: string;
	popularity: string;
	price: number;
	howToOrder: string;
};

type SecretMenuItemAPIResponseType = {
	data: SecretMenuItemAPIResponseType[];
};
