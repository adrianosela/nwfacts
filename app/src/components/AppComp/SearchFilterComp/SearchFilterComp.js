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
    onGo = async (param) => {
        console.log('\n\nsiiiii\n', this.props.results.results, typeof [this.props.results.results])
        let obj = []
        let count = 0;
        this.props.results.results.forEach((item) => {
            if (count <= 5) { 
            let temp = {
                "source": item.source,
                "publishedAt":item.publishedAt, 
                "title":item.title.slice(0,10), 
                "url":item.url, 
                "scores": {
                    "sentiment": item.scores.sentiment,
                    "sensationalism": item.scores.sensationalism
                }
            }
            obj.push(temp)
            count++;
        }
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
            // const results = await res.json();
            // this.setState({ redirect: true, results: results});
        } catch (e) {
            console.log("ERROR ", e)
        }
    }

    onGo2 = async (emailProp) => {
        console.log('\n\nsiiiii\n', this.props.results.results, typeof [this.props.results.results])
        let obj = []
        let count = 0
        this.props.results.results.forEach((item) => {
            if (count <= 5) { 
                let temp = {
                    "source": item.source,
                    "publishedAt":item.publishedAt, 
                    "title":item.title.slice(0,10), 
                    "url":item.url, 
                    "scores": {
                        "sentiment": item.scores.sentiment,
                        "sensationalism": item.scores.sensationalism
                    }
                }
                obj.push(temp)
                count++;
            }
        })
        console.log("ITEM", obj)       
        try{
            console.log(emailProp)
            const res = await fetch(`https://febg.api.stdlib.com/http-project1@dev/export-email/?data=${JSON.stringify(obj)}&email=${emailProp}`, {
                method: 'GET',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
              });
            // const results = await res.json();
            // this.setState({ results: results});
        } catch (e) {
            console.log("ERROR ", e)
        }
    }

    loadExportHandler(slackProp, emailProp){
        if(slackProp == 'on'){
            this.onGo(slackProp);
        }
        if(emailProp != null){
            this.onGo(emailProp);
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
                        <ExportButton onfinishSlack={this.onGo} onfinishEmail={this.onGo2}/>
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