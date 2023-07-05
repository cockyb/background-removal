import Layout from 'components/layout/Layout';
import Home from 'pages/Home';
import type { RouteObject } from 'react-router-dom';
import { createBrowserRouter } from 'react-router-dom';

const routes: RouteObject[] = [
    {
        path: '/',
        element: <Layout />,
        children: [{ path: '/', element: <Home /> }],
    },
];

export const router = createBrowserRouter(routes);
