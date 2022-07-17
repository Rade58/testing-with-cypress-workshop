const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
	const deletePosts = prisma.post.deleteMany({});
	const deleteUsers = prisma.user.deleteMany({});

	await prisma.$transaction([deletePosts, deleteUsers]);

	// CEATE OR UPDATE TWO RANDOM USERS
	// AND ADD THEIR POSTS

	const first = await prisma.user.upsert({
		where: {
			email: 'foobar@example.com'
		},
		update: {},
		create: {
			email: 'foobar@example.com',
			password: 'passwordone1',
			posts: {
				create: [
					{
						content: 'Shiba Inu is some kind of dog.'
					},
					{
						content: 'My coins go num num!'
					}
				]
			}
		}
	});

	const second = await prisma.user.upsert({
		where: {
			email: 'bazqux@example.com'
		},
		update: {},
		create: {
			email: 'bazqux@example.com',
			password: 'passwordtwo2',
			posts: {
				create: [
					{
						content: 'Akita Inu is most beautiful dog.'
					},
					{
						content: 'Aquaman making bubbles and stuff.'
					}
				]
			}
		}
	});

	return Promise.all([first, second]);
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
