import axios from 'axios';
import { Project } from '../types';

const API_URL = import.meta.env.VITE_API_URL;

const getAllProjects = async () => {
	const response = await axios.get(`${API_URL}/projects`);
	return response.data;
};

const getProjetById = async (id: Project['id']) => {
	const response = await axios.get(`${API_URL}/projects/${id}`);
	return response.data;
};

const createProjet = async (data: Project) => {
	const response = await axios.post(`${API_URL}/projects`, data);
	return response.data;
};

const updateProjet = async (id: Project['id'], data: Project) => {
	const response = await axios.put(`${API_URL}/projects/${id}`, data);
	return response.data;
};

const deleteProjet = async (id: Project['id']) => {
	const response = await axios.delete(`${API_URL}/projects/${id}`);
	return response.data;
};

export {
	getAllProjects,
	getProjetById,
	createProjet,
	updateProjet,
	deleteProjet,
};
