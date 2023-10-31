import { useRouteError } from 'react-router-dom';

const ErrorPage = () => {
    const error = useRouteError();
    console.error(error);

    let errorMessage = '';
    if (typeof error === 'object' && error !== null && 'message' in error) {
        errorMessage = error.message as string;
    }

    return (
        <div id='error-page'>
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
                <i>{errorMessage}</i>
            </p>
            <button onClick={() => window.history.back()} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                Go back...
            </button>
        </div>
    );
}

export default ErrorPage;