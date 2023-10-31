import {
	Card,
	CardHeader,
	CardBody,
	Typography,
	Button,
} from '@material-tailwind/react';
import { Project } from '../types';
import { truncateText } from '../handler/handlers';
import { useNavigate } from 'react-router-dom';

const Cards = ({ id, name, description }: Project) => {
	const navigate = useNavigate();

	return (
		<Card className='w-full max-w-[48rem] flex-row min-w-[35rem] max-h-[15rem]'>
			<CardHeader
				shadow={false}
				floated={false}
				className='m-0 w-2/5 shrink-0 rounded-r-none'
			>
				<img
					src='https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80'
					alt='card-image'
					className='rounded object-cover min-w-full min-h-full max-h-[15rem] max-w-[15rem]'
				/>
			</CardHeader>
			<CardBody>
				<Typography
					variant='h5'
					color='blue-gray'
					className='mb-2'
				>
					{name}
				</Typography>
				<Typography
					color='gray'
					className='mb-8 font-normal'
				>
					{truncateText(description, 100)}
				</Typography>
				<a
					href='#'
					className='inline-block'
				>
					<Button
						variant='text'
						className='flex items-center gap-2'
						onClick={() => {
							navigate(`/project/:${id}`);
						}}
					>
						Learn More
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							stroke='currentColor'
							strokeWidth={2}
							className='h-4 w-4'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3'
							/>
						</svg>
					</Button>
				</a>
			</CardBody>
		</Card>
	);
}

export default Cards;