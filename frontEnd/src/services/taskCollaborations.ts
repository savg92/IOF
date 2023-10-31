import axios from 'axios';
import { TaskCollaborator } from '../types';

const API_URL = import.meta.env.VITE_API_URL;

const getAllTaskCollaborations = async () => {
	const response = await axios.get(`${API_URL}/taskCollaborations`);
	return response.data;
};

const getTaskCollaborationsByTaskId = async (
	taskId: TaskCollaborator['taskId']
) => {
	const response = await axios.get(
		`${API_URL}/taskCollaborations/task/${taskId}`
	);
	return response.data;
};

const getTaskCollaborationsByUserId = async (
	userId: TaskCollaborator['userId']
) => {
	const response = await axios.get(
		`${API_URL}/taskCollaborations/user/${userId}`
	);
	return response.data;
};

const createTaskCollaboration = async (data: TaskCollaborator) => {
	const response = await axios.post(`${API_URL}/taskCollaborations`, data);
	return response.data;
};

const deleteTaskCollaboration = async (
	taskId: TaskCollaborator['taskId'],
	userId: TaskCollaborator['userId']
) => {
	const response = await axios.delete(
		`${API_URL}/taskCollaborations/${taskId}/${userId}`
	);
	return response.data;
};

export {
	getAllTaskCollaborations,
	getTaskCollaborationsByTaskId,
	getTaskCollaborationsByUserId,
	createTaskCollaboration,
	deleteTaskCollaboration,
};
