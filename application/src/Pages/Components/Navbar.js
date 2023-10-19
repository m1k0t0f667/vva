import React from 'react';

function Navbar(props) {
    return (
        <nav className="bg-green-600 p-4 text-white shadow-md">
            <div className="container mx-auto">
                <ul className="flex justify-around">
                    <li className="hover:text-green-300">
                        <a href="#" onClick={props.onHomeClick}>Accueil</a>
                    </li>
                    <li className="hover:text-green-300">
                        <a href="#">Vainqueur</a>
                    </li>
                    <li className="hover:text-green-300">
                        <a href="#">Simulation</a>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
