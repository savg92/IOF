import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Projects from './components/Projects.tsx';

const router = createBrowserRouter([
	{
		path: '/',
		element: <App/>,
    children: [
      {
        index: true,
        element: <Projects/>,
      },
      {
        path: 'about',
        element: <h1>About</h1>,
      },
      {
        path: 'contact',
        element: <h1>Contact</h1>,
      },
    ],
	},
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
