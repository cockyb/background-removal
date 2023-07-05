import { RouterProvider } from 'react-router';
import { router } from 'routes/router';
import 'styles/App.css';

export default function App() {
    return <RouterProvider router={router} />;
}
