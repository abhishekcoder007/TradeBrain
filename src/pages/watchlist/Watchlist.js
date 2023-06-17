import React from 'react';
import style from "./Watchlist.module.css"
import { useDispatch,useSelector } from 'react-redux';
import Nav from '../../component/Nav';

const Watchlist = () => {
  const dispatch=useDispatch();

  const selector=useSelector(state=>state.reducer)
  const data=useSelector(state=>state.cartData)

  function deleteFromCart(id){
       dispatch({
        type:"delete",
        payload:id,
       })
  }
  return (
    <div>
      <Nav/>
      {/* <p>WATCH</p> */}
      <div className={style.mainBody}>
      <div className={style.mainCard}>
      {data?.map((result,id)=>(
        <div key={id}>
          <div className={style.card}>
          <div className={style.containerImg}>
            <p>{result.name}</p>
          </div>
        <div className={style.container}>
           <p>{result.name}</p>
           <p>{result.symbol}</p>
           <p>{result.price}</p>
          <button  onClick={()=>deleteFromCart(result.symbol)}>Delete</button>
          </div>
        </div>
          
        </div>
      ))}
      </div>
      </div>
     
      {/* {selector}
    {JSON.stringify(data)}
      <button  onClick={()=>dispatch({type:"inc"})}>add</button> */}
    </div>
  )
}

export default Watchlist
