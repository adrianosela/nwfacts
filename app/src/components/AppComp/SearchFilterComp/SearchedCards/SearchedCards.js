import React, { useState } from 'react'
import "./SearchedCards.css";
// import CircularProgress from '@material-ui/core/CircularProgress';
import NewsCard from '../../../Home/NewsCardsComp/NewsCards/NewsCards'
import imgGoogleIcon from '../../../../assets/googleIcon.svg'
import TitleComp from '../../../Home/TitleComp/TitleComp'

import ScrollArea from '@xico2k/react-scroll-area';


class SearchedCards extends React.Component {
    constructor(props) {
        super(props)
        this.state = {ready: true}
       // this.init()
    }
    // async init() {
    //     const res = await fetch(`/search?keyword=Canada`, {
    //         method: 'GET',
    //         headers: {
    //           'Accept': 'application/json',
    //           'Content-Type': 'application/json'
    //         }
    //     });
    //     const results = await res.json();
    //     this.setState({ ready: true, results: results});
    //     console.log(results)
    // }

    renderNewsCards(results) {
        console.log('ress', typeof results)
        console.log(results)
        let ret = [];
        results.forEach((res, i) => {
            console.log('res', res)
            ret.push(<NewsCard 
                key={i}
                source={res} />)
        })
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
                        <ScrollArea>
                            {this.renderNewsCards(this.props.results.results)}
                        </ScrollArea>
                    </div>
                </div>
            );
        }
        
    }
}


export default SearchedCards;
