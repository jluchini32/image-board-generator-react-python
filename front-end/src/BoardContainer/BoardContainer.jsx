import React, { Component } from 'react';
import MakeBoard from './MakeBoard/MakeBoard';
import Search from './MakeBoard/Search';

class BoardContainer extends Component {
    constructor(){
        super();
        this.state = {
            boards: []
        }
    }
    componentDidMount(){
        this.getBoards();
    }
    getBoards = async () => {
        const boards = await fetch('http://localhost:9000/boards', {
            credentials: 'include'
        })
        const boardsJSON = await boards.json();
        console.log(boardsJSON)
    };
    createBoard = async (formData) => {
        const newBoard = await fetch('http://localhost:9000/boards', {
            credentials: 'include',
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const parsedResponse = await newBoard.json();
        if(newBoard.status === 200){
            this.setState({
                boards: [...this.state.boards, parsedResponse]
            })
        }

    };

    render(){
        return (
            <div>
            <h1>BoardContainer</h1>
            <MakeBoard createBoard={ this.createBoard } />
            <Search />
            </div>
        )
    }

}

export default BoardContainer;