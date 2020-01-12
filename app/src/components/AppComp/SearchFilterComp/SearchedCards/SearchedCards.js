import React, { useState } from 'react'
import "./SearchedCards.css";
// import CircularProgress from '@material-ui/core/CircularProgress';
import NewsCard from '../../../Home/NewsCardsComp/NewsCards/NewsCards'
import imgGoogleIcon from '../../../../assets/googleIcon.svg'
import TitleComp from '../../../Home/TitleComp/TitleComp'

class SearchedCards extends React.Component {
    constructor(props) {
        super(props)
        this.state = {ready: false}
        this.init()
    }
    async init() {
        const res = await fetch(`/search?keyword=Canada`, {
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
                </div>
        } else {
            return (
                <div className="newsCardCompContainer">
                    <div className="newsCompBody">
                        {this.renderNewsCards(this.state.results.results)}
                    </div>
                </div>
            );
        }
        
    }
}


export default SearchedCards;
