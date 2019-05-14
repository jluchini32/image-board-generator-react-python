import React, { Component } from 'react';
import MakeBoard from './MakeBoard/MakeBoard';
import BoardDetail from './BoardDetail/BoardDetail';

class BoardContainer extends Component {
    constructor(){
        super();
        this.state = {
            boards: [],
            selectedImage: {}
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
        this.setState({
            boards: boardsJSON.data,
            images: [...boardsJSON.data]
        })
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
        // console.log(newBoard, 'newBoard')
        const parsedResponse = await newBoard.json();
        if(newBoard.status === 200){
            this.setState({
                boards: [...this.state.boards, parsedResponse]
            })
        }
    };
    // finish refactoring for image click
    createImage = () => {
        const newImage = this.state.boards.map((board) => {
            this.setState({
                [board.images]: [...this.state.board.images, this.state.selectedImage]
            })
        })
    };
    selectedImageStateChange = (newState) => {
        this.setState({
            selectedImage: newState.selectedImage
        })
    };
    render(){
        // console.log(this.state.boards)
        return (
            <div>
            <h1>BoardContainer</h1>
            <BoardDetail boards={ this.state.boards } />
            <MakeBoard createBoard={ this.createBoard } createImage={ this.createImage } selectedImageStateChange={ this.selectedImageStateChange } />
            </div>
        )
    }
}

export default BoardContainer;