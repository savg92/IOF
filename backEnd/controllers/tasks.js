const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllTasks = async (req, res) => {
	try {
		const tasks = await prisma.task.findMany();
		res.json(tasks);
	} catch (error) {
		if (error instanceof Error) {
			res.status(500).json({ error: error.message });
		} else {
			res.status(500).json({ error: 'An unknown error occurred' });
		}
	}
};

const getTaskById = async (req, res) => {
	try {
		const { id } = req.params;
		const task = await prisma.task.findUnique({
			where: {
				id: parseInt(id),
			},
		});
		res.json(task);
	} catch (error) {
		if (error instanceof Error) {
			res.status(500).json({ error: error.message });
		} else {
			res.status(500).json({ error: 'An unknown error occurred' });
		}
	}
};

/* 
    get all tasks associated with a project
*/
const getTasksByProjectId = async (req, res) => {
	try {
		const { id } = req.params;
		const tasks = await prisma.task.findMany({
			where: {
				project_id: parseInt(id),
			},
		});
		res.json(tasks);
	} catch (error) {
		if (error instanceof Error) {
			res.status(500).json({ error: error.message });
		} else {
			res.status(500).json({ error: 'An unknown error occurred' });
		}
	}
};

/* 
    create a task, title, description, status, project_id are required
*/
const createTask = async (req, res) => {
    try {
        const { title, description, status, projectId } = req.body;
        const task = await prisma.task.create({
            data: {
                title,
                description,
                status,
                project: {
                    connect: { id: parseInt(projectId) },
                },
            },
        });
        res.json(task);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
};

const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, status, projectId, authorId } = req.body;
        const data = {};
        if (title) data.title = title;
        if (description) data.description = description;
        if (status) data.status = status;
        if (projectId) data.project = { connect: { id: parseInt(projectId) } };
        const task = await prisma.task.update({
            where: {
                id: parseInt(id),
            },
            data,
        });
        res.json(task);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
};

const deleteTask = async (req, res) => {
	try {
		const { id } = req.params;
		const task = await prisma.task.delete({
			where: {
				id: parseInt(id),
			},
		});
		res.json(task);
	} catch (error) {
		if (error instanceof Error) {
			res.status(500).json({ error: error.message });
		} else {
			res.status(500).json({ error: 'An unknown error occurred' });
		}
	}
};

module.exports = {
	getAllTasks,
	getTaskById,
	getTasksByProjectId,
	createTask,
	updateTask,
	deleteTask,
};
