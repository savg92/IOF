import { Link } from 'react-router-dom';
import Logo from '../assets/internet_of_fields_logo.svg';

const Header = () => {
	return (
		<>
			<header className='header flex flex-row justify-between -center p-4'>
				<Link to='/' className='flex flex-row items-center gap-6'>
					<img
						src={Logo}
						alt='logo'
						className='w-20 h-20'
					/>
					<p>IOF</p>
				</Link>
				<nav className='nav flex flex-row items-center'>
					<ul className='flex flex-row items-center gap-8'>
						<li>
							<Link to='/'>Home</Link>
						</li>
						<li>
							<Link to='/about'>About</Link>
						</li>
						<li>
							<Link to='/contact'>Contact</Link>
						</li>
					</ul>
				</nav>
			</header>
		</>
	);
};

export default Header;
