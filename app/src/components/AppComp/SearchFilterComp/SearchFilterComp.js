import React from 'react'

import "./SearchFilterComp.css"
import SearchComp from '../../Home/SearchComp/SearchComp'
import SearchedCards from '../SearchFilterComp/SearchedCards/SearchedCards'

function SearchFilterComp(){
    return(
        <div className="SearchFilterCompContainer">
            <div className="searchBar">
                <SearchComp />
            </div>
            <div className="searchedCards"><SearchedCards /></div>
        </div>
    )
}

export default SearchFilterComp;