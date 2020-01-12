import React from 'react'
import "./NewsCards.css";
import Divider from '@material-ui/core/Divider';

import placeHolderIcon from "../../../../assets/newsIcon.png"
class NewsCards extends React.Component {
    render() {
        let source = this.props.source;
        console.log(source.imageUrl)
        return (
            <div className="NewsCardContainer">
                <div className="ImageContainer">
                    <img src={source.imageUrl ? source.imageUrl : placeHolderIcon} alt="News source icon" className="NewsCardLogo" />
                </div>
                <div className="NewsCardDetails">
                    <div className="NewsCardTitle">{source.title}</div>
                    <div className="NewsCardSource">Source: {source.source}</div>
                    <Divider orientation="horizontal" />
                    <div className="NewsCardDescription">{source.description}</div>
                    <a href={source.url}>Full article here</a>
                </div>
                <div className="NewsCardDividerVertical">
                    <Divider orientation="vertical" />
                </div>
                <div className="NewsCardScore">
                    <div className="MetricsTitle">
                        Bias Metrics
                    </div>
                    <Divider orientation="horizontal" />
                    <div className="MetricsContent">
                        <ul>
                            <li>Sentiment: Happy</li>
                            <li>Adverb use: Heavy</li>
                            <li>Overall Bias Score: 10/10</li>
                        </ul>
                        <div className="NewsCardNote">
                            Note: Overall Bias score is based on several metrics including the ones displayed above. Values range from 0-10, 10 being heavily biased 0 being neutral.
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}
export default NewsCards;