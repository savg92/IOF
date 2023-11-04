import {
	Card,
	Input,
	Button,
	Typography,
} from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';

const LogIn = () => {
	const navigate = useNavigate();

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const form = event.currentTarget;
		const emailElement = form.elements.namedItem(
			'email'
		) as HTMLInputElement | null;
		const passwordElement = form.elements.namedItem(
			'password'
		) as HTMLInputElement | null;

		if (!emailElement || !passwordElement) {
			console.error('Form elements not found');
			return;
		}

		const user = {
			email: emailElement.value,
			password: passwordElement.value,
		};

		console.log(user);

		// createUser(user)
		// 	.then((data) => {
		// 		console.log(data);
		// 		navigate('/');
		// 	})
		// 	.catch((error) => {
		// 		console.error('Error creating user:', error);
		// 	});

		emailElement.value = '';
		passwordElement.value = '';
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
						Log In
					</Typography>
					<Typography
						color='gray'
						className='mt-1 font-normal'
					>
						Enter your details to log in.
					</Typography>
					<form
						className='mt-8 mb-2 w-80 max-w-screen-lg sm:w-96'
						onSubmit={handleSubmit}
					>
						<div className='mb-1 flex flex-col gap-6'>
							<Typography
								variant='h6'
								color='blue-gray'
								className='-mb-3'
							>
								Your Email
							</Typography>
							<Input
								size='lg'
								placeholder='name@mail.com'
								className=' !border-t-blue-gray-200 focus:!border-t-gray-900'
								labelProps={{
									className: 'before:content-none after:content-none',
								}}
								crossOrigin={'anonymous'}
								type='text'
								name='email'
								id='email'
								required
							/>
							<Typography
								variant='h6'
								color='blue-gray'
								className='-mb-3'
							>
								Password
							</Typography>
							<Input
								type='password'
								size='lg'
								placeholder='********'
								className=' !border-t-blue-gray-200 focus:!border-t-gray-900'
								labelProps={{
									className: 'before:content-none after:content-none',
								}}
								crossOrigin={'anonymous'}
								name='password'
								id='password'
								required
								minLength={8}
								maxLength={16}
							/>
						</div>
						<Button
							className='mt-6'
							fullWidth
							type='submit'
						>
							sign in
						</Button>
					</form>
				</Card>
			</div>
		</>
	);
};

export default LogIn;
