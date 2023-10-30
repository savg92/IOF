const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllProjects = async (req, res) => {
    try{
        const projects = await prisma.project.findMany();
        res.json(projects);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
}

const getProjectById = async (req, res) => {
    try{
        const { id } = req.params;
        const project = await prisma.project.findUnique({
            where: {
                id: parseInt(id)
            }
        });
        res.json(project);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
}

/* create a project, name and description are required. 
The tasks array is optional. 
If the tasks array is provided, the tasks will be created and associated with the project. 
If the tasks array is not provided, the project will be created without any tasks.
The user array is optional.
If the user array is provided, the users will be associated with the project.
If the user array is not provided, the project will be created without any users.
*/
const createProject = async (req, res) => {
    try {
        const { name, description, authorId } = req.body;
        const project = await prisma.project.create({
            data: {
                name,
                description,
                authorId: parseInt(authorId),
            },
        });
        res.json(project);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
};

const updateProject = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, authorId } = req.body;
        const data = {};
        if (name) data.name = name;
        if (description) data.description = description;
        if (authorId) data.authorId = parseInt(authorId);
        const project = await prisma.project.update({
            where: {
                id: parseInt(id),
            },
            data,
        });
        res.json(project);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
};

const deleteProject = async (req, res) => {
    try{
        const { id } = req.params;
        const project = await prisma.project.delete({
            where: {
                id: parseInt(id)
            }
        });
        res.json(project);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
}

module.exports = {
    getAllProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject
}