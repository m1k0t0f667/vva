import React, { useState, useRef, useEffect } from 'react';
import logo from '../logo.svg';
import team1Image from '../Assets/france.png';
import team2Image from '../Assets/portugal.png';
import team3Image from '../Assets/england.png';

function Page() {
    const [currentImage, setCurrentImage] = useState(logo);
    const [showDropdown, setShowDropdown] = useState(false);
    const logoRef = useRef(null);
    const dropdownRef = useRef(null);
    const [prediction, setPrediction] = useState(null);

    const teams = [
        { name: 'Équipe 1', image: team1Image, countryCode: 'france' },
        { name: 'Équipe 2', image: team2Image, countryCode: 'portugal' },
        { name: 'Équipe 3', image: team3Image, countryCode: 'England' },

        // Ajoutez d'autres équipes et leurs codes de pays ici
    ];

    const handleImageChange = (teamImage, countryCode) => {
        setCurrentImage(teamImage);
        setShowDropdown(false); // Ferme le menu déroulant après avoir sélectionné une équipe
        // Vous pourriez potentiellement utiliser countryCode pour la requête vers l'API
    };

    const handleStart = () => {
        const selectedTeam = teams.find(team => team.image === currentImage);
        if (selectedTeam) {
            fetch(`http://127.0.0.1:8000/${selectedTeam.countryCode}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    const predictedWinner = data.next_matches[0].winner_by_all_matches;
                    setPrediction(predictedWinner);
                })
                .catch(error => console.error('Erreur lors de la récupération des données:', error));
        }
    };
    

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
                                        onClick={(e) => {
                                            e.preventDefault(); // Pour éviter le comportement par défaut du lien
                                            handleImageChange(team.image, team.countryCode);
                                        }}
                                    >
                                        <img src={team.image} alt={team.name} className="w-10 h-10 rounded-full mr-3" />
                                        {team.name}
                                    </a>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
                <button className="mt-8 bg-blue-500 hover:bg-blue-600 text-white py-2 px-8 rounded-full mx-auto block" onClick={handleStart}>
                    Start
                </button>
                {prediction && <div className="mt-4 text-lg">{prediction}</div>}
            </div>
        </div>
    );
}

export default Page;
