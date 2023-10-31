import axios from 'axios';
import { User } from '../types';

const API_URL = import.meta.env.VITE_API_URL;

const getAllUsers = async () => {
	const response = await axios.get(`${API_URL}/users`);
	return response;
};

const getUserById = async (id: User['id']) => {
	const response = await axios.get(`${API_URL}/users/${id}`);
	return response.data;
};

const createUser = async (data: User) => {
	const response = await axios.post(`${API_URL}/users`, data);
	return response.data;
};

const updateUser = async (id: User['id'], data: User) => {
	const response = await axios.put(`${API_URL}/users/${id}`, data);
	return response.data;
};

const deleteUser = async (id: User['id']) => {
	const response = await axios.delete(`${API_URL}/users/${id}`);
	return response.data;
};

export { getAllUsers, getUserById, createUser, updateUser, deleteUser };
