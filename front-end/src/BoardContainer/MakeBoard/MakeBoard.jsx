import React, { Component } from 'react';
import Search from './Search';

class MakeBoard extends Component {
    constructor(){
        super();
        this.state = {
            title: "",
            description: "",
            images: [],
            selectedImage: {}
        }
    };
    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    };
    // HERE
    handleSubmit = (e) => {
        this.setState({
            name: null,
            description: null
        })
        this.props.createBoard(this.state);
    };
    imageStateChange = (newState) => {
        this.setState({
            images: newState.images
        })
    };
    // HERE
    handleImageClick = (e, image) => {
        // take an images url and save it to the board
        console.log(e)
        this.setState({
            selectedImage: e
        })
        this.props.selectedImageStateChange(this.state);
        this.props.createBoard(this.state);
    };

    render(){
        console.log(this.state.selectedImage, 'this.state.selectedImage')
        return (
            <div>
                <h1>Create a New Board</h1>
                <form onSubmit={ this.handleSubmit }>
                    <div>
                        *Title: <input onChange={ this.handleChange } type="text" name="title" />
                    </div>
                    <div>
                        Description: <input onChange={ this.handleChange } type="text" name="description" />
                    </div>
                    <div>
                        <input type="submit" />
                    </div>
                    <div>
                        <small>* required</small>
                    </div>
                    <div>
                        <Search imageStateChange={ this.imageStateChange } handleImageClick= { this.handleImageClick } />
                    </div>
                    </form>

            </div>

        )
    }

}

export default MakeBoard;