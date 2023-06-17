import React, {useState}from 'react';
import style from "./Navbar.module.css";
import DehazeIcon from '@mui/icons-material/Dehaze';
import {NavLink}from "react-router-dom";


function Navbar(props) {
    const [isVisible, setisVisible] = useState(false);

    function handleChangeNav(){
       
        setisVisible(!isVisible)
    }

  return (
    <div>
<div className={style.mainNav}>
   <div className={style.mainNavhead}>
<span><NavLink className={style.navLinkStyle} to="/">TradeBrains</NavLink></span>
   </div>
   <div className={style.mainNavmiddle}>
   <input defaultValue="My WatchList" className={`${style.navInput} ${style.centered}`} />

</div>
<div className={style.mainNavend}>
<NavLink className={style.navLinkStyle} to="/">Home</NavLink>
<NavLink className={style.navLinkStyle} to="/Watchlist">Watchlist</NavLink>

</div>
<p className={style.mobileNav} onClick={handleChangeNav}>< DehazeIcon fontSize="large" color="sucess"/></p>
</div>
{isVisible ?
<div className={style.mobileView}>
    <div>
    <p><NavLink className={style.navLinkStyle} to="/">Home</NavLink></p>
<p><NavLink className={style.navLinkStyle} to="/Watchlist">Watchlist</NavLink></p>
    </div>


</div>:""}
      
    </div>
  )
}

export default Navbar;
