type SecretMenuItemType = {
	name: string;
	whereToOrder: string;
	sourceUrl: string;
	description: string;
	imageUrl: string;
	availability: string;
	secret: string;
	ingredients: string;
	popularity: number;
	price: string;
	howToOrder: string;
};

type SecretMenuItemAPIResponseType = {
	data: SecretMenuItemAPIResponseType[];
};
