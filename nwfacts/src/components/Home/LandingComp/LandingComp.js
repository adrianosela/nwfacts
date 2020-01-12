import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../LandingComp/SearchBar/SearchBar'
import SearchComp from '../SearchComp/SearchComp'
import "./LandingComp.css";


function LandingComp() {

  return (
    <div className="landingCompContainer">
      <div className="titleContainter">
        <div className="title">AggroNews</div>
        <div className="titleDescriptor">Your News Aggregator!</div>
      </div>
      <div className="searchBarContainer">
        <SearchComp></SearchComp>
      </div>
    </div>
  )
}

export default LandingComp;