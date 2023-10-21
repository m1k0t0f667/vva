import React, { useEffect, useRef } from 'react';

function ImageDropdownRight({ teams, onImageChange, isOpen }) {
  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      if (isOpen) {
        onImageChange(null, null);
      }
    }
  };

  useEffect(() => {
    const handleClick = (event) => {
      handleClickOutside(event);
    };

    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [isOpen, onImageChange]);

  return (
    <div className="relative">
      {/* Image droite */}
      <div>
        {/* Affichez ici votre image droite */}
      </div>

      {isOpen && (
        <div className="absolute right-0 mt-4 transform translate-x-1/2 w-64 rounded-md shadow-lg bg-white overflow-y-auto" style={{ maxHeight: '300px', right: '50%' }} ref={dropdownRef}>
          <div className="py-1">
            {teams.map((team) => (
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
      )}
    </div>
  );
}

export default ImageDropdownRight;
