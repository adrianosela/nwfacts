import React from 'react';
import Fade from 'react-reveal/Fade';

import './Home.css';
import LandingComp from './LandingComp/LandingComp';
import FeaturesComp from './FeaturesComp/FeaturesComp';
import NewsCardsComp from './NewsCardsComp/NewsCardsComp';

const Home = () => {
    return (        
        <div>
            <Fade delay="250">
                <LandingComp/>
            </Fade>
            <hr></hr>
            <Fade delay="250">
                <FeaturesComp />
            </Fade>
            <hr></hr>    
            <Fade delay="250">
                <NewsCardsComp />
            </Fade>
        </div>
    );
};


export default Home;