import React from 'react';

function ImageDropdown({ teams, onImageChange }) {
  return (
    <div className="absolute mt-5 w-64 rounded-md shadow-lg bg-white overflow-y-auto" style={{ maxHeight: '300px' }}>
      <div className="py-1">
        {teams.map(team => (
          <a
            key={team.name}
            href="#"
            className="flex items-center block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={(e) => {
              e.preventDefault();
              onImageChange(team.image, team.countryCode);
            }}
          >
            <img src={team.image} alt={team.name} className="w-10 h-10 rounded-full mr-3" />
            {team.name}
          </a>
        ))}
      </div>
    </div>
  );
}

export default ImageDropdown;
