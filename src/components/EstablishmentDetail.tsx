import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getEstablishmentDetails } from "../api/ratingsAPI";

export const EstablishmentDetail: React.FC = () => {

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [establishment, setEstablishment] = useState<any | null>(null);

  const theStyle = {
    background: "rgba(51, 51, 51, 0.9)",
    padding: "10px",
    width: "max-content",
    marginLeft: "50px",
    color: "white",
    fontSize: "20px"
  };

  useEffect(() => {
    if (id) {
      getEstablishmentDetails(id).then(data => {
        //console.log(data);
        setEstablishment(data);
      });
    }
  }, [id]);

  if (!establishment) return <div style={theStyle}>Loading...</div>;

  const formattedDate = new Date(establishment.RatingDate).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit'
  });

  return (
    <div style={theStyle}>
      <h1>{establishment.BusinessName}</h1>
      <p>Address: {establishment.AddressLine1}</p>
      <p>Rating: {establishment.RatingValue}</p>
      <p>Date of Inspection: {formattedDate}</p>
      <button onClick={() => navigate(-1)}>Go Back</button>
    </div>
  );
};
