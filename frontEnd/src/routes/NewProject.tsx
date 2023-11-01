import { createProjet } from '../services/projects';
import { Project } from '../types';
import { useNavigate } from 'react-router-dom';

import { Card, Input, Button, Typography } from '@material-tailwind/react';

const NewProject = () => {
    const navigate = useNavigate();
    
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
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

		console.log(project);

		createProjet(project)
			.then((data) => {
				console.log(data);
				alert('Project created successfully')
                navigate('/');
			})
			.catch((error) => {
				console.error('Error creating project:', error);
			});

		nameElement.value = '';
		descriptionElement.value = '';
	};

	return (
		<>
			<div className='flex justify-center items-center'>
				<Card
					color='transparent'
					shadow={false}
					className='shadow p-8'
				>
					<Typography
						variant='h4'
						color='blue-gray'
					>
						New Project
					</Typography>
					<Typography
						color='gray'
						className='mt-1 font-normal'
					>
						Enter the details of your new project.
					</Typography>
					<form
						className='mt-8 mb-2 w-80 max-w-screen-lg sm:w-96'
						// action='#'
						onSubmit={handleSubmit}
					>
						<div className='mb-1 flex flex-col gap-6'>
							<Typography
								variant='h6'
								color='blue-gray'
								className='-mb-3'
							>
								Name of the project:
							</Typography>
							<Input
								size='lg'
								placeholder='Name of the project'
								className=' !border-t-blue-gray-200 focus:!border-t-gray-900'
								labelProps={{
									className: 'before:content-none after:content-none',
								}}
								crossOrigin={'anonymous'}
								type='text'
								name='name'
								id='name'
								required
							/>
							<Typography
								variant='h6'
								color='blue-gray'
								className='-mb-3'
							>
								Description:
							</Typography>
							<textarea
								placeholder='Enter the description of the project here...'
								className=' border-t-blue-gray-200 focus:border-t-gray-900 before:content-none after:content-none'
								name='description'
								id='description'
								required
							/>
						</div>
						<Button
							className='mt-6'
							fullWidth
							type='submit'
						>
							Create
						</Button>
					</form>
				</Card>
			</div>
		</>
	);
};

export default NewProject;
