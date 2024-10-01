import React, { useState, useEffect } from "react";

const CountriesList = () => {
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data from API
    fetch("https://xcountries-backend.azurewebsites.net/all")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setCountries(data);
      })
      .catch((err) => {
        console.error("Error fetching data: ", err);
        setError(err.message);
      });
  }, []);

  // If there's an error, display the error message
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Display the countries data
  return (
    <div className="country-container">
      {countries.map((country) => (
        <div key={country.name} className="country-card">
          <img
            src={country.flag}
            alt={`Flag of ${country.name}`}
            className="country-flag"
          />
          <p>{country.name}</p>
        </div>
      ))}
    </div>
  );
};

export default CountriesList;
