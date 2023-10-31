import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Project, User, Task } from '../types';
import { getProjetById } from '../services/projects';
import { getUserById } from '../services/users';
import { getTasksByProjectId } from '../services/tasks';

const Project = () => {
	const [idData, setIdData] = useState<number | null>();
	const [project, setProject] = useState<Project | null>();
	const [author, setAuthor] = useState<User | null>();
	const [tasks, setTasks] = useState<Task[] | null>();

	const { id } = useParams();

	useEffect(() => {
		if (id) {
			setIdData(parseInt(id.substring(1)));
		}
	}, [id]);

	console.log(idData);
	// console.log(project);

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
				console.log(data);
			})
			.catch((error) => {
				console.error('Error fetching projects:', error);
			});
		return () => {
			setTasks(null);
		};
	}, [project?.id]);

	// console.log(author);
	console.log(tasks);

	return (
		<>
			<section>
				<h1 className='underline text-4xl text-center font-bold m-4'>
					Project {project?.id}
				</h1>
				<p>Name: {project?.name}</p>
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
			</section>
			<section>
				<h4 className='underline text-3xl text-center font-bold m-4'>Tasks:</h4>
				{tasks?.length > 0 ? (
					<ol>
						{tasks?.map((task, index) => (
							<li key={index}>
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
							</li>
						))}
					</ol>
				) : (
					<p>No tasks</p>
				)}
			</section>
			<section></section>
		</>
	);
};

export default Project;
