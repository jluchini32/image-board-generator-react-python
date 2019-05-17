import React, { Component } from 'react';
import ReactDOM from 'react-dom';
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
    };

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
        const parsedResponse = await newBoard.json();
        if(newBoard.status === 200){
            this.setState({
                boards: [parsedResponse.data, ...this.state.boards]
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

    handleImageSubmit = ()=> {
        this.toggle();
        this.state.boards.map((board) => {
            if(board._id === this.state.id){
                this.updateBoard(board, board._id)
            }
        })
    }; 

    // toggleClass = () => {
    //     // console.log(this.state.classChange, 'toggle class');
    //     this.setState({
    //         classChange: true
    //     })
    // };

    handleImageClick = (e, image) => {
        this.setState({
            selectedImage: e
        })
        // this.toggleClass();
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
        })
        this.toggle();
    };

    updateBoard = async (foundBoard, id) => {
        foundBoard.images.push(this.state.selectedImage);
        await fetch(`http://localhost:9000/boards/${id}`, {
            method: "PUT",
            body: JSON.stringify(foundBoard),
            headers: {
                "Content-Type": "application/json"
            }
        })
    };

    deleteBoardButtonClick = (e, id) => {
        this.state.boards.map((board) => {
            if (board._id === e.target.id){
                this.deleteBoard(board._id)
            }
        })
    };

    deleteBoard = async (id) => {
        console.log(id)
        const response = await fetch(`http://localhost:9000/boards/${id}`, {
            method: "DELETE",
        })
        if(response.status === 200){
            this.setState({
                boards: this.state.boards.filter(board => board._id != id)
            })
        }
    }; 

    updateBoardAfterDelete = async (board) => {
        const response = await fetch(`http://localhost:9000/boards/${board._id}`, {
            method: "PUT",
            body: JSON.stringify(board),
            headers: {
                "Content-Type": "application/json"
            }
        })
        if(response.status === 200){
            this.setState({
                boards: [...this.state.boards, board]
            })
        }
    };

    deleteImageButtonClick = async (board, image, i) => {
        if(board.images[i] === image){
            board.images.splice(image, 1)
        };        
        this.updateBoardAfterDelete(board);
    }; 



    render(){
        return (
            <div>
            <MakeBoard createBoard={ this.createBoard } selectedImageStateChange={ this.selectedImageStateChange } 
            handleImageClick={ this.handleImageClick } imageStateChange={ this.imageStateChange } 
            updateBoard={ this.updateBoard } toggle={ this.toggle } modal={ this.state.modal } classChange={ this.state.classChange } 
            handleImageSubmit={ this.handleImageSubmit } results={ this.state.results } />            
            
            <BoardDetail boards={ this.state.boards } addNewImageButtonClick={ this.addNewImageButtonClick } 
            deleteBoardButtonClick={ this.deleteBoardButtonClick } deleteImageButtonClick= { this.deleteImageButtonClick } />
            </div>
        )
    }
}

export default BoardContainer;