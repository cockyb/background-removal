import Header from 'components/layout/Header';
import { Outlet } from 'react-router';

export default function Layout() {
    return (
        <>
            <Header />
            <div className="flex">
                <main className="px-6 py-6 flex-1">
                    <Outlet />
                </main>
            </div>
        </>
    );
}
