    import React from 'react';

import "./FeaturesComp.css"
import IconTree from "../../../assets/Icon_Tree.png"
import IconChart from "../../../assets/Icon_Chart.png"
import IconAnalyze from "../../../assets/Icon_Analyze1.png"
import TitleComp from '../TitleComp/TitleComp'

function FeaturesComp() {

    return (
        <div className="featuresCompWrapper">
            <div className="featuresCompTitle">
                <TitleComp title="Features"></TitleComp>
            </div>
            <div className="featuresCompBody">
                <div className="featuresWrapper">
                    <div className="featuresImg">
                        <img className="iconTree" src={IconTree} alt="icon image of tree" />
                    </div>
                    <div className="featuresTitle">Identify Trees</div>
                    <div className="featuresDescription">Pickout hidden trees in satallite and lidar immagery.</div>
                </div>
                <div className="featuresWrapper">
                    <div className="featuresImg">
                        <img className="iconTree" src={IconChart} alt="icon image of tree" />
                    </div>
                    <div className="featuresTitle">Visualize Data</div>
                    <div className="featuresDescription">Visualize all the tree data you didn't know you needed with charts that put excel to shame.</div>
                </div>
                <div className="featuresWrapper">
                    <div className="featuresImg">
                        <img className="iconTree" src={IconAnalyze} alt="icon image of tree" />
                    </div>
                    <div className="featuresTitle">Analyze Data</div>
                    <div className="featuresDescription">Out ML model will help you analyze the data better than any inter could. </div>
                </div>
            </div>
        </div>        
    )
};

export default FeaturesComp;