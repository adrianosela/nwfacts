import React, { Component } from 'react'

import "./SearchFilterComp.css"
import SearchComp from '../../Home/SearchComp/SearchComp'
import SearchedCards from '../SearchFilterComp/SearchedCards/SearchedCards'
import ExportButton from '../SearchFilterComp/ExportButton/ExportButton'

import Button from '@material-ui/core/Button';


class SearchFilterComp extends Component{
    constructor(props) {
        super(props)
    }
    onGo = async () => {
        console.log('\n\nsiiiii\n', this.props.results.results, typeof [this.props.results.results])
        let obj = []
        this.props.results.results.forEach((item) => {
            let temp = {
                "source": item.source,
                "publishedAt":item.publishedAt, 
                "title":item.title, 
                "url":item.url, 
                "scores": {
                    "sentiment": item.scores.sentiment,
                    "sensationalism": item.scores.sensationalism
                }
            }
            obj.push(temp)
        })
        console.log("ITEM", obj)

        try{
            const res = await fetch(`https://febg.api.stdlib.com/http-project1@dev/export-slack/?data=${JSON.stringify(obj)}`, {
                method: 'GET',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
              });
            const results = await res.json();
            this.setState({ redirect: true, results: results});
        } catch (e) {
            console.log("ERROR ", e)
        }

    }
    render() {
        return(
            <div className="SearchFilterCompContainer">
                <div className="divider">
                    <div className="searchBar">
                        <SearchComp />
                    </div>
                    <div className='exportButton'>
                        <ExportButton />
                    </div>
                </div>
                {/* <div className='exportButton'>
                    <Button variant="contained" color="primary" onClick={this.onGo}>
                        Export
                    </Button>
                    <ExportButton onClick={this.onGo} />
                </div> */}
                <div className="searchResultsTitle">Search Results</div>
                <div className="searchedCards"><SearchedCards results={this.props.results}/></div>
            </div>
        )
    }
}

export default SearchFilterComp;