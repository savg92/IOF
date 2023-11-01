import { useState } from 'react';
import {
	Card,
	Input,
	Checkbox,
	Button,
	Typography,
} from '@material-tailwind/react';
import { Link, useNavigate } from 'react-router-dom';
import { createUser } from '../services/users';


const SingUp = () => {
	const navigate = useNavigate();

	const [repeatPassword, setRepeatPassword] = useState('');

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const form = event.currentTarget;
		const nameElement = form.elements.namedItem(
			'name'
		) as HTMLInputElement | null;
		const lastnameElement = form.elements.namedItem(
			'lastname'
		) as HTMLInputElement | null;
		const emailElement = form.elements.namedItem(
			'email'
		) as HTMLInputElement | null;
		const passwordElement = form.elements.namedItem(
			'password'
		) as HTMLInputElement | null;

		if (!nameElement || !lastnameElement || !emailElement || !passwordElement) {
			console.error('Form elements not found');
			return;
		}

		if (passwordElement.value !== repeatPassword) {
			alert('Passwords do not match');
			return;
		}

		const user = {
			name: nameElement.value,
			lastname: lastnameElement.value,
			email: emailElement.value,
			password: passwordElement.value,
		};

		console.log(user);

		createUser(user).then((data) => {
			console.log(data);
			alert('User created successfully');
			navigate('/');
		}).catch((error) => {
			console.error('Error creating user:', error);
		});

		nameElement.value = '';
		lastnameElement.value = '';
		emailElement.value = '';
		passwordElement.value = '';
	}

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
						Sign Up
					</Typography>
					<Typography
						color='gray'
						className='mt-1 font-normal'
					>
						Nice to meet you! Enter your details to register.
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
								Your Name
							</Typography>
							<Input
								size='lg'
								placeholder='Name'
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
								Your Lastname
							</Typography>
							<Input
								size='lg'
								placeholder='Lastname'
								className=' !border-t-blue-gray-200 focus:!border-t-gray-900'
								labelProps={{
									className: 'before:content-none after:content-none',
								}}
								crossOrigin={'anonymous'}
								type='text'
								name='lastname'
								id='lastname'
								required
							/>
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
							<Input
								type='password'
								size='lg'
								placeholder='Repeat password'
								className=' !border-t-blue-gray-200 focus:!border-t-gray-900'
								labelProps={{
									className: 'before:content-none after:content-none',
								}}
								crossOrigin={'anonymous'}
								name='repeatPassword'
								id='repeatPassword'
								required
								minLength={8}
								maxLength={16}
								value={repeatPassword}
								onChange={(e) => setRepeatPassword(e.target.value)}
							/>
						</div>
						<Checkbox
							label={
								<Typography
									variant='small'
									color='gray'
									className='flex items-center font-normal'
								>
									I agree the
									<a
										href='#'
										className='font-medium transition-colors hover:text-gray-900'
									>
										&nbsp;Terms and Conditions
									</a>
								</Typography>
							}
							containerProps={{ className: '-ml-2.5' }}
							crossOrigin={'anonymous'}
							required
						/>
						<Button
							className='mt-6'
							fullWidth
							type='submit'
						>
							sign up
						</Button>
						<Typography
							color='gray'
							className='mt-4 text-center font-normal'
						>
							Already have an account?{' '}
							<Link
								to='/signIn'
								className='font-medium text-gray-900'
							>
								Sign In
							</Link>
						</Typography>
					</form>
				</Card>
			</div>
		</>
	);
};

export default SingUp;
