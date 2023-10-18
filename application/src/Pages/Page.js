import React, { useState, useRef, useEffect } from 'react';
import logo from '../logo.svg'; 
import team1Image from '../Assets/france.png'; 
import team2Image from '../Assets/portugal.png'; 

function Page() {
    const [currentImage, setCurrentImage] = useState(logo);
    const [showDropdown, setShowDropdown] = useState(false);
    const logoRef = useRef(null);
    const dropdownRef = useRef(null);

    const teams = [
        { name: 'Équipe 1', image: team1Image },
        { name: 'Équipe 2', image: team2Image },
        // La tu ajoute t'es équipes 
    ];

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (showDropdown &&
                logoRef.current && !logoRef.current.contains(event.target) &&
                dropdownRef.current && !dropdownRef.current.contains(event.target)
            ) {
                setShowDropdown(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showDropdown]);

    return (
        <div className="flex justify-center items-center h-screen bg-gray-200">
            <div className="bg-white p-16 rounded-lg shadow-xl">
                <div className="relative">
                    <img
                        ref={logoRef}
                        src={currentImage}
                        alt="Current Team"
                        className="w-64 h-64 rounded-full cursor-pointer mx-auto"
                        onClick={() => setShowDropdown(!showDropdown)}
                    />

                    {showDropdown && (
                        <div ref={dropdownRef} className="absolute mt-5 w-64 rounded-md shadow-lg bg-white">
                            <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                {teams.map(team => (
                                    <a 
                                        key={team.name} 
                                        href="#" 
                                        className="flex items-center block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" 
                                        role="menuitem"
                                        onClick={() => {
                                            setCurrentImage(team.image);
                                            setShowDropdown(false); // Ferme le menu déroulant
                                        }}
                                    >
                                        <img src={team.image} alt={team.name} className="w-10 h-10 rounded-full mr-3"/>
                                        {team.name}
                                    </a>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <button className="mt-8 bg-blue-500 hover:bg-blue-600 text-white py-2 px-8 rounded-full mx-auto block">
                    Start
                </button>
            </div>
        </div>
    );
}

export default Page;
