import Header from 'components/layout/Header';
import { Outlet } from 'react-router';

export default function Layout() {
    return (
        <>
            <Header />
            <div className="flex">
                <aside className="w-60" />
                <main className="px-6 py-6">
                    <Outlet />
                </main>
                <aside className="w-60" />
            </div>
        </>
    );
}
