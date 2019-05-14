import React, { Component } from 'react';

class SearchResults extends Component {
    render(){
        const searchResultsList = this.props.images.map((image, i) => {
            return(
                <img onClick={ this.props.handleImageClick } key= { i } alt="" src={ image } />
            )
        })
        return(
            <div>
            { searchResultsList }
            </div>
        )
    }
}

export default SearchResults;

