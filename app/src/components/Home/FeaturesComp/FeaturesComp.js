    import React from 'react';

import "./FeaturesComp.css"
import IconRecent from "../../../assets/news2Icon.png"
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
                        <img className="iconTree" src={IconRecent} alt="icon image of tree" />
                    </div>
                    <div className="featuresTitle">Stay in The Loop</div>
                    <div className="featuresDescription">Stay up to date with trending news on topics that interest you.</div>
                </div>
                <div className="featuresWrapper">
                    <div className="featuresImg">
                        <img className="iconTree" src={IconChart} alt="icon image of tree" />
                    </div>
                    <div className="featuresTitle">Gain Insight on Bias</div>
                    <div className="featuresDescription">Get insight on sentiment conveyed in articles and how biased it might be.</div>
                </div>
                <div className="featuresWrapper">
                    <div className="featuresImg">
                        <img className="iconTree" src={IconAnalyze} alt="icon image of tree" />
                    </div>
                    <div className="featuresTitle">Export Data</div>
                    <div className="featuresDescription">Export results to Slack or Email for later reference and easier sharing</div>
                </div>
            </div>
        </div>        
    )
};

export default FeaturesComp;