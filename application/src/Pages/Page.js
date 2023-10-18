import React, { useState, useRef, useEffect } from 'react';
import logo from '../logo.svg';
import team1Image from '../Assets/france.png';
import team2Image from '../Assets/portugal.png';
import team3Image from '../Assets/england.png';
import team4Image from '../Assets/Argentine.png';
import team5Image from '../Assets/afrique du sud.png';
import team6Image from '../Assets/Australie.png';
import team7Image from '../Assets/Chilli.png';
import team8Image from '../Assets/Ecosse.jpg';
import team9Image from '../Assets/Fidji.jpg';
import team10Image from '../Assets/Géorgie.png';
import team11Image from '../Assets/Irlande.png';
import team12Image from '../Assets/italie.png';
import team13Image from '../Assets/Japon.png';
import team14Image from '../Assets/Namibie.png';
import team15Image from '../Assets/Nouvelle-Zélande.png';
import team16Image from '../Assets/Pays de Galles.png';
import team17Image from '../Assets/Roumanie.png';
import team18Image from '../Assets/Samoa.png';
import team19Image from '../Assets/Tonga.jpg';
import team20Image from '../Assets/Uruguay.png';








function Page() {
    const [currentImage, setCurrentImage] = useState(logo);
    const [showDropdown, setShowDropdown] = useState(false);
    const [prediction, setPrediction] = useState(null);
    const dropdownRef = useRef(null);
    const logoRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target) && !logoRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const teams = [
        { name: 'France', image: team1Image, countryCode: 'France' },
        { name: 'Portugal', image: team2Image, countryCode: 'Portugal' },
        { name: 'Angleterre', image: team3Image, countryCode: 'England' },
        { name: 'Argentine', image: team4Image, countryCode: 'Argentina' },
        { name: 'Afrique du Sud', image: team5Image, countryCode: 'South Africa' },
        { name: 'Australie', image: team6Image, countryCode: 'Australia' },
        { name: 'Chilli', image: team7Image, countryCode: 'Chile' },
        { name: 'Ecosse', image: team8Image, countryCode: 'Scotland' },
        { name: 'Fidji', image: team9Image, countryCode: 'Fiji' },
        { name: 'Géorgie', image: team10Image, countryCode: 'Georgia' },
        { name: 'Irlande', image: team11Image, countryCode: 'Ireland' },
        { name: 'Italie', image: team12Image, countryCode: 'Italia' },
        { name: 'Japon', image: team13Image, countryCode: 'Japan' },
        { name: 'Namibie', image: team14Image, countryCode: 'Namibia' },
        { name: 'Nouvelle-Zélande', image: team15Image, countryCode: 'New Zealand' },
        { name: 'Pays de Galles', image: team16Image, countryCode: 'Wales' },
        { name: 'Roumanie', image: team17Image, countryCode: 'Romania' },
        { name: 'Samoa', image: team18Image, countryCode: 'Samoa' },
        { name: 'Tonga', image: team19Image, countryCode: 'Tonga' },
        { name: 'Uruguay', image: team20Image, countryCode: 'Uruguay' },

        
        // ... autres équipes
    ];

    const handleImageChange = (teamImage, countryCode) => {
        setCurrentImage(teamImage);
        setShowDropdown(false);
        setPrediction(null);
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
                        <div ref={dropdownRef} className="absolute mt-5 w-64 rounded-md shadow-lg bg-white overflow-y-auto" style={{maxHeight: '300px'}}>
                            <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                {teams.map(team => (
                                    <a 
                                        key={team.name} 
                                        href="#" 
                                        className="flex items-center block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" 
                                        role="menuitem"
                                        onClick={(e) => {
                                            e.preventDefault();
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
