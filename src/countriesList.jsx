import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CountriesList = () => {
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get('https://xcountries-backend.azurewebsites.net/all');
        setCountries(response.data);
      } catch (err) {
        console.error("Error fetching data: ", err);
        setError(err.message);
      }
    };

    fetchCountries();
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
