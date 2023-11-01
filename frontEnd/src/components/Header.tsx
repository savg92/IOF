import { Link, NavLink } from 'react-router-dom';
import Logo from '../assets/internet_of_fields_logo.svg';

const Header = () => {
	return (
		<>
			<header className='header flex flex-row justify-between p-4 shadow fixed w-full z-10 bg-white'>
				<Link
					to='/'
					className='flex flex-row items-center gap-6'
				>
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
							<NavLink
								to='/'
								className={({ isActive, isPending }) =>
									isActive || isPending
										? 'underline'
										: 'hover:text-blue-500'
								}
							>
								Home
							</NavLink>
						</li>
						<li>
							<NavLink to='/newProject'
                                className={({ isActive, isPending }) =>
                                    isActive || isPending
                                        ? 'underline'
                                        : 'hover:text-blue-500'
                                }
                            >
                                New Project
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/projects'
                                className={({ isActive, isPending }) =>
                                    isActive || isPending
                                        ? 'underline'
                                        : 'hover:text-blue-500'
                                }
                            >
                                Projects
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/signup'
                                className={({ isActive, isPending }) =>
                                    isActive || isPending
                                        ? 'underline'
                                        : 'hover:text-blue-500'
                                }
                            >
                                Sign Up
                            </NavLink>
                        </li>
					</ul>
				</nav>
			</header>
		</>
	);
};

export default Header;
