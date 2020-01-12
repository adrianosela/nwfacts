import React, { useState } from 'react'
import "./NewsCardsComp.css";

import NewsCard from './NewsCards/NewsCards'
import imgGoogleIcon from '../../../assets/googleIcon.svg'
import TitleComp from '../TitleComp/TitleComp'

function NewsCardsComp() {

    const [ShowComp, setShowComp] = useState(0);
    const imgArray = [imgGoogleIcon];
    const templateNewsItem = { imageUrl: "https://avatars0.githubusercontent.com/u/1342004?s=400&v=4", headline: "Mourners and protesters crowd Tehran's streets after Iran admits to downing jet",
     srcName: "Google",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    url: "http://google.com"}
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