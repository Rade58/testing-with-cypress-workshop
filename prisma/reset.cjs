const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
	const deletePosts = prisma.post.deleteMany({});
	const deleteUsers = prisma.user.deleteMany({});

	return await prisma.$transaction([deletePosts, deleteUsers]);
}

if (require.main === module) {
	main();
}

module.exports = async () => {
	main()
		.catch((error) => {
			console.error(error);
			process.exit(1);
		})
		.finally(async () => {
			await prisma.$disconnect();
		});
};
