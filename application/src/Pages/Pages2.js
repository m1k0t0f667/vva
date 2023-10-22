import React, { useState, useRef, useEffect } from "react";
import logo from "../Assets/oracle.png";
import "./Page.css"; 
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
import Card from "./Components/card";
import PreviousResultsNeutral from "./Components/PreviousResultsNeutral";

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
  const [data, setData] = useState(null);
  const [sameTeam, setSameTeam] = useState(false);
  const [teamColor, setTeamColor] = useState("");

  useEffect(() => {
    function handleClickOutsideDropdown(event) {
      if (
        dropdownRef.current &&
        event &&
        !dropdownRef.current.contains(event.target) &&
        !logoRef.current.contains(event.target)
      ) {
        setIsDropdownLeftOpen(false);
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

  const handleImageChange = (teamImage, countryCode, color) => {
    setCurrentImage(teamImage || logo);
    setSelectedCountry(countryCode);
    setIsDropdownLeftOpen(false);
    setTeamColor(color);
  };

  const handleImageChange2 = (teamImage, countryCode, color) => {
    setCurrentImage2(teamImage || logo);
    setSelectedCountry2(countryCode);
    setIsDropdownRightOpen(false);
    setTeamColor(color);
  };

  const handleStart = () => {
    if (selectedCountry && selectedCountry2) {
        if (selectedCountry === selectedCountry2) {
            setSameTeam(true);
        } else {
            setSameTeam(false);
        }
        fetch(
            `http://127.0.0.1:8000/?country_1=${selectedCountry}&country_2=${selectedCountry2}`
        )
            .then((response) => response.json())
            .then((data) => {
                setData(data);

                // Obtenir la couleur de l'équipe gagnante
                let winningTeamColor = "#000000"; // Couleur par défaut au cas ou
                if (data.result_by_victory === selectedCountry) {
                    // L'équipe sélectionnée a gagné
                    teams.forEach((team) => {
                        if (team.countryCode === selectedCountry) {
                            winningTeamColor = team.color;
                        }
                    });
                } else if (data.result_by_victory === selectedCountry2) {
                    // L'autre équipe a gagné
                    teams.forEach((team) => {
                        if (team.countryCode === selectedCountry2) {
                            winningTeamColor = team.color;
                        }
                    });
                }
                setTeamColor(winningTeamColor);
            });
    }
};


  const teams = [
    { name: "France", image: team1Image, countryCode: "France", color: "#123456" },
    { name: "Portugal", image: team2Image, countryCode: "Portugal", color: "#654321" },
    { name: "Angleterre", image: team3Image, countryCode: "England", color: "#789abc" },
    { name: "Argentine", image: team4Image, countryCode: "Argentina", color: "#def123" },
    { name: "Afrique du Sud", image: team5Image, countryCode: "South Africa", color: "#456789" },
    { name: "Australie", image: team6Image, countryCode: "Australia", color: "#ab789c" },
    { name: "Chili", image: team7Image, countryCode: "Chile", color: "#567def" },
    { name: "Écosse", image: team8Image, countryCode: "Scotland", color: "#acdbef" },
    { name: "Fidji", image: team9Image, countryCode: "Fiji", color: "#dea456" },
    { name: "Géorgie", image: team10Image, countryCode: "Georgia", color: "#123def" },
    { name: "Irlande", image: team11Image, countryCode: "Ireland", color: "#789dea" },
    { name: "Italie", image: team12Image, countryCode: "Italy", color: "#456def" },
    { name: "Japon", image: team13Image, countryCode: "Japan", color: "#ab789d" },
    { name: "Namibie", image: team14Image, countryCode: "Namibia", color: "#de456f" },
    { name: "Nouvelle-Zélande", image: team15Image, countryCode: "New Zealand", color: "#456dea" },
    { name: "Pays de Galles", image: team16Image, countryCode: "Wales", color: "#ab45de" },
    { name: "Roumanie", image: team17Image, countryCode: "Romania", color: "#def789" },
    { name: "Samoa", image: team18Image, countryCode: "Samoa", color: "#def123" },
    { name: "Tonga", image: team19Image, countryCode: "Tonga", color: "#acde45" },
    { name: "Uruguay", image: team20Image, countryCode: "Uruguay", color: "#45acde" },
  ];
  

  return (
    <div
      className="bg-green-100 bg-cover bg-center min-h-screen"
      style={{ backgroundImage: `url(${rugbyFieldImage})` }}
    >
      <div className="flex min-h-screen bg-gray-200 flex-col justify-center items-center">
        <div className="flex mb-4 mt-8">
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
                style={{ backgroundColor: teamColor }}
              />
            </div>
            <ImageDropdownLeft
              teams={teams}
              onImageChange={handleImageChange}
              isOpen={isDropdownLeftOpen}
            />
            {data && <Card dataPrediction={data.result_by_ranking[0]} />}
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
                style={{ backgroundColor: teamColor }}
              />
            </div>
            <ImageDropdownRight
              teams={teams}
              onImageChange={handleImageChange2}
              isOpen={isDropdownRightOpen}
            />
            {data && <Card dataPrediction={data.result_by_ranking[1]} />}
          </div>
        </div>
        {selectedCountry && selectedCountry2 && (
          <div>
            <button
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-8 rounded-full"
              onClick={handleStart}
            >
              Start
            </button>
          </div>
        )}
        {!sameTeam ? (
          <div>
            {data && (
              <div className="mt-4 text-lg">
                Le vainqueur potentiel du match {selectedCountry} VS{" "}
                {selectedCountry2}
                <div>
                  Par points : {data.result_by_points[0]}-
                  {data.result_by_points[1]}
                </div>
                <div>Par 10 derniers matchs : {data.result_by_victory10}</div>
                <div>Par victoires : {data.result_by_victory}</div>
              </div>
            )}
            {data && teams && ( // Assurez-vous que 'teams' est défini sinon erreur ..
              data.result10.length !== 0 ? (
                <PreviousResultsNeutral
                  data={data}
                  teams={teams} // Transmettez la liste des équipes ici
                  selectedCountry={selectedCountry}
                />
              ) : (
                <div>No data</div>
              )
            )}
          </div>
        ) : (
          <div>Choisissez deux équipes différentes</div>
        )}
      </div>

      {/* Footer */}
      <div
        className="bg-cover bg-center bg-no-repeat py-24"
        style={{ backgroundImage: `url(${rugbyFieldImage})` }}
      ></div>
    </div>
  );
}

export default Page2;
