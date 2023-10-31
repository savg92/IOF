import { useEffect, useState } from 'react';
import { getAllProjects } from '../services/projects';
import { Project } from '../types';
import Card from './Cards';
// const API_URL = import.meta.env.VITE_API_URL;

const Projects = () => {
	const [projects, setProjects] = useState<Project[]>([]);
	const [searchTerm, setSearchTerm] = useState('');

	useEffect(() => {
		getAllProjects()
			.then((data) => {
				setProjects(data);
			})
			.catch((error) => {
				console.error('Error fetching projects:', error);
			});
	}, []);

	return (
		<>
			<h1 className='text-4xl text-center font-bold m-4'>Projects</h1>
			<input
				type='text'
				placeholder='Search'
				className='border-2 border-gray-300 p-2 rounded-md m-4'
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
			/>

			<section className='projects flex flex-col justify-center items-center gap-4 m-4'>
				<ol className='flex flex-wrap gap-4 justify-center items-center'>
					{projects
						.filter(
							(project) =>
								project &&
								(project.name?.includes(searchTerm) ||
									project.description?.includes(searchTerm))
						)
						.map((project, index) => (
							<li key={index}>
								<Card
									id={project.id || 0}
									name={project.name || ''}
									description={project.description || ''}
								/>
							</li>
						))}
				</ol>
			</section>
		</>
	);
};

export default Projects;
