import { useEffect, useState } from 'react';
import { getTaskCollaborationsByUserId } from '../services/taskCollaborations';
import { Task, TaskCollaborator } from '../types';
// import Card from '../components/Cards';

const MyTasks = () => {
	const [tasks, setTasks] = useState<Task[]>([]);
	const [searchTerm, setSearchTerm] = useState('');

	useEffect(() => {
		const controller = new AbortController();
		getTaskCollaborationsByUserId(1)
			.then((data) => {
				setTasks(data.map((task: TaskCollaborator) => task.task));
			})
			.catch((error) => {
				console.error('Error fetching Tasks:', error);
			});
		return () => {
			controller.abort();
		};
	}, []);

	// console.log(tasks);

	return (
		<>
			<h1 className='text-4xl text-center font-bold m-4'>Tasks</h1>
			<input
				type='text'
				placeholder='Search'
				className='border-2 border-gray-300 p-2 rounded-md m-4'
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
			/>

			<section className='Tasks flex flex-col justify-center items-center gap-4 m-4'>
				<ol className='flex flex-wrap gap-4 justify-center items-center'>
					{tasks
						.filter((task) => {
							if (searchTerm === '') {
								return task;
							} else if (
								task.title?.toLowerCase().includes(searchTerm.toLowerCase())
							) {
								return task;
							}
						})
						.map((task) => (
							<li
								key={task.id}
								className='border-2 border-gray-300 p-2 rounded-md w-1/4 items-start align-baseline justify-normal text-left'
							>
								{/* <Card
									name={task.title}
									description={task.description}
									status={task.status}
								/> */}
								<h4 className='font-bold text-center underline'>
									Title: {task.title}
								</h4>
								<p>
									Description: {task.description}
								</p>
								<p>
									Status: {task.status}
								</p>
							</li>
						))}
				</ol>
			</section>
		</>
	);
};

export default MyTasks;
