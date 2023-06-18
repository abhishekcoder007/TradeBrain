import React, { useState, useEffect,memo } from 'react';
import style from "./Home.module.css";
import Navbar from '../../component/Navbar.js';
import {useDispatch} from "react-redux";

const Home= () => {
  const [data1, setData1] = useState([]);
  const [symbol, setsymbol] = useState('');
  const [symboldata, setSymbolData] = useState([]);
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






  function detailofCompany(id,name1) {
    const symbol1 = symboldata.filter((ele,ide)=>{
      if(id===ide){
        setsymbol(ele.symbol);
      }
    }).join('');
    // setsymbol(symbol);
    console.log('aa ', typeof symbol);


    if (data1 && data1["Global Quote"] && data1["Global Quote"]["05. price"]) {
      const latestPrice = data1["Global Quote"]["05. price"];
  
      const obj = {
        name: name1,
        symbol: symbol,
        price: latestPrice,
      };

      setSearchResults(old=>[...old,obj])
  
     
    }



  }

  const fetchdata2 = async (symbol) => {
    console.log('data', symbol);
    await fetch(
      `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${"K6QFQSUUSDX0RHGF"}`
    )
      .then((res) => res.json())
      .then((data) => setData1(data));
  };

  useEffect(() => {
    console.log('aa gya', symbol);
    if (symbol.length >= 1) {
      fetchdata2(symbol);
    }
  }, [symbol]);


  

  function addToCartme(id,symbol,name1){

    const symbol1 = symboldata.filter((ele,ide)=>{
      if(id===ide){
        setsymbol(ele.symbol);
      }
    }).join('');

    if (data1 && data1["Global Quote"] && data1["Global Quote"]["05. price"]) {
      const latestPrice = data1["Global Quote"]["05. price"];
  
      const obj = {
        name: name1,
        symbol: symbol,
        price: latestPrice,
      };
  
      dispatch({
        type: "newDataadd",
        payload: obj,
      });
    }

  
      

  }








  useEffect(() => {
    if (searchTerm.length >= 2) {
      const fetchSearchResults = async (searchTerm) => {
        try {
          const response = await fetch(
            `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${searchTerm}&apikey=${"K6QFQSUUSDX0RHGF"}`
          );
          const data = await response.json();

          if (data.bestMatches) {
            const results = data.bestMatches.map(async (match) => {
              const symbol = match['1. symbol'];
              const obj={
                name:match['2. name'],
                symbol:match['1. symbol'],
              }
              setSymbolData((old)=>[...old,obj])
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
    setSymbolData((old)=>[])
  };

  return (
    <div>
        <Navbar handleInputChange={handleInputChange} value={searchTerm}/>
        {/* {searchTerm } */}
        {symboldata.length>=1?
        <div className={style.cardNavbarall}>
        <div className={style.cardNavbar}>
        {symboldata?.map((ele, id) => (
        <React.Fragment key={id}>
          <div className={style.cardiitem}>
          <p> {ele.name}  </p>
          <div>
          <button onClick={() => detailofCompany(id,ele.name)}>Detail</button>
          <button  onClick={()=>addToCartme(id,ele.symbol,ele.name)}>ADD</button>
          </div>
          </div>
        </React.Fragment>
      ))}
      </div>
      </div>:""}
      {/* {JSON.stringify(data1) } */}
       {data1["Note"]?
      JSON.stringify(data1) :""}
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



export default memo(Home)




