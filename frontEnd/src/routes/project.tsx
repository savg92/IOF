import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { Project, User, Task } from '../types';
import {
	getProjetById,
	updateProjet,
	deleteProjet,
} from '../services/projects';
import { getUserById } from '../services/users';
import {
	deleteTask,
	getTasksByProjectId,
	updateTask,
	createTask,
} from '../services/tasks';

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
					// console.error('Error fetching projects:', error);
					console.log('Error fetching projects:', error);

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
				// console.error('Error fetching projects:', error);
				console.log('Error fetching projects:', error);
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
				// console.error('Error fetching projects:', error);
				console.log('Error fetching projects:', error);
			});
		return () => {
			setTasks(null);
		};
	}, [project?.id]);

	const deleteDialogProjRef = useRef<HTMLDialogElement>(null);
	const editDialogProjRef = useRef<HTMLDialogElement>(null);

	const openDeleteDialogProj = () => {
		if (deleteDialogProjRef.current !== null) {
			deleteDialogProjRef.current.showModal();
		}
	};

	const closeDeleteDialogProj = () => {
		if (deleteDialogProjRef.current !== null) {
			deleteDialogProjRef.current.close();
		}
	};

	const openEditDialogProj = () => {
		if (editDialogProjRef.current !== null) {
			editDialogProjRef.current.showModal();
		}
	};

	const closeEditDialogProj = () => {
		if (editDialogProjRef.current !== null) {
			editDialogProjRef.current.close();
		}
	};

	const handleDeleteProject = () => {
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
		closeDeleteDialogProj();
		navigate('/');
	};

	const handleEditProject = (event: React.FormEvent<HTMLFormElement>) => {
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
		closeEditDialogProj();
		navigate('/');
	};

	const deleteDialogTaskRef = useRef<HTMLDialogElement>(null);
	const editDialogTaskRef = useRef<HTMLDialogElement>(null);

	const openDeleteDialogTask = () => {
		if (deleteDialogTaskRef.current !== null) {
			deleteDialogTaskRef.current.showModal();
		}
	};

	const closeDeleteDialogTask = () => {
		if (deleteDialogTaskRef.current !== null) {
			deleteDialogTaskRef.current.close();
		}
	};

	const openEditDialogTask = () => {
		if (editDialogTaskRef.current !== null) {
			editDialogTaskRef.current.showModal();
		}
	};

	const closeEditDialogTask = () => {
		if (editDialogTaskRef.current !== null) {
			editDialogTaskRef.current.close();
		}
	};

	const handleDeleteTask = (taskId: Task['id']) => {
		if (taskId) {
			deleteTask(taskId)
				.then(() => {
					console.log('Task deleted');
				})
				.catch((error) => {
					console.error('Error deleting task:', error);
				});
		}
		closeDeleteDialogTask();
		navigate('/');
	};

	const hadleEditTask = (event: React.FormEvent<HTMLFormElement>, taskId: Task['id']) => {
		event.preventDefault();
		const form = event.currentTarget;
		const titleElement = form.elements.namedItem(
			'title'
		) as HTMLInputElement | null;
		const descriptionElement = form.elements.namedItem(
			'descriptionTask'
		) as HTMLInputElement | null;
		const statusElement = form.elements.namedItem(
			'status'
		) as HTMLInputElement | null;

		if (!titleElement || !descriptionElement || !statusElement) {
			console.error('Form elements not found');
			return;
		}

		const task: Task = {
			title: titleElement.value,
			description: descriptionElement.value,
			status: statusElement.value,
			projectId: project?.id,
		};

		if (task.projectId !== null && task.projectId !== undefined) {
			updateTask(taskId, task)
				.then((data) => {
					console.log(data);
					alert('Task updated successfully');
					navigate('/');
				})
				.catch((error) => {
					console.error('Error updating task:', error);
				});
		}

		titleElement.value = '';
		descriptionElement.value = '';
		statusElement.value = '';
		closeEditDialogTask();
		navigate('/');
	};



	const openNewTaskDialog = useRef<HTMLDialogElement>(null);

	const handleOpenNewTaskDialog = () => {
		if (openNewTaskDialog.current !== null) {
			openNewTaskDialog.current.showModal();
		}
	};
	
	const closeNewTaskDialog = () => {
		if (openNewTaskDialog.current !== null) {
			openNewTaskDialog.current.close();
		}
	};

	const handleNewTask = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const form = event.currentTarget;
		const titleElement = form.elements.namedItem(
			'title'
		) as HTMLInputElement | null;
		const descriptionElement = form.elements.namedItem(
			'descriptionTask'
		) as HTMLInputElement | null;
		const statusElement = form.elements.namedItem(
			'status'
		) as HTMLInputElement | null;

		if (!titleElement || !descriptionElement || !statusElement) {
			console.error('Form elements not found');
			return;
		}

		const task: Task = {
			title: titleElement.value,
			description: descriptionElement.value,
			status: statusElement.value,
			projectId: project?.id,
		};

		console.log(task);

		if (task.projectId !== null && task.projectId !== undefined) {
			createTask(task)
				.then((data) => {
					console.log(data);
					alert('Task created successfully');
					navigate('/');
				})
				.catch((error) => {
					console.error('Error creating task:', error);
				});
		}

		titleElement.value = '';
		descriptionElement.value = '';
		statusElement.value = '';
		closeNewTaskDialog();
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
							onClick={openEditDialogProj}
						>
							Edit
						</button>
						<dialog
							ref={editDialogProjRef}
							className='dialog rounded-md p-8 w-[400px]'
						>
							<form
								className='flex flex-col justify-center items-center gap-4 w-full'
								onSubmit={handleEditProject}
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
								<div className='buttonsProjArea flex flex-row justify-center'>
									<input
										type='cancel'
										value='Cancel'
										className='border-2 border-gray-300 p-2 rounded-md m-4 w-20 hover:bg-gray-300 text-center'
										onClick={closeEditDialogProj}
										readOnly
									/>
									<input
										type='submit'
										value='Edit'
										className='border-2 border-gray-300 p-2 rounded-md m-4 w-20 hover:bg-gray-300 text-center'
										readOnly
									/>
								</div>
							</form>
						</dialog>
					</div>
					<div>
						<button
							className='border-2 border-gray-300 p-2 rounded-md m-4 w-20 hover:bg-gray-300'
							onClick={openDeleteDialogProj}
						>
							Delete
						</button>
						<dialog
							ref={deleteDialogProjRef}
							className='dialog rounded-md p-12'
						>
							<p>Are you sure you want to delete the project?</p>
							<div className='buttons flex flex-row justify-center'>
								<button
									onClick={closeDeleteDialogProj}
									autoFocus
									className='border-2 border-gray-300 p-2 rounded-md m-4 w-20 hover:bg-gray-300'
								>
									Cancel
								</button>
								<button
									onClick={handleDeleteProject}
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
					<button
						className='border-2 border-gray-300 p-2 rounded-md m-4 hover:bg-gray-300 w-32'
						onClick={handleOpenNewTaskDialog}
					>
						New task
					</button>
					<dialog
						className='dialog rounded-md p-8 w-[400px]'
						ref={openNewTaskDialog}
					>
						<form
							className='flex flex-col justify-center items-center gap-4 w-full'
							onSubmit={handleNewTask}
						>
							<label htmlFor='title'>Title:</label>
							<input
								type='text'
								name='title'
								id='title'
								className='mb-4 border-2 border-gray-300 p-2 rounded-md'
								// value={project?.name}
								// onChange={(e) =>
								// 	setProject({ ...project, name: e.target.value })
								// }
							/>
							<label htmlFor='descriptionTask'>Description:</label>
							<textarea
								name='descriptionTask'
								id='descriptionTask'
								className='mb-4 border-2 border-gray-300 p-2 rounded-md h-60'
								// value={project?.description}
								// onChange={(e) =>
								// 	setProject({ ...project, description: e.target.value })
								// }
							/>
							<label htmlFor='status'>Status:</label>
							<select
								name='status'
								id='status'
								className='mb-4 border-2 border-gray-300 p-2 rounded-md'
								// value={project?.description}
								// onChange={(e) =>
								// 	setProject({ ...project, description: e.target.value })
								// }
							>
								<option value='PENDING'>Pending</option>
								<option value='COMPLETE'>Complete</option>
							</select>

							<div className='buttons flex flex-row justify-center'>
								<input
									type='cancel'
									value='Cancel'
									className='border-2 border-gray-300 p-2 rounded-md m-4 w-20 hover:bg-gray-300 text-center'
									onClick={closeNewTaskDialog}
									readOnly
								/>
								<input
									type='submit'
									value='Create'
									className='border-2 border-gray-300 p-2 rounded-md m-4 w-20 hover:bg-gray-300 text-center'
									readOnly
								/>
							</div>
						</form>
					</dialog>
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
									<p>
										Id: {task.id} - ProjectId: {task.projectId}
									</p>
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
												onClick={openEditDialogTask}
											>
												Edit
											</button>
											<dialog
												ref={editDialogTaskRef}
												className='dialog rounded-md p-8 w-[400px]'
											>
												<form
													className='flex flex-col justify-center items-center gap-4 w-full'
													onSubmit={(e) => hadleEditTask(e, task.id)}
												>
													<label htmlFor='title'>Title:</label>
													<input
														type='text'
														name='title'
														id='title'
														className='mb-4 border-2 border-gray-300 p-2 rounded-md'
														value={task?.title}
														onChange={(e) =>
															setTasks((prevTasks) =>
																prevTasks?.map((t) =>
																	t.id === task.id
																		? { ...t, title: e.target.value }
																		: t
																)
															)
														}
													/>
													<label htmlFor='descriptionTask'>Description:</label>
													<textarea
														name='descriptionTask'
														id='descriptionTask'
														className='mb-4 border-2 border-gray-300 p-2 rounded-md h-60'
														value={task?.description}
														onChange={(e) =>
															setTasks((prevTasks) =>
																prevTasks?.map((t) =>
																	t.id === task.id
																		? { ...t, description: e.target.value }
																		: t
																)
															)
														}
													/>
													<label htmlFor='status'>Status:</label>
													<select
														name='status'
														id='status'
														className='mb-4 border-2 border-gray-300 p-2 rounded-md'
														value={task?.status}
														onChange={(e) =>
															setTasks((prevTasks) =>
																prevTasks?.map((t) =>
																	t.id === task.id
																		? { ...t, status: e.target.value }
																		: t
																)
															)
														}
													>
														<option value='COMPLETE'>Complete</option>
														<option value='PENDING'>Pending</option>
													</select>

													<div className='buttons flex flex-row justify-center'>
														<input
															type='cancel'
															value='Cancel'
															className='border-2 border-gray-300 p-2 rounded-md m-4 w-20 hover:bg-gray-300 text-center'
															onClick={closeEditDialogTask}
															readOnly
														/>
														<input
															type='submit'
															value='Edit'
															className='border-2 border-gray-300 p-2 rounded-md m-4 w-20 hover:bg-gray-300 text-center'
															readOnly
														/>
													</div>
												</form>
											</dialog>
										</div>
										<div>
											<button
												className='border-2 border-gray-300 p-2 rounded-md m-4 w-20 hover:bg-gray-300'
												onClick={openDeleteDialogTask}
											>
												Delete
											</button>
											<dialog
												ref={deleteDialogTaskRef}
												className='dialog rounded-md p-12'
											>
												<p>Are you sure you want to delete the task?</p>
												<div className='buttons flex flex-row justify-center'>
													<button
														onClick={closeDeleteDialogTask}
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
