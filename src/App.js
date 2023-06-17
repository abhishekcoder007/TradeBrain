// import React, { useState, useEffect } from 'react';

// const SearchBar = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [searchResults, setSearchResults] = useState([]);

//   useEffect(() => {
//     if (searchTerm.length >= 3) {
//       const fetchSearchResults = async (searchTerm) => {
//         try {
//           const response =  await fetch(
//             `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${searchTerm}&apikey=${"K6QFQSUUSDX0RHGF"}`
//           );
//           const data = await response.json();

//           if (data.bestMatches) {
//             const results = data.bestMatches.map(async (match) => {
//               const symbol = match['1. symbol'];
//               const quoteResponse = await fetch(
//                 `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${"K6QFQSUUSDX0RHGF"}`
//               );
//               const quoteData = await quoteResponse.json();
            
//               console.log('quoteData:', quoteData);
            
//               const globalQuote = quoteData['Global Quote'];
            
//               if (globalQuote && globalQuote['05. price']) {
//                 const latestPrice = globalQuote['05. price'];
            
//                 return {
//                   name: match['2. name'],
//                   symbol,
//                   price: latestPrice,
//                 };
//               }
            
//               return null;
//             }).filter(result => result !== null);
            
//             Promise.all(results).then((completeResults) => {
//               console.log('completeResults:', completeResults);
//               setSearchResults(completeResults);
//             });
            
//           }
//         } catch (error) {
//           console.log('Error fetching search results:', error);
//         }
//       };

//       fetchSearchResults(searchTerm);
//     } else {
//       setSearchResults([]);
//     }
//   }, [searchTerm]);

//   const handleInputChange = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   return (
//     <div>
//       {searchTerm}
//       <input type="text" onChange={handleInputChange} />
//       <ul>
//         {searchResults.map((result) => (
          
//           <>
//         {result!=null ?
//           <li>
            
//             {result.name} 
//             - {result.price}
//           </li>:""}
//           </>
        
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default SearchBar;


import React, { useState, useEffect } from 'react';
import "./App.css";

const App= () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (searchTerm.length >= 3) {
      const fetchSearchResults = async (searchTerm) => {
        try {
          const response = await fetch(
            `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${searchTerm}&apikey=${"K6QFQSUUSDX0RHGF"}`
          );
          const data = await response.json();

          if (data.bestMatches) {
            const results = data.bestMatches.map(async (match) => {
              const symbol = match['1. symbol'];
              const quoteResponse = await fetch(
                `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${"K6QFQSUUSDX0RHGF"}`
              );
              const quoteData = await quoteResponse.json();

              console.log('quoteData:', quoteData);

              const globalQuote = quoteData['Global Quote'];

              if (globalQuote && globalQuote['05. price']) {
                const latestPrice = globalQuote['05. price'];

                return {
                  name: match['2. name'],
                  symbol,
                  price: latestPrice,
                };
              }

              return null;
            }).filter(result => result !== null);

            Promise.all(results).then((completeResults) => {
              console.log('completeResults:', completeResults);
              setSearchResults(completeResults);
            });

          }
        } catch (error) {
          console.log('Error fetching search results:', error);
        }
      };

      fetchSearchResults(searchTerm);
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      {searchTerm}
      <input type="text" onChange={handleInputChange} />
      <ul>

      {searchResults.map((result) => (
  result !== null && (
    <React.Fragment key={result.symbol}>
      <li>
        <div className="card">

        <div class="container">
           <p>{result.name}</p>
           <p>{result.price}</p>
          </div>
        </div>
       
      </li>
    </React.Fragment>
  )
))}
        
      </ul>
    </div>
  );
};

export default App;

