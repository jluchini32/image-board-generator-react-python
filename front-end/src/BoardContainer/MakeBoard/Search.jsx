import React, { Component } from 'react';
import Axios from 'axios';
import SearchResults from './SearchResults';

class Search extends Component {
    constructor(){
        super();
        this.state = {
            search: "",
            results: [],
            images: [],
            currentPage: 1
        }
    };
    searchImages = () => {
        Axios({
          method: 'get',
          url: 'https://api.unsplash.com/search/photos',
          params: {
            client_id: '1fe232c10d045efb942c686798a897086057edb740c100d8ee47adf69d77c998', 
            query: this.state.search,
            per_page: 9,
            page: this.state.currentPage,
          }
        })
        .then(reponse => {
            console.log(reponse);
            this.setState({results: reponse.data});
          })
        .then(showResults => {
            this.handleSearchResults();
        })
        .catch(err => {
            console.log(err);
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    handleSearchResults = () => {
        const searchResultsArray = this.state.results.results;
        console.log(searchResultsArray)
        const imageSearchList = searchResultsArray.map((result) => {
            this.setState({
                images: [...this.state.images, result.urls.regular]
            })
        })
    };
    handleSubmit = (e) => {
        e.preventDefault();
        this.searchImages(this.state);
    };

    render(){
        console.log(this.state.results, 'this.state.results');
        console.log(this.state.images, 'this.state.images')
        return (
            <div>
                <h1>Search</h1>
                <form onSubmit={ this.handleSubmit }>
                    <h3>search for images: <input onChange={ this.handleChange } type="text" name="search" placeholder="when in doubt, search for cats"/>
                    <button type="submit">SUBMIT</button></h3>
                </form>
                
                <SearchResults images={ this.state.images } />
            </div>
        )
    };
}

export default Search;