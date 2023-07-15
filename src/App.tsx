import { RouterProvider } from 'react-router';
import { router } from 'routes/router';
import 'styles/App.css';
import 'pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css';

export default function App() {
    return <RouterProvider router={router} />;
}
