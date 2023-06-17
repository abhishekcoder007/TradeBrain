import React, { useState } from 'react';

const SearchBar = ({ updateResults }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const fetchSearchResults = async () => {
    try {
      const response = await fetch(
        `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${encodeURIComponent(
            searchTerm
      )}&apikey=${"K6QFQSUUSDX0RHGF"}`
      );
      const data = await response.json();
    

    const results = data.bestMatches.map(async (match) => {
        const response = await fetch(
          `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${match['1. symbol']}&apikey=${"K6QFQSUUSDX0RHGF"}`
        );
        const quoteData = await response.json();
      
        const globalQuote = quoteData['Global Quote'];
      
        if (globalQuote) {
          const latestPrice = globalQuote['05. price'];
      
          return {
            name: match['2. name'],
            symbol: match['1. symbol'],
            price: latestPrice,
          };
        }
      
        return null;
      }).filter(result => result !== null);
      

      updateResults(results);
    } catch (error) {
      console.log('Error fetching search results:', error);
    }
  };

  return (
    <div>
      <input type="text" onChange={handleInputChange} />
      <button onClick={fetchSearchResults}>Search</button>
    </div>
  );
};

export default SearchBar;
