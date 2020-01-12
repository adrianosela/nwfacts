import React, { useState } from 'react'
import "./NewsCardsComp.css";

import NewsCard from './NewsCards/NewsCards'
import imgGoogleIcon from '../../../assets/googleIcon.svg'
import TitleComp from '../TitleComp/TitleComp'

function NewsCardsComp() {

    const [ShowComp, setShowComp] = useState(0);
    const imgArray = [imgGoogleIcon];
    const templateNewsItem = {
        source: "New York Magazine",
        title: "Donald Trump Is the War Crimes President",
        description: "His embrace of rogue Navy SEAL Eddie Gallagher is part of a deeper, and very alarming, pattern.",
        url: "http://nymag.com/intelligencer/2020/01/andrew-sullivan-donald-trump-is-the-war-crimes-president.html",
        publishedAt: "2020-01-10T17:07:29Z",
        author: "Andrew Sullivan",
        scores: {
            categories: [
                {
                    name: "/Law \u0026 Government",
                    confidence: 0.77
                },
                {
                    name: "/Sensitive Subjects",
                    confidence: 0.7
                }
            ],
            sensationalism: 0.056985293,
            sentiment: -0.1
        }
    }
    return (
        <div className="newsCardCompContainer">
            <TitleComp title="Trending"></TitleComp>
            <div className="newsCompBody">
                <NewsCard source={templateNewsItem} />
                <NewsCard source={templateNewsItem} />
                <NewsCard source={templateNewsItem} />
                <NewsCard source={templateNewsItem} />
            </div>
        </div>
    );
}

export default NewsCardsComp;


// {/* <div className="newsButtonContainer">
//                     <button className="projButton" active onClick={(ShowComp) => setShowComp(0)}>Global News</button>
//                     <button className="projButton" active onClick={(ShowComp) => setShowComp(0)}>Financial News</button>
//                     <button className="projButton" active onClick={(ShowComp) => setShowComp(0)}>Sports News</button>
//                     <button className="projButton" active onClick={(ShowComp) => setShowComp(0)}>Game News</button>
//                     <button className="projButton" active onClick={(ShowComp) => setShowComp(0)}>Classifieds</button>
//                 </div> */}
//             {/* <div className="newsDescriptionAndImageContainer">
//                     <div className="newsImageContainer">
//                         <img alt={imgArray[setShowComp]} className="imgStyle" src={imgArray[ShowComp]}></img>
//                     </div>
//                     {/* <div className="newsDescriptions">{CardArray[0]}</div> */}
//             {/* </div>  */}