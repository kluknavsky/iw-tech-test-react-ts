import { PaginatedEstablishmentsTable } from "./PaginatedEstablishmentsTable";
import Background from "../static/logo.svg";
import React, { useState, useEffect } from 'react';


const logoStyle: { [key: string]: string | number } = {
  width: "640px",
  height: "25px",
  background: `transparent url(${Background}) no-repeat center`,
  margin: "20px auto",
};

const tableStyle = {
  background: "rgba(51, 51, 51, 0.9)",
  padding: "10px",
  width: "max-content",
  marginLeft: "50px",
  color: "white",
  fontSize: "20px"
};

const HomePage = () => {

  const [favourites, setFavourites] = useState<Array<{ [key: string]: string }>>(
    () => JSON.parse(localStorage.getItem("favourites") || "[]")
  );

  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [favourites]);

  const removeFromFavourites = (index: number) => {
    const newFavourites = [...favourites];
    newFavourites.splice(index, 1);
    setFavourites(newFavourites);
  };
  const handleFavouriteToggle = (establishment: { [key: string]: string } | null | undefined, isFavourite: boolean) => {
    if (isFavourite) {
      setFavourites([...favourites, establishment!]);
    } else {
      const index = favourites.findIndex(fav => fav.BusinessName === establishment?.BusinessName);
      removeFromFavourites(index);
    }
  };
    
  return (
  <div>
      <header style={logoStyle} />
      <PaginatedEstablishmentsTable 
        favourites={favourites}
        onFavouriteToggle={handleFavouriteToggle}
      />

      <table style={tableStyle}>
      <tbody>
        <tr>
          <th>Favourite Establishments</th>
          <th>Rating</th>
          <th>Action</th>
        </tr>
        {favourites.map((fav, index) => (
          <tr key={index}>
            <td>{fav.BusinessName}</td>
            <td>{fav.RatingValue}</td>
            <td>
              <button onClick={() => removeFromFavourites(index)}>Remove</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    </div>

  );
};

export default HomePage;
