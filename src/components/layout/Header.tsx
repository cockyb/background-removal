import { BiLayerMinus } from 'react-icons/bi';
import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <header className="px-6 py-4 border-b-gray-200 border-b shadow-sm sticky top-0 bg-white">
            <Link className="flex items-center gap-4" to="/">
                <BiLayerMinus className="w-6 h-6 hover:text-blue-400 duration-300" />
                <span>
                    Remove <strong className="text-blue-400">Background</strong>
                </span>
            </Link>
        </header>
    );
}
