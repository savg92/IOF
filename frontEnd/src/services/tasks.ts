import axios from 'axios';
import { Task } from '../types';

const API_URL = import.meta.env.VITE_API_URL;

const getAllTasks = async () => {
	const response = await axios.get(`${API_URL}/tasks`);
	return response.data;
};

const getTaskById = async (id: Task['id']) => {
	const response = await axios.get(`${API_URL}/tasks/${id}`);
	return response.data;
};

const getTasksByProjectId = async (projectId: Task['projectId']) => {
	const response = await axios.get(`${API_URL}/tasks?/project/${projectId}`);
	return response.data;
};

const createTask = async (data: Task) => {
	const response = await axios.post(`${API_URL}/tasks`, data);
	return response.data;
};

const updateTask = async (id: Task['id'], data: Task) => {
	const response = await axios.put(`${API_URL}/tasks/${id}`, data);
	return response.data;
};

const deleteTask = async (id: Task['id']) => {
	const response = await axios.delete(`${API_URL}/tasks/${id}`);
	return response.data;
};

export {
	getAllTasks,
	getTaskById,
	getTasksByProjectId,
	createTask,
	updateTask,
	deleteTask,
};
