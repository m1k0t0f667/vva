import React, { useState, useRef, useEffect } from "react";
import logo from "../Assets/oracle.png";
import "./Page.css"; // Assurez-vous que ce fichier CSS est accessible ici
import rugbyFieldImage from "../Assets/gazon.jpg";
import ImageDropdownLeft from "./Components/ImageDropdownLeft";
import ImageDropdownRight from "./Components/ImageDropdownRight";

// Importez vos images d'équipe ici
import team1Image from "../Assets/france.jpg";
import team2Image from "../Assets/portugal.jpg";
import team3Image from "../Assets/england.jpg";
import team4Image from "../Assets/Argentine.png";
import team5Image from "../Assets/afrique du sud.png";
import team6Image from "../Assets/Australie.png";
import team7Image from "../Assets/Chilli.png";
import team8Image from "../Assets/Ecosse.jpg";
import team9Image from "../Assets/Fidji.jpg";
import team10Image from "../Assets/Géorgie.png";
import team11Image from "../Assets/Irlande.png";
import team12Image from "../Assets/italie.png";
import team13Image from "../Assets/Japon.png";
import team14Image from "../Assets/Namibie.png";
import team15Image from "../Assets/Nouvelle-Zélande.png";
import team16Image from "../Assets/Pays de Galles.png";
import team17Image from "../Assets/Roumanie.png";
import team18Image from "../Assets/Samoa.png";
import team19Image from "../Assets/Tonga.jpg";
import team20Image from "../Assets/Uruguay.png";
import ImageDropdown from "./Components/ImageDropdown";
import PreviousResults from "./Components/PreviousResults";

function Page2() {
  const [currentImage, setCurrentImage] = useState(logo);
  const [currentImage2, setCurrentImage2] = useState(logo);
  const [isDropdownLeftOpen, setIsDropdownLeftOpen] = useState(false);
  const [isDropdownRightOpen, setIsDropdownRightOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedCountry2, setSelectedCountry2] = useState(null);
  const dropdownRef = useRef(null);
  const dropdownRef2 = useRef(null);
  const logoRef = useRef(null);
  const logoRef2 = useRef(null);

  useEffect(() => {
    function handleClickOutsideDropdown(event) {
      if (
        dropdownRef.current &&
        event &&
        !dropdownRef.current.contains(event.target) &&
        !logoRef.current.contains(event.target)
      ) {
        setIsDropdownLeftOpen(false);
        // Si aucune équipe n'a été sélectionnée, réaffectez l'image d'origine
        if (!selectedCountry) {
          setCurrentImage(logo);
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutsideDropdown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutsideDropdown);
    };
  }, [isDropdownLeftOpen, selectedCountry]);

  useEffect(() => {
    function handleClickOutsideDropdown2(event) {
      if (
        dropdownRef2.current &&
        event &&
        !dropdownRef2.current.contains(event.target) &&
        !logoRef2.current.contains(event.target)
      ) {
        setIsDropdownRightOpen(false);
        // Si aucune équipe n'a été sélectionnée, réaffectez l'image d'origine
        if (!selectedCountry2) {
          setCurrentImage2(logo);
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutsideDropdown2);

    return () => {
      document.removeEventListener("mousedown", handleClickOutsideDropdown2);
    };
  }, [isDropdownRightOpen, selectedCountry2]);

  const handleImageChange = (teamImage, countryCode) => {
    setCurrentImage(teamImage || logo);
    setSelectedCountry(countryCode);
    setIsDropdownLeftOpen(false);
  };

  const handleImageChange2 = (teamImage, countryCode) => {
    setCurrentImage2(teamImage || logo);
    setSelectedCountry2(countryCode);
    setIsDropdownRightOpen(false);
  };

  const handleStart = () => {
    if (selectedCountry && selectedCountry2) {
      fetch(
        `http://127.0.0.1:8000/?country_1=${selectedCountry}&country_2=${selectedCountry2}`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        });
    }
  };

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

  return (
    <div
      className="bg-green-100 bg-cover bg-center min-h-screen"
      style={{ backgroundImage: `url(${rugbyFieldImage})` }}
    >
      <div className="flex min-h-screen bg-gray-200 flex-col justify-center items-center">
        <div className="flex mb-4">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <div className="mb-4">
              <img
                ref={logoRef}
                src={currentImage}
                alt="Current Team"
                className={`w-48 h-48 rounded-full cursor-pointer mx-auto`}
                onClick={() => {
                  setIsDropdownLeftOpen(!isDropdownLeftOpen);
                  setIsDropdownRightOpen(false);
                }}
              />
            </div>
            <ImageDropdownLeft
              teams={teams}
              onImageChange={handleImageChange}
              isOpen={isDropdownLeftOpen}
            />
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg ml-4">
            <div className="mb-4">
              <img
                ref={logoRef2}
                src={currentImage2}
                alt="Current Team"
                className={`w-48 h-48 rounded-full cursor-pointer mx-auto`}
                onClick={() => {
                  setIsDropdownRightOpen(!isDropdownRightOpen);
                  setIsDropdownLeftOpen(false);
                }}
              />
            </div>
            <ImageDropdownRight
              teams={teams}
              onImageChange={handleImageChange2}
              isOpen={isDropdownRightOpen}
            />
          </div>
        </div>
        <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-8 rounded-full" onClick={handleStart}>
          Start
        </button>
      </div>
    </div>
  );
}

export default Page2;
