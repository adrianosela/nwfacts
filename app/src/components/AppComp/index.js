import React from 'react';
import Fade from 'react-reveal/Fade';

import "./AppComp.css"
import TwitterComp from '../AppComp/TwitterFeedComp/TwitterFeedComp'
import HeaderComp from '../AppComp/HeaderComp/HeaderComp'
import FilterComp from '../AppComp/SearchFilterComp/SearchFilterComp'


const AppComp = () => {
    return(
        <div className="webapp">
            <div className="topContainer"> 
             <div className="twitter">   
                <TwitterComp />
             </div>
             <div className="content">
                <HeaderComp className="header"/>
                <FilterComp />
             </div>
            </div>
        </div>
    );
};


export default AppComp;