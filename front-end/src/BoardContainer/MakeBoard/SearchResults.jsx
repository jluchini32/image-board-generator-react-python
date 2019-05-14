import React, { Component } from 'react';

class SearchResults extends Component {
    constructor(){
        super();
    }
    render(){
        console.log(this.props, 'this.props SearchResults')
        const searchResultsList = this.props.images.map((image) => {
            return(
                <img src={ image } />
            )
        })
        return(
            <div>
            <h1>Search Results</h1>
            { searchResultsList }
            </div>
        )
    }
}

export default SearchResults;

