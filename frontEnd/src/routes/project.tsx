import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { Project, User, Task } from '../types';
import {
	getProjetById,
	updateProjet,
	deleteProjet,
} from '../services/projects';
import { getUserById } from '../services/users';
import { deleteTask, getTasksByProjectId } from '../services/tasks';

const Project = () => {
	const [idData, setIdData] = useState<number | null>();
	const [project, setProject] = useState<Project | null>();
	const [author, setAuthor] = useState<User | null>();
	const [tasks, setTasks] = useState<Task[] | null>();

	const { id } = useParams();

	const navigate = useNavigate();

	useEffect(() => {
		if (id) {
			setIdData(parseInt(id.substring(1)));
		}
	}, [id]);

	useEffect(() => {
		if (idData !== null) {
			getProjetById(idData)
				.then((data) => {
					setProject(data);
				})
				.catch((error) => {
					console.error('Error fetching projects:', error);
				});
		}
		return () => {
			setProject(null);
		};
	}, [idData]);

	useEffect(() => {
		getUserById(project?.authorId)
			.then((data) => {
				setAuthor(data);
			})
			.catch((error) => {
				console.error('Error fetching projects:', error);
			});
		return () => {
			setAuthor(null);
		};
	}, [project?.authorId]);

	useEffect(() => {
		getTasksByProjectId(project?.id)
			.then((data) => {
				setTasks(data);
				// console.log(data);
			})
			.catch((error) => {
				console.error('Error fetching projects:', error);
			});
		return () => {
			setTasks(null);
		};
	}, [project?.id]);



	const deleteDialogRef = useRef<HTMLDialogElement>(null);
	const editDialogRef = useRef<HTMLDialogElement>(null);

	function openDeleteDialog() {
		if (deleteDialogRef.current !== null) {
			deleteDialogRef.current.showModal();
		}
	}

	function closeDeleteDialog() {
		if (deleteDialogRef.current !== null) {
			deleteDialogRef.current.close();
		}
	}

	function openEditDialog() {
		if (editDialogRef.current !== null) {
			editDialogRef.current.showModal();
		}
	}

	function closeEditDialog() {
		if (editDialogRef.current !== null) {
			editDialogRef.current.close();
		}
	}

	const deleteProject = () => {
		if (project) {
			if (idData !== null && idData !== undefined) {
				deleteProjet(idData)
					.then(() => {
						console.log('Project deleted');
					})
					.catch((error) => {
						console.error('Error deleting project:', error);
					});
			}
		}
		closeDeleteDialog();
		navigate('/');
	};

	const editProject = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const form = event.currentTarget;
		const nameElement = form.elements.namedItem(
			'name'
		) as HTMLInputElement | null;
		const descriptionElement = form.elements.namedItem(
			'description'
		) as HTMLInputElement | null;

		if (!nameElement || !descriptionElement) {
			console.error('Form elements not found');
			return;
		}

		const project: Project = {
			name: nameElement.value,
			description: descriptionElement.value,
			authorId: 1,
		};

		if (idData !== null && idData !== undefined) {
			updateProjet(idData, project)
				.then((data) => {
					console.log(data);
					alert('Project updated successfully');
					navigate('/');
				})
				.catch((error) => {
					console.error('Error updating project:', error);
				});
		}

		nameElement.value = '';
		descriptionElement.value = '';
		closeEditDialog();
		navigate('/');
	};


	const handleDeleteTask = (taskId : Task['id']) => {
		console.log(taskId);
		if (taskId) {
			deleteTask(taskId)
				.then(() => {
					console.log('Task deleted');
				})
				.catch((error) => {
					console.error('Error deleting task:', error);
				});
		}
		closeDeleteDialog();
		navigate('/');
	}

	return (
		<>
			<section>
				<h1 className='underline text-4xl text-center font-bold m-4'>
					Project: {project?.name}
				</h1>
				<p>ID: {project?.id}</p>
				<p>Description: {project?.description}</p>
				<p>
					Author: {author?.name} {author?.lastname}
				</p>
				<p>
					Created at:{' '}
					{project?.createdAt
						? new Date(project.createdAt).toLocaleDateString('en-GB')
						: ''}
				</p>
				<div className='project-buttons flex flex-row justify-center'>
					<div>
						<button
							className='border-2 border-gray-300 p-2 rounded-md m-4 w-20 hover:bg-gray-300'
							onClick={openEditDialog}
						>
							Edit
						</button>
						<dialog
							ref={editDialogRef}
							className='dialog rounded-md p-8 w-[400px]'
						>
							<form
								className='flex flex-col justify-center items-center gap-4 w-full'
								onSubmit={editProject}
							>
								<label htmlFor='name'>Name:</label>
								<input
									type='text'
									name='name'
									id='name'
									className='mb-4 border-2 border-gray-300 p-2 rounded-md'
									value={project?.name}
									onChange={(e) =>
										setProject({ ...project, name: e.target.value })
									}
								/>
								<label htmlFor='description'>Description:</label>
								<textarea
									name='description'
									id='description'
									className='mb-4 border-2 border-gray-300 p-2 rounded-md h-60'
									value={project?.description}
									onChange={(e) =>
										setProject({ ...project, description: e.target.value })
									}
								/>
								<div className='buttons flex flex-row justify-center'>
									<input
										type='cancel'
										value='Cancel'
										className='border-2 border-gray-300 p-2 rounded-md m-4 w-20 hover:bg-gray-300'
										onClick={closeEditDialog}
									/>
									<input
										type='submit'
										value='Edit'
										className='border-2 border-gray-300 p-2 rounded-md m-4 w-20 hover:bg-gray-300'
										// onClick={editProject}
									/>
								</div>
							</form>
						</dialog>
					</div>
					<div>
						<button
							className='border-2 border-gray-300 p-2 rounded-md m-4 w-20 hover:bg-gray-300'
							onClick={openDeleteDialog}
						>
							Delete
						</button>
						<dialog
							ref={deleteDialogRef}
							className='dialog rounded-md p-12'
						>
							<p>Are you sure you want to delete the project?</p>
							<div className='buttons flex flex-row justify-center'>
								<button
									onClick={closeDeleteDialog}
									autoFocus
									className='border-2 border-gray-300 p-2 rounded-md m-4 w-20 hover:bg-gray-300'
								>
									Cancel
								</button>
								<button
									onClick={deleteProject}
									className='border-2 border-gray-300 p-2 rounded-md m-4 w-20 hover:bg-gray-300'
								>
									Delete
								</button>
							</div>
						</dialog>
					</div>
				</div>
			</section>
			<section>
				<h4 className='underline text-3xl text-center font-bold m-4'>Tasks:</h4>
				<section>
					<button className='border-2 border-gray-300 p-2 rounded-md m-4 hover:bg-gray-300 w-32'>
						New task
					</button>
				</section>
				<section>
					{(tasks ? tasks.length : 0) > 0 ? (
						<ol>
							{tasks?.map((task, index) => (
								<li
									key={index}
									className='border-2 border-gray-300 p-2 rounded-md m-4 w-96'
								>
									<p>Title: {task.title}</p>
									<p>Description: {task.description}</p>
									<p>
										Status:{' '}
										{task?.status === 'COMPLETE'
											? 'Complete'
											: task?.status === 'PENDING'
											? 'Pending'
											: ''}
									</p>
									{/* <p>
										Created at:{' '}
										{task?.createdAt
											? new Date(task.createdAt).toLocaleDateString('en-GB')
											: ''}
									</p> */}
									<div className='task-buttons flex flex-row justify-center'>
										<div>
											<button
												className='border-2 border-gray-300 p-2 rounded-md m-4 w-20 hover:bg-gray-300'
												onClick={openEditDialog}
											>
												Edit
											</button>
											<dialog
												ref={editDialogRef}
												className='dialog rounded-md p-8 w-[400px]'
											>
												<form
													className='flex flex-col justify-center items-center gap-4 w-full'
													onSubmit={editProject}
												>
													<label htmlFor='title'>Title:</label>
													<input
														type='text'
														name='title'
														id='title'
														className='mb-4 border-2 border-gray-300 p-2 rounded-md'
														value={task?.title}
														onChange={(e) =>
															setTasks({
																...task,
																title: e.target.value,
															})
														}
													/>
													<label htmlFor='descriptionTask'>Description:</label>
													<textarea
														name='descriptionTask'
														id='descriptionTask'
														className='mb-4 border-2 border-gray-300 p-2 rounded-md h-60'
														value={task?.description}
														onChange={(e) =>
															setTasks({
																...task,
																description: e.target.value,
															})
														}
													/>
													<label htmlFor='status'>Status:</label>
													<select
														name='status'
														id='status'
														className='mb-4 border-2 border-gray-300 p-2 rounded-md'
														value={task?.status}
														onChange={(e) =>
															setTasks({
																...task,
																status: e.target.value,
															})
														}
													>
														<option value='COMPLETE'>Complete</option>
														<option value='PENDING'>Pending</option>
													</select>

													<div className='buttons flex flex-row justify-center'>
														<input
															type='cancel'
															value='Cancel'
															className='border-2 border-gray-300 p-2 rounded-md m-4 w-20 hover:bg-gray-300'
															onClick={closeEditDialog}
														/>
														<input
															type='submit'
															value='Edit'
															className='border-2 border-gray-300 p-2 rounded-md m-4 w-20 hover:bg-gray-300'
															// onClick={editProject}
														/>
													</div>
												</form>
											</dialog>
										</div>
										<div>
											<button
												className='border-2 border-gray-300 p-2 rounded-md m-4 w-20 hover:bg-gray-300'
												onClick={openDeleteDialog}
											>
												Delete
											</button>
											<dialog
												ref={deleteDialogRef}
												className='dialog rounded-md p-12'
											>
												<p>Are you sure you want to delete the task?</p>
												<div className='buttons flex flex-row justify-center'>
													<button
														onClick={closeDeleteDialog}
														autoFocus
														className='border-2 border-gray-300 p-2 rounded-md m-4 w-20 hover:bg-gray-300'
													>
														Cancel
													</button>
													<button
														onClick={() => handleDeleteTask(task.id)}
														className='border-2 border-gray-300 p-2 rounded-md m-4 w-20 hover:bg-gray-300'
													>
														Delete
													</button>
												</div>
											</dialog>
										</div>
									</div>
								</li>
							))}
						</ol>
					) : (
						<p>No tasks</p>
					)}
				</section>
			</section>
			<section></section>
		</>
	);
};

export default Project;
