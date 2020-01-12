import React, { Component } from 'react'

import "./SearchFilterComp.css"
import SearchComp from '../../Home/SearchComp/SearchComp'
import SearchedCards from '../SearchFilterComp/SearchedCards/SearchedCards'

class SearchFilterComp extends Component{
    constructor(props) {
        super(props)
    }
    
    render() {
        return(
            <div className="SearchFilterCompContainer">
                <div className="searchBar">
                    <SearchComp />
                </div>
                <div className="searchedCards"><SearchedCards results={this.props.results}/></div>
            </div>
        )
    }
}

export default SearchFilterComp;