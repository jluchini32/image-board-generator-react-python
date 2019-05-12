import React, { Component } from 'react';

class MakeBoard extends Component {
    constructor(){
        super();
        this.state = {
            title: "",
            description: "",
            images: []
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
            </div>

        )
    }

}

export default MakeBoard;