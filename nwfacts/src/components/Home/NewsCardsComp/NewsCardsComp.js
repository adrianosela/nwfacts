import React, {useState} from 'react'
import "./NewsCardsComp.css";

import NewsCard from './NewsCards/NewsCards'
import imgGoogleIcon from '../../../assets/googleIcon.svg'


function NewsCardsComp() {

    const [ShowComp, setShowComp] = useState(0);
    const imgArray = [imgGoogleIcon];

    return(
        <div className="newsCardCompContainer"> 
            <div className="newsCompTitle">Hot News</div>
            <div className="newsCompBody">
                <NewsCard />
                <NewsCard />
                <NewsCard />
                <NewsCard />
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