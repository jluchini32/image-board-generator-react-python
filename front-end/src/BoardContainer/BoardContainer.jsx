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
    selectedImageStateChange = (newState) => {
        this.setState({
            selectedImage: newState.selectedImage
        })
    };
    imageStateChange = (newState) => {
        this.setState({
            images: newState.images
        })
    };
    updateBoard = async (id, board) => {
        board = await fetch(`http://localhost:9000/boards${id}`, {
            method: "PUT",
            body: JSON.stringify(board),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const updatedBoard = await board.json();
        console.log(updatedBoard, 'updatedBoard')
        this.setState({
            boards: [...this.state.boards, updatedBoard.data],
        })
    }; 
    handleImageClick = (e, image) => {
        // take an images url and save it to the board
        this.setState({
            selectedImage: e
        })
        // this.selectedImageStateChange(this.state);
        this.imageStateChange(this.state);
        this.updateBoard(this.state);
    };
    addNewImageButtonClick = (e, id) => {
        this.state.boards.map((board) => {
            console.log(board._id, "add new image button clicked")
        })
    }

    render(){
        console.log(this.state.boards)
        console.log(this.state.selectedImage)
        return (
            <div>
            <h1>BoardContainer</h1>
            <BoardDetail boards={ this.state.boards } addNewImageButtonClick={ this.addNewImageButtonClick } />
            <MakeBoard createBoard={ this.createBoard } selectedImageStateChange={ this.selectedImageStateChange } handleImageClick={ this.handleImageClick } imageStateChange={ this.imageStateChange } />
            </div>
        )
    }
}

export default BoardContainer;