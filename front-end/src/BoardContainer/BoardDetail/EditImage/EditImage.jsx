import React, { Component } from 'react';

class EditImage extends Component {
    constructor(){
        super();
        this.state = {

        }
    }
    render(){
        return(
            <div>
            <Search imageStateChange={ this.props.imageStateChange } handleImageClick={ this.props.handleImageClick } 
            updateBoard={ this.props.updateBoard } toggle={ this.props.toggle } modal={ this.props.modal } 
            classChange={ this.props.classChange } handleImageSubmit={ this.props.handleImageSubmit } results={ this.state.results } />
            </div>
        )
    }
}

export default EditImage;