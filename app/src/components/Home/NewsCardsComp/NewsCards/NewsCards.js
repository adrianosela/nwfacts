import React from 'react'
import "./NewsCards.css";
import Divider from '@material-ui/core/Divider';

import placeHolderIcon from "../../../../assets/newsIcon.png"
class NewsCards extends React.Component {

    getCategories = (cats) => {
        if (!cats) {return}
        let res = ""
        for(var i=0; i<cats.length; i++) {
            res += cats[i].name + (i != cats.length-1 ?  ", " : "")
        }
        return "Categories: " + res
    }

    render() {
        let source = this.props.source;
        return (
            <div className="NewsCardContainer">
                <div className="ImageContainer">
                    <img src={placeHolderIcon} alt="News source icon" className="NewsCardLogo" />
                </div>
                <div className="NewsCardDetails">
                    <div className="NewsCardTitle">{source.title}</div>
                    <div className="NewsCardCategories">{this.getCategories(source.scores.categories)}</div>
                    <div className="NewsCardSource">Source: {source.source}</div>
                    <Divider orientation="horizontal" />
                    <div className="NewsCardDescription">{source.description}</div>
                    <a href={source.url}>read more...</a>
                </div>
                <div className="NewsCardDividerVertical">
                    <Divider orientation="vertical" />
                </div>
                <div className="NewsCardScore">
                    <div className="MetricsTitle">
                        Bias Measurements
                    </div>
                    <Divider orientation="horizontal" />
                    <div className="MetricsContent">
                        <ul>
                            <li>Sensationalism: {source.scores.sensationalism}</li>
                            <li>Sentiment: {source.scores.sentiment}</li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }

}
export default NewsCards;
