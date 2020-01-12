import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../LandingComp/SearchBar/SearchBar'

import "./LandingComp.css";
import { Input, TextField } from '@material-ui/core'

function LandingComp() {

    return (
      <div className="landingCompContainer">
        <div className="titleContainter"> 
          <div className="title">AggroNews</div>
          <div className="titleDescriptor">Your News Aggregator!</div>
        </div>
        <div className="buttonWrapper">
            <Link to='/WEBAPP'><a className="loginButton">Go To Map</a></Link>
            {/* <Link to='/' ><a className="signUpButton">Sign Up</a></Link> */}
          </div> 
        <div className="searchBarComp" >
          <div className="spacerDiv1"></div>
          <div className='searchbar'>
            <form  noValidate autoComplete="off">   
                <TextField id="outlined-basic" label="Search" variant="outlined" />
            </form>
          </div> 
          <div className="spacerDiv1"></div>
        </div>
      </div>
    )
}

export default LandingComp;