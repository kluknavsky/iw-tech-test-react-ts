import React, { useState } from 'react';

export const EstablishmentsTableRow: React.FC<{
  establishment: { [key: string]: string } | null | undefined;
  onFavouriteToggle: (establishment: { [key: string]: string } | null | undefined, isFavourite: boolean) => void;
}> = ({ establishment, onFavouriteToggle }) => {

  const [isHovered, setIsHovered] = useState(false);

  const linkStyle: React.CSSProperties = {
    color: isHovered ? 'red' : 'white',
    textDecoration: isHovered ? 'underline' : 'none',
    fontWeight: 'bold',
    transition: '0.3s'
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <tr>
      <td>
        <input 
          type="checkbox" 
          onChange={(e) => onFavouriteToggle(establishment, e.target.checked)}
        />
      </td>
      <td>
        <a style={linkStyle} 
          href={`/establishment/${establishment?.FHRSID}`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          >{establishment?.BusinessName}</a>
      </td>
      <td>{establishment?.RatingValue}</td>
    </tr>
  );
};