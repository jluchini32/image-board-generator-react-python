import React, { Component } from 'react';
import Axios from 'axios';
import SearchResults from './SearchResults';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

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
    componentDidMount(){
        this.clearModal()
    }

    clearModal = () => {
        this.setState({
            search: "",
            results: [],
            images: []
        })
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
        .then(response => {
            this.setState({results: response.data});
          })
        .then(showResults => {
            this.handleSearchResults();
        })
        .catch(err => {
            console.log(err);
        })
    };

    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    };

    handleSearchResults = async () => {
        const searchResultsArray = this.state.results.results;
        await searchResultsArray.map((result) => {
            this.setState({
                images: [result.urls.regular, ...this.state.images]
            })
        })
    };

    handleSubmit = (e, id) => {
        e.preventDefault();
        this.searchImages(this.state);
    };

    render(){
        return (
            <div>
                <Modal isOpen={ this.props.modal } toggle={ this.props.toggle }>
                <ModalHeader toggle={ this.props.toggle }>Search for Images</ModalHeader>
                <ModalBody>
                    <form onSubmit={ this.handleSubmit }>
                        <input onChange={ this.handleChange } type="text" name="search" placeholder=""/>
                        <Button color="secondary" className="button" type="submit">Submit</Button>
                    </form>
                <SearchResults images={ this.state.images } handleImageClick = { this.props.handleImageClick } classChange={ this.classChange }  />
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={ this.props.handleImageSubmit }>Add to Board</Button>{' '}
                    <Button outline color="secondary" onClick={ this.props.toggle }>Cancel</Button>
                </ModalFooter>
                </Modal>
            </div>
        )
    };
}

export default Search;