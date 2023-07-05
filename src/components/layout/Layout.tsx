import Header from 'components/layout/Header';
import { Outlet } from 'react-router';

export default function Layout() {
    return (
        <>
            <Header />
            <main className="px-6 py-6">
                <Outlet />
            </main>
        </>
    );
}
