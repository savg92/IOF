import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    const user1 = await prisma.user.create({
        data: {
            // user data...
        },
    });

    const user2 = await prisma.user.create({
        data: {
            // user data...
        },
    });

    const task1 = await prisma.task.create({
        data: {
            // task data...
            projectId: 1, // replace with a valid project id
        },
    });

    const task2 = await prisma.task.create({
        data: {
            // task data...
            projectId: 1, // replace with a valid project id
        },
    });

    await prisma.taskCollaborator.create({
        data: {
            taskId: task1.id,
            userId: user1.id,
        },
    });

    await prisma.taskCollaborator.create({
        data: {
            taskId: task2.id,
            userId: user2.id,
        },
    });
}

main()
    .catch((e) => {
        throw e;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });