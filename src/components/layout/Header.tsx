import { BiLayerMinus } from 'react-icons/bi';
import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <header className="px-6 py-4 border-b-gray-200 border-b shadow-sm sticky top-0 bg-white z-10">
            <Link className="flex items-center gap-4" to="/">
                <BiLayerMinus className="w-6 h-6 hover:text-blue-400 duration-300" />
                <span>
                    Crop <strong className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-green-500 font-bold">Background</strong>
                </span>
            </Link>
        </header>
    );
}
