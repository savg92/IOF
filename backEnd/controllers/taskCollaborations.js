const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllTaskCollaborations = async (req, res) => {
	try {
		const taskCollaborations = await prisma.taskCollaborator.findMany();
		res.json(taskCollaborations);
	} catch (error) {
		if (error instanceof Error) {
			res.status(500).json({ error: error.message });
		} else {
			res.status(500).json({ error: 'An unknown error occurred' });
		}
	}
};

const getTaskCollaborationsByTaskId = async (req, res) => {
    try {
        const { id } = req.params;
        const taskCollaborations = await prisma.taskCollaborator.findMany({
            where: {
                taskId: parseInt(id),
            },
            include: {
                user: true,
            },
        });
        res.json(taskCollaborations);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
};

const getTaskCollaborationsByUserId = async (req, res) => {
	try {
		const { id } = req.params;
        const taskCollaborations = await prisma.taskCollaborator.findMany({
            where: {
                userId: parseInt(id),
            },
            include: {
                task: true,
            },
        });
        res.json(taskCollaborations);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
};

const createTaskCollaboration = async (req, res) => {
    try {
        const { taskId, userId } = req.body;
        const existingCollaboration = await prisma.taskCollaborator.findUnique({
            where: {
                taskId_userId: {
                    taskId: parseInt(taskId),
                    userId: parseInt(userId),
                },
            },
        });

        if (existingCollaboration) {
            res.status(400).json({ error: 'Task collaboration already exists' });
        } else {
            const taskCollaboration = await prisma.taskCollaborator.create({
                data: {
                    taskId: parseInt(taskId),
                    userId: parseInt(userId),
                },
            });
            res.json(taskCollaboration);
        }
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
};

const deleteTaskCollaboration = async (req, res) => {
    try {
        const { taskId, userId } = req.params;
        const taskCollaboration = await prisma.taskCollaborator.delete({
            where: {
                taskId_userId: {
                    taskId: parseInt(taskId),
                    userId: parseInt(userId),
                },
            },
        });
        res.json(taskCollaboration);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
};

module.exports = {
	getAllTaskCollaborations,
	getTaskCollaborationsByTaskId,
	getTaskCollaborationsByUserId,
	createTaskCollaboration,
	deleteTaskCollaboration,
};
