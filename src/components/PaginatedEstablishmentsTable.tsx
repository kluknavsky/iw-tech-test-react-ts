import { useState, useEffect } from "react";
import { EstablishmentsTable } from "./EstablishmentsTable";
import { EstablishmentsTableNavigation } from "./EstablishmentsTableNavigation";
import { getEstablishmentRatings } from "../api/ratingsAPI";

const tableStyle = {
  background: "rgba(51, 51, 51, 0.9)",
  padding: "10px",
  width: "max-content",
  marginLeft: "50px",
  color: "white",
  fontSize: "20px"
};

const loadingStyle = {
  background: "rgba(51, 51, 51, 0.9)",
  padding: "15px",
  width: "max-content",
  marginLeft: "50px",
  color: "white",
  fontSize: "20px"
};

export const PaginatedEstablishmentsTable: React.FC<{
  onFavouriteToggle: (establishment: { [key: string]: string } | null | undefined, isFavourite: boolean) => void;
}> = ({ onFavouriteToggle }) => {
  const [error, setError] =
    useState<{ message: string; [key: string]: string }>();
  const [establishments, setEstablishments] = useState<
    { [key: string]: string }[]
  >([]);
  const [pageNum, setPageNum] = useState(1);
  const [pageCount] = useState(100);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getEstablishmentRatings(pageNum).then(
      (result) => {
        setEstablishments(result?.establishments);
        setLoading(false);
      },
      (error) => {
        setError(error);
        setLoading(false);
      }
    );
  }, []);

  async function handlePreviousPage() {
    pageNum > 1 && setPageNum(pageNum - 1);
    getEstablishmentRatings(pageNum).then(
      (result) => {
        setEstablishments(result.establishments);
        setLoading(false);
      },
      (error) => {
        setError(error);
        setLoading(false);
      }
    );
  }

  async function handleNextPage() {
    setLoading(true);
    pageNum < pageCount && setPageNum(pageNum + 1);
    getEstablishmentRatings(pageNum).then(
      (result) => {
        setEstablishments(result.establishments);
        setLoading(false);
      },
      (error) => {
        setError(error);
        setLoading(false);
      }
    );
  }

  if (loading) {
    return <div style={loadingStyle}>Loading...</div>; 
  } else if (error)  {
    return <div>Error: {error.message}</div>;
  } else {
    return (
      <div style={tableStyle}>
        <h2>Food Hygiene Ratings</h2>
        
        <EstablishmentsTable       
          establishments={establishments} 
          onFavouriteToggle={onFavouriteToggle}/>

        <EstablishmentsTableNavigation
          pageNum={pageNum}
          pageCount={pageCount}
          onPreviousPage={handlePreviousPage}
          onNextPage={handleNextPage}
        />
      </div>
    );
  }
};
