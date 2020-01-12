import React, { Component } from 'react';
import Fade from 'react-reveal/Fade';

import "./AppComp.css"
import TwitterComp from '../AppComp/TwitterFeedComp/TwitterFeedComp'
import HeaderComp from '../AppComp/HeaderComp/HeaderComp'
import FilterComp from '../AppComp/SearchFilterComp/SearchFilterComp'


class AppComp extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className="webapp">
                <div className="topContainer"> 
                <div className="twitter">   
                    <TwitterComp query={this.props.location.state.queryValue}/>
                </div>
                <div className="content">
                    <HeaderComp />
                    <FilterComp />
                </div>
                </div>
            </div>
        );
    }
};


export default AppComp;