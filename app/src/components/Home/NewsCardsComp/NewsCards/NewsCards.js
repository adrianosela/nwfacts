import React from 'react'
import "./NewsCards.css";
import Divider from '@material-ui/core/Divider';
import ProgressBar from 'react-bootstrap/ProgressBar'
import placeHolderIcon from "../../../../assets/newsIcon.png"
import 'bootstrap/dist/css/bootstrap.min.css';


class NewsCards extends React.Component {

    getCategories = (cats) => {
        if (!cats) {return}
        let res = ""
        for(var i=0; i<cats.length; i++) {
            res += cats[i].name + (i != cats.length-1 ?  ", " : "")
        }
        return "Categories: " + res
    }

    getSentimentGraph = (score) => {
        if (score > 0) {
            return <ProgressBar animated variant="warning" now={Math.abs(score*100)} />
        }
        else {
            return <ProgressBar animated variant="danger" now={Math.abs(score*100)} />
        }
    }

    getSensationalismGraph = (score) => {
        if (score < 0.01) {
            return <ProgressBar animated variant="success" now={Math.abs(score*1000)} />
        }
        else if (score < 0.05) {
            return <ProgressBar animated variant="info" now={Math.abs(score*1000)} />
        }
        else if (score < 0.08) {
            return <ProgressBar animated variant="warning" now={Math.abs(score*1000)} />
        }
        else {
            return <ProgressBar animated variant="danger" now={Math.abs(score*1000)} />
        }
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
                        Bias Metrics
                    </div>
                    <Divider orientation="horizontal" />
                    <div className="MetricsContent">
                        <ul>
                            <li>Sensationalism: {source.scores.sensationalism}</li>
                            {this.getSensationalismGraph(source.scores.sensationalism)}
                            <li>Sentiment: {source.scores.sentiment}</li>
                            {this.getSentimentGraph(source.scores.sentiment)}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }

}
export default NewsCards;
