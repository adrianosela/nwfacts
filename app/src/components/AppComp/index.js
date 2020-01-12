import React, { Component } from 'react';
import Fade from 'react-reveal/Fade';
import 'bootstrap/dist/css/bootstrap.min.css';

import "./AppComp.css"
import { Colors } from "../../constants/index"
import TwitterComp from '../AppComp/TwitterFeedComp/TwitterFeedComp'
import HeaderComp from '../AppComp/HeaderComp/HeaderComp'
import FilterComp from '../AppComp/SearchFilterComp/SearchFilterComp'
import DataComp from '../AppComp/DataAnalysisComp/DataAnalysisComp'


class AppComp extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className="appcontainer">
            <div className="webapp">
                <div className="topContainer"> 
                    <div className="twitter">   
                        <TwitterComp query={this.props.location.state.queryValue}/>
                    </div>
                    <div className="content">
                        {/* <HeaderComp /> */}
                        <FilterComp results={this.props.location.state.results}/>
                    </div>
                </div>
                </div>
                <div className="dataDiv">
                    <DataComp results={this.props.location.state.results}/>
                </div>  
            </div>
        );
    }
};


export default AppComp;