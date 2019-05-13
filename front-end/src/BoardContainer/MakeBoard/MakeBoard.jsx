import React, { Component } from 'react';

class MakeBoard extends Component {
    constructor(){
        super();
        this.state = {
            title: "",
            description: "",
            images: ["https://images.unsplash.com/photo-1557517397-0a59115272ab?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80", 
            "https://images.unsplash.com/photo-1557515294-ce41dbb4f259?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=975&q=80", 
            "https://images.unsplash.com/photo-1557411197-336ed936e9fa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1088&q=80"],
            imageSearchTerm: ""
        }
    };
    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    };
    handleSubmit = (e) => {
        // e.preventDefault;
        // e.target.reset();
        this.setState({
            name: null,
            description: null
        })
        this.props.createBoard(this.state);
    };
    handleSearchSubmit = (e) => {
        this.setState({
            images: [...this.state.images, this.state.imageSearchTerm]
        })
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
                    <div>
                        <small>* required</small>
                    </div>
                </form>
                <form onSubmit={ this.handleSearchSubmit }>
                    <div>
                        Search for images: <input onChange={ this.handleChange } type="text" name="imageSearchTerm" />
                    </div>
                    <div>
                        <input type="submit" />
                    </div>

                </form>
            </div>

        )
    }

}

export default MakeBoard;