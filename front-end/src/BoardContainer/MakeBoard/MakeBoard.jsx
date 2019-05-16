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
    handleSubmit = (e) => {
        this.setState({
            name: null,
            description: null
        })
        this.props.createBoard(this.state);
    };

    render(){
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
                    </form>

                    <div>
                        <small>* required</small>
                    </div>
                    <div>
                        <Search imageStateChange={ this.props.imageStateChange } handleImageClick={ this.props.handleImageClick } 
                        updateBoard={ this.props.updateBoard } toggle={ this.props.toggle } modal={ this.props.modal } 
                        classChange={ this.props.classChange } handleEditSubmit={ this.props.handleEditSubmit } results={ this.state.results } />
                    </div>

            </div>

        )
    }

}

export default MakeBoard;