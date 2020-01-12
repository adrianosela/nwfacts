import React, { useState } from 'react'
import "./NewsCardsComp.css";
import CircularProgress from '@material-ui/core/CircularProgress';
import NewsCard from './NewsCards/NewsCards'
import imgGoogleIcon from '../../../assets/googleIcon.svg'
import TitleComp from '../TitleComp/TitleComp'

class NewsCardsComp extends React.Component {
    constructor(props) {
        super(props)
        this.state = {ready: false}
        this.init()
    }
    async init() {
        const res = await fetch(`https://api-dot-nwfacts.appspot.com/search?keyword=Canada`, {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
        });
        const results = await res.json();
        this.setState({ ready: true, results: results});
        console.log(results)
    }

    renderNewsCards(results) {
        let ret = [];
        results.forEach(res =>
            ret.push(<NewsCard source={res} />)
        )
        return ret
    }
    render() {
        if(!this.state.ready) {
            return <div className="busySpinner">
                    <CircularProgress />
                </div>
        } else {
            return (
                <div className="newsCardCompContainer">
                    <TitleComp title="Trending"></TitleComp>
                    <div className="newsCompBody">
                        {this.renderNewsCards(this.state.results.results)}
                    </div>
                </div>
            );
        }

    }
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
