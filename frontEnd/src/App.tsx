import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './components/Header';

function App() {
	return (
		<>
			<Header />
			<main className='main pt-36'>
				<Outlet />
			</main>
		</>
	);
}

export default App;
