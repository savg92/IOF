import { useEffect, useState } from 'react';
import { getAllProjects } from '../services/projects';
import { Project } from '../types';

// const API_URL = import.meta.env.VITE_API_URL;

const Projects = () => {
	const [projects, setProjects] = useState<Project[]>([]);

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
			<h1>Projects</h1>
			<ol>
				{projects.map((project, index) => (
					<li key={index} className='card p-4 my-4 shadow rounded'>
            <p>
              <strong>Project ID:</strong> {project.id}
            </p>
						<h2>{project.name}</h2>
						<p>{project.description}</p>
					</li>
				))}
			</ol>
		</>
	);
};

export default Projects;
