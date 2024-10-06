const Header = () => {
    return (
        <header className="bg-black flex items-stretch">
        <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-pink-600 text-3xl font-bold py-8 font-mono">FIAP Blog</h1>
            <nav>
                <ul className="flex">
                    <li className="text-white mx-4 hover:underline cursor-pointer">Home</li>
                    <li className="text-white mx-4 hover:underline cursor-pointer">About</li>
                    <li className="text-white mx-4 hover:underline cursor-pointer">Contact</li>
                </ul>
            </nav>
        </div>
        </header>
    );
    };
export default Header;