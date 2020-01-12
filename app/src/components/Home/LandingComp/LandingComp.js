import React from 'react';

import SearchBar from '../LandingComp/SearchBar/SearchBar'
import SearchComp from '../SearchComp/SearchComp'
import GithubBadge from '@sinchang/react-github-badge'
import "./LandingComp.css";
import Icon from "../../../assets/chevron.png"
import NewsIcon from "../../../assets/newsIcon.png"

function LandingComp() {

  return (
    <div className="landingCompContainer">
      <div className="titleContainter">
        <div className="title">nwFacts <img src={NewsIcon} className="newsIcon"/></div>
        <div className="titleDescriptor">The ultimate anti-bias tool for browsing the news!</div>
        <GithubBadge
          slug='adrianosela/nwfacts'
        />
      </div>
      <div className="searchBarContainer">
        <SearchComp></SearchComp>
      </div>
      <div className="chevronContainer">
        <img src={Icon} className="chevronIcon"/>
      </div>

    </div>
  )
}

export default LandingComp;
