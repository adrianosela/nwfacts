import React from 'react';
import Fade from 'react-reveal/Fade';

import "./AppComp.css"
import TwitterComp from '../AppComp/TwitterFeedComp/TwitterFeedComp'
import HeaderComp from '../AppComp/HeaderComp/HeaderComp'
import FilterComp from '../AppComp/SearchFilterComp/SearchFilterComp'


const AppComp = () => {
    return(
        <div className="webapp">
            <div>hiiiiii</div>
        //     {/* <TwitterComp /> */}
        //     {/* <div className="appCL">
        //         <Fade delay="250">
        //             <TwitterComp/>
        //         </Fade>
            
        //         <div className="appHL">
        //             <Fade delay="250">
        //                 <HeaderComp />
        //                 <FilterComp />
        //             </Fade>
        //         </div>
        //     </div> */}
        </div>
    );
};


export default AppComp;