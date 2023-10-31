import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '@material-tailwind/react';
import Projects from './components/Projects.tsx';
import ErrorPage from './components/ErrorPage.tsx';
import NewProject from './components/NewProject.tsx';
import SignUp from './components/SignUp.tsx';
import Project from './routes/Project.tsx';

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
    errorElement: <ErrorPage />,
		children: [
			{
				index: true,
				element: <Projects />,
			},
			{
				path: '/project/:id',
				element: <Project />,
			},
      {
        path: '/newProject',
        element: <NewProject />,
      },
      {
        path: '/signUp',
        element: <SignUp />,
      }
      // {
      //   path: 'contact',
      //   element: <h1>Contact</h1>,
      // },
		],
	},
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<ThemeProvider>
			<RouterProvider router={router} />
		</ThemeProvider>
	</React.StrictMode>
);
