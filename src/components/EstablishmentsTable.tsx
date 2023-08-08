import React, { useState, useEffect } from "react";
import { EstablishmentsTableRow } from "./EstablishmentsTableRow";
import PropTypes from "prop-types";
import { getAuthorities } from "../api/ratingsAPI";

const headerStyle: { [key: string]: string | number } = {
  paddingBottom: "10px",
  textAlign: "left",
  fontSize: "20px",
};

export const EstablishmentsTable: React.FC<{
  establishments: { [key: string]: string }[] | null | undefined;
  favourites: { [key: string]: string }[];
  onFavouriteToggle: (establishment: { [key: string]: string } | null | undefined, isFavourite: boolean) => void;
}> = ({ establishments, favourites, onFavouriteToggle }) => 
{

  const [selectedAuthority, setSelectedAuthority] = useState<string | null>(null);
  const [filteredEstablishments, setFilteredEstablishments] = useState(establishments);
  const [authorities, setAuthorities] = useState<string[]>([]);
  
  useEffect(() => {
    getAuthorities().then(data => {
      setAuthorities(data.authorities.map((auth: any) => auth.Name));
    });
  }, []);

  const handleAuthorityChange = (authority: string) => {
    setSelectedAuthority(authority);
    if (authority) {
      const filtered = establishments?.filter(
        (establishment) => establishment.authority === authority
      );
      setFilteredEstablishments(filtered);
    } else {
      setFilteredEstablishments(establishments);
    }
  };

  return (
    <div>
      
      <select value={selectedAuthority || ''} onChange={(e) => handleAuthorityChange(e.target.value)}>
        <option value="">Select an Authority</option>
        {authorities.map((authority) => (
          <option key={authority} value={authority}>
            {authority}
          </option>
        ))}
      </select>

      <table>
        <tbody>
          <tr>
            <th style={headerStyle}>Business Name</th>
            <th style={headerStyle}>Rating Value</th>
          </tr>
          {filteredEstablishments && filteredEstablishments.map(
              (
                establishment: { [key: string]: string } | null | undefined,
                index: React.Key | null | undefined
              ) => (
                <EstablishmentsTableRow
                  key={index}
                  onFavouriteToggle={onFavouriteToggle}
                  establishment={establishment}
                />
              )
            )}
        </tbody>
      </table>
    </div>
  );
};

EstablishmentsTable.propTypes = {
  establishments: PropTypes.array,
};
