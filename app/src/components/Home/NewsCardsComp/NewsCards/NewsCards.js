import React from 'react'
import "./NewsCards.css";
import Divider from '@material-ui/core/Divider';
import ProgressBar from 'react-bootstrap/ProgressBar'
import placeHolderIcon from "../../../../assets/newsIcon.png"
import 'bootstrap/dist/css/bootstrap.min.css';


import Tooltip from '@material-ui/core/Tooltip';
import qMarkIcon from "../../../../assets/qMark.png"
class NewsCards extends React.Component {

    getCategories = (cats) => {
        if (!cats) { return }
        let res = ""
        for (var i = 0; i < cats.length; i++) {
            res += cats[i].name + (i != cats.length - 1 ? ", " : "")
        }
        return "Categories: " + res
    }

    getSentimentGraph = (score) => {
        let magnitude = Math.abs(score*100);
        if (magnitude > 75) {
            return <ProgressBar variant="danger" now={magnitude} />
        }
        else if (magnitude > 50) {
            return <ProgressBar variant="warning" now={magnitude} />
        }
        else if (magnitude > 25) {
            return <ProgressBar variant="info" now={magnitude} />
        } else {
            return <ProgressBar variant="success" now={magnitude} />
        }
    }

    getSensationalismGraph = (score) => {
        if (score > 0.075) {
            return <ProgressBar max={0.1} variant="danger" now={score} />
        }
        else if (score > 0.05) {
            return <ProgressBar max={0.1} variant="warning" now={score} />
        }
        else if (score > 0.025) {
            return <ProgressBar max={0.1} variant="info" now={score} />
        }
        else {
            return <ProgressBar max={0.1} variant="success" now={score} />
        }
    }

    generateSensationalTooltip(source) {
        return <div>
            Sensationalism:
            <Tooltip title="Sensationalism refers to the use of exciting or shocking language at the expense of accuracy to provoke public interest. This measurement is related to the ratio of adverbs to all other parts of speech in a piece of text. Values close to zero are desireable for this metric.">
                <img src={qMarkIcon} className="qMarkTooltip" />
            </Tooltip>
            {Number(source.scores.sensationalism * 10).toFixed(4)}
        </div>
    }

    generateSentimentTooltip(source) {
        return <div>
            Sentiment:
            <Tooltip title="Sentiment has a value between -1.0 and 1.0 where more negative values are associated with negative sentiment (or feelings) and more positive values with a positive sentiment (or feelings). Values close to zero are desireable for this metric.">
                <img src={qMarkIcon} className="qMarkTooltip" />
            </Tooltip>
            {source.scores.sentiment}
        </div>
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
                            <li>{this.generateSensationalTooltip(source)}</li>
                            {this.getSensationalismGraph(source.scores.sensationalism)}
                            <li>{this.generateSentimentTooltip(source)}</li>
                            {this.getSentimentGraph(source.scores.sentiment)}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }

}
export default NewsCards;
