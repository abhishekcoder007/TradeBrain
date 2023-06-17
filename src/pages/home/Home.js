import React, { useState, useEffect } from 'react';
import style from "./Home.module.css";
import Navbar from '../../component/Navbar.js';
import {useDispatch} from "react-redux";

const Home= () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
    const dispatch=useDispatch();
  function addToCart(symbol){
    const addData=searchResults.filter(ele=>{
      if(ele!==null){
    return  ele.symbol===symbol
      }
    })
    dispatch({
      type:"addData",
      payload:addData,
    })
    

  }

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
                  symbol:symbol,
                  price: latestPrice,
                };
              }

              return null;
            }).filter(result => result != null);

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
    setSearchTerm(event.target.value.toUpperCase());
  };

  return (
    <div>
        <Navbar handleInputChange={handleInputChange}/>
        {searchTerm }
      {/*   */}
      <div className={style.mainBody}>
      <div className={style.mainCard}>

      {searchResults.map((result) => (
  result !== null && (
    <React.Fragment key={result.symbol}>
      <div>
        <div className={style.card}>
          <div className={style.containerImg}>
            <p>{result.name}</p>
          </div>
        <div className={style.container}>
           <p>{result.name}</p>
           <p>{result.symbol}</p>
           <p>{result.price}</p>
          <button  onClick={()=>addToCart(result.symbol)}>ADD</button>
          </div>
        </div>
       
      </div>
    </React.Fragment>
  )
))}
        
      </div>
      </div>
    </div>
  );
};



export default Home




