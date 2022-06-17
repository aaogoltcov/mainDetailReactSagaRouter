import { Outlet } from 'react-router-dom';
import ErrorBoundary from '../components/ErrorBoundary';

export default function Container() {

    return (
        <div className='container m-2'>
            <ErrorBoundary />
            <Outlet />
        </div>
    )
}