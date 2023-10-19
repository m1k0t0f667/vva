import React, { useState, useRef, useEffect } from 'react';
import logo from '../logo.svg';
import Navbar from '../Pages/Components/Navbar';

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

import rugbyFieldImage from '../Assets/images.jpg';
import rugbyFieldFooterImage from '../Assets/gazon.jpg';

function Page() {
  const [currentImage, setCurrentImage] = useState(logo);
  const [showDropdown, setShowDropdown] = useState(false);
  const [data, setData] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [buttonClicked, setButtonClicked] = useState(false);
  const dropdownRef = useRef(null);
  const logoRef = useRef(null);

  const handleHomeClick = () => {
    window.location.href = 'http://localhost:3000/';
  };

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
    { name: 'Chili', image: team7Image, countryCode: 'Chile' },
    { name: 'Écosse', image: team8Image, countryCode: 'Scotland' },
    { name: 'Fidji', image: team9Image, countryCode: 'Fiji' },
    { name: 'Géorgie', image: team10Image, countryCode: 'Georgia' },
    { name: 'Irlande', image: team11Image, countryCode: 'Ireland' },
    { name: 'Italie', image: team12Image, countryCode: 'Italy' },
    { name: 'Japon', image: team13Image, countryCode: 'Japan' },
    { name: 'Namibie', image: team14Image, countryCode: 'Namibia' },
    { name: 'Nouvelle-Zélande', image: team15Image, countryCode: 'New Zealand' },
    { name: 'Pays de Galles', image: team16Image, countryCode: 'Wales' },
    { name: 'Roumanie', image: team17Image, countryCode: 'Romania' },
    { name: 'Samoa', image: team18Image, countryCode: 'Samoa' },
    { name: 'Tonga', image: team19Image, countryCode: 'Tonga' },
    { name: 'Uruguay', image: team20Image, countryCode: 'Uruguay' },
  ];

  const handleImageChange = (teamImage, countryCode) => {
    setCurrentImage(teamImage);
    setShowDropdown(false);
    setData(null);
    setSelectedCountry(countryCode);
  };

  const handleStart = () => {
    setButtonClicked(true);
    const selectedTeam = teams.find(team => team.image === currentImage);
    if (selectedTeam) {
      fetch(`http://127.0.0.1:8000/${selectedTeam.countryCode}`)
        .then(response => response.json())
        .then(data => setData(data))
        .catch(error => console.error('Erreur lors de la récupération des données:', error));
    }
  };

  const get_winner_by_points = (match) => {
    if (!match.score1 || !match.score2) return "Match non joué";
    if (match.score1 === match.score2) return "Match nul";
    return parseInt(match.score1) > parseInt(match.score2) ? match.team1 : match.team2;
  };

  const determineColor = (match) => {
    const winner = get_winner_by_points(match);
    if (selectedCountry === winner) return 'text-green-500';
    if (selectedCountry === match.team1 || selectedCountry === match.team2) return 'text-red-500';
    return 'text-gray-500';
  };

  return (
    <div className="bg-green-100 bg-cover bg-center min-h-screen" style={{ backgroundImage: `url(${rugbyFieldImage})` }}>
      <Navbar />
      <div className="flex justify-center items-center min-h-screen bg-gray-200">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <div className="relative">
            <img
              ref={logoRef}
              src={currentImage}
              alt="Current Team"
              className={`w-48 h-48 rounded-full cursor-pointer mx-auto ${buttonClicked ? 'mt-8' : ''}`}
              onClick={() => setShowDropdown(!showDropdown)}
            />
            {showDropdown && (
              <div ref={dropdownRef} className="absolute mt-5 w-64 rounded-md shadow-lg bg-white overflow-y-auto" style={{ maxHeight: '300px' }}>
                <div className="py-1">
                  {teams.map(team => (
                    <a
                      key={team.name}
                      href="#"
                      className="flex items-center block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
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
          {data && (
            <div className="mt-4 text-lg">
              Le vainqueur potentiel du match {data.next_matches[0].team1} VS {data.next_matches[0].team2} est {data.next_matches[0].winner_by_all_matches}
            </div>
          )}
          {data && (
            <div className="mt-6 grid grid-cols-2 gap-4">
              <h2 className="text-2xl font-bold mb-4 col-span-2">Anciens Résultats</h2>
              {data.result10.map((match, index) => (
                <div key={index} className="bg-gray-100 p-4 mb-4 rounded-lg shadow-md">
                  <div className="flex justify-between">
                    <span>{match.team1} vs {match.team2}</span>
                    <span className={determineColor(match)}>
                      {match.score1} - {match.score2}
                    </span>
                  </div>
                  <div className="mt-2 text-sm text-gray-500">
                    Gagné par {get_winner_by_points(match)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="bg-cover bg-center bg-no-repeat py-24" style={{ backgroundImage: `url(${rugbyFieldFooterImage})` }}>
        {/* Contenu du footer ici */}
      </div>
    </div>
  );
}

export default Page;
