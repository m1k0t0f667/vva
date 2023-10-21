import React, { useState, useRef, useEffect } from "react";
import logo from "../Assets/oracle.png";
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
import PreviousResults from "./Components/PreviousResults";;

function Square() {
    const [currentImage, setCurrentImage] = useState(logo);
    const [showDropdown, setShowDropdown] = useState(false);
    const [data, setData] = useState(null);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [showBackButton, setShowBackButton] = useState(false);
    const [teamDisqualified, setTeamDisqualified] = useState(false);
    const teams = [
        { name: "France", image: team1Image, countryCode: "France" },
        { name: "Portugal", image: team2Image, countryCode: "Portugal" },
        { name: "Angleterre", image: team3Image, countryCode: "England" },
        { name: "Argentine", image: team4Image, countryCode: "Argentina" },
        { name: "Afrique du Sud", image: team5Image, countryCode: "South Africa" },
        { name: "Australie", image: team6Image, countryCode: "Australia" },
        { name: "Chili", image: team7Image, countryCode: "Chile" },
        { name: "Écosse", image: team8Image, countryCode: "Scotland" },
        { name: "Fidji", image: team9Image, countryCode: "Fiji" },
        { name: "Géorgie", image: team10Image, countryCode: "Georgia" },
        { name: "Irlande", image: team11Image, countryCode: "Ireland" },
        { name: "Italie", image: team12Image, countryCode: "Italy" },
        { name: "Japon", image: team13Image, countryCode: "Japan" },
        { name: "Namibie", image: team14Image, countryCode: "Namibia" },
        {
          name: "Nouvelle-Zélande",
          image: team15Image,
          countryCode: "New Zealand",
        },
        { name: "Pays de Galles", image: team16Image, countryCode: "Wales" },
        { name: "Roumanie", image: team17Image, countryCode: "Romania" },
        { name: "Samoa", image: team18Image, countryCode: "Samoa" },
        { name: "Tonga", image: team19Image, countryCode: "Tonga" },
        { name: "Uruguay", image: team20Image, countryCode: "Uruguay" },
      ];
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <div className="mb-4">
        <img
          ref={logoRef}
          src={currentImage}
          alt="Current Team"
          className={`w-48 h-48 rounded-full cursor-pointer mx-auto`}
          onClick={() => setShowDropdown(!showDropdown)}
        />
      </div>
      {showDropdown && (
        <ImageDropdown
          teams={teams}
          onImageChange={handleImageChange}
          dropdownRef={dropdownRef}
        />
      )}
      <div className="flex flex-col items-center">
        {selectedCountry !== null && !data && (
          <button
            className="mt-8 bg-blue-500 hover:bg-blue-600 text-white py-2 px-8 rounded-full mx-auto block"
            onClick={handleStart}
          >
            Start
          </button>
        )}
        {showBackButton && (
          <div className="mt-8">
            <button
              className="bg-red-500 hover:bg-red-600 text-white py-2 px-8 rounded-full mx-auto block"
              onClick={handleBackClick}
            >
              Retour
            </button>
          </div>
        )}
      </div>
      {teamDisqualified ? (
        <div className="mt-4 text-lg">Équipe disqualifiée</div>
      ) : (
        data && (
          <div className="mt-4 text-lg">
            Le vainqueur potentiel du match {data.next_matches[0].team1} VS{" "}
            {data.next_matches[0].team2} est{" "}
            {data.next_matches[0].winner_by_all_matches}
          </div>
        )
      )}

      {data && (
        <PreviousResults data={data} selectedCountry={selectedCountry} />
      )}
    </div>
  )
}

export default Square