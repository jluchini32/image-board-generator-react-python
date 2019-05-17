import React, { Component } from 'react';

class SearchResults extends Component {
    render(){
        const searchResultsList = this.props.images.map((image, i) => {
            return(
                <img onClick={ () => this.props.handleImageClick(image) } key= { i } alt="" className={ this.props.classChange } src={ image } />
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

