import React, { Component } from 'react';
import MakeBoard from './MakeBoard/MakeBoard';
import BoardDetail from './BoardDetail/BoardDetail';

class BoardContainer extends Component {
    constructor(){
        super();
        this.state = {
            classChange: false,
            modal: false,
            boards: [],
            selectedImage: {},
            id: "",
        }
        this.toggle = this.toggle.bind(this);
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
    handleEditSubmit = ()=> {
        this.toggle();
        this.state.boards.map((board) => {
            if(board._id === this.state.id){
                this.updateBoard(board, board._id)
            }
        })
        this.setState({
            selectedImage: {},
        })
    };
    updateBoard = async (foundBoard, id) => {
        foundBoard.images.push(this.state.selectedImage);
        const response = await fetch(`http://localhost:9000/boards/${id}`, {
            method: "PUT",
            mode: 'cors',
            body: JSON.stringify(foundBoard),
            headers: {
                "Content-Type": "application/json"
            }
        })
        console.log(response)
    }; 
    toggleClass = () => {
        // console.log(this.state.classChange, 'toggle class');
        this.setState({
            classChange: true
        })
    };
    handleImageClick = (e, image) => {
        this.setState({
            selectedImage: e
        })
        this.toggleClass();
    };
    toggle(){
        this.setState(prevState => ({
            modal: !prevState.modal
        }));

    };
    addNewImageButtonClick = (e, id) => {
        this.state.boards.map((board) => {
            this.setState({
                id: e.target.id
            })
            this.toggle();
        })
    };
    render(){
        return (
            <div>
            <h1>BoardContainer</h1>
            <BoardDetail boards={ this.state.boards } addNewImageButtonClick={ this.addNewImageButtonClick } />
            <MakeBoard createBoard={ this.createBoard } selectedImageStateChange={ this.selectedImageStateChange } 
            handleImageClick={ this.handleImageClick } imageStateChange={ this.imageStateChange } 
            updateBoard={ this.updateBoard } toggle={ this.toggle } modal={ this.state.modal } classChange={ this.state.classChange } 
            handleEditSubmit={ this.handleEditSubmit } />
            </div>
        )
    }
}

export default BoardContainer;