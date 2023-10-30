const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllUsers = async (req, res) => {
    try{
        const users = await prisma.user.findMany();
        res.json(users);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
}

const getUserById = async (req, res) => {
    try{
        const { id } = req.params;
        const user = await prisma.user.findUnique({
            where: {
                id: parseInt(id)
            }
        });
        res.json(user);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
}

const createUser = async (req, res) => {
    try{
        const { name, lastname, email, password } = req.body;
        const user = await prisma.user.create({
            data: {
                name,
                lastname,
                email,
                password
            }
        });
        res.json(user);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
}

/* 
    update user, name, email, password fields are optional
*/
const updateUser = async (req, res) => {
	try {
		const { id } = req.params;
		const { name, lastname, password } = req.body;
		const data = {};
		if (name) data.name = name;
		if (lastname) data.lastname = lastname;
		if (password) data.password = password;
		const user = await prisma.user.update({
			where: {
				id: parseInt(id),
			},
			data,
		});
		res.json(user);
	} catch (error) {
		if (error instanceof Error) {
			res.status(500).json({ error: error.message });
		} else {
			res.status(500).json({ error: 'An unknown error occurred' });
		}
	}
};

const deleteUser = async (req, res) => {
    try{
        const { id } = req.params;
        const user = await prisma.user.delete({
            where: {
                id: parseInt(id)
            }
        });
        res.json(user);
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
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}