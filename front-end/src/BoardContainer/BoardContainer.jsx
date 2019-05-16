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
    addNewImageButtonClick = (e) => {
        this.state.boards.map((board) => {
            this.setState({
                id: e.target.id
            })
            this.toggle();
        })
        console.log(this.state.id, 'add image')
    };
    handleDelete = (e) => {
        // this.state.boards.map((board) => {
        //         this.setState({
        //             id: e.target.id
        //         })
        //     if(board._id === this.state.id){
        //         this.deleteBoard(board, board._id)
        //     }
        // });
    };
    deleteBoard = async (board, id) => {
        // try{
        //     console.log(id, 'id')
        //     const boardToDelete = await fetch(`http://localhost:9000/boards/${id}`, {
        //         method: "DELETE"
        //     });
        //     console.log(boardToDelete, 'board to delete')
        //     const parsedResponse = await boardToDelete.json();
        //     console.log(parsedResponse, 'parsed response')
        //     if(parsedResponse.status === 200){
        //         this.setState({
        //             boards: this.state.boards.filter((board) => {
        //                 return board._id !== id
        //             })
        //         })
        //     }
        //     console.log(this.state.boards, 'this.state.boards')
        // }catch(err){
        //     console.log(err)
        // }


    };
    render(){
        console.log(this.state.id)

        return (
            <div>
            <h1>BoardContainer</h1>
            <BoardDetail boards={ this.state.boards } addNewImageButtonClick={ this.addNewImageButtonClick } handleDelete={ this.handleDelete } deleteBoard={ this.deleteBoard } />
            <MakeBoard createBoard={ this.createBoard } selectedImageStateChange={ this.selectedImageStateChange } 
            handleImageClick={ this.handleImageClick } imageStateChange={ this.imageStateChange } 
            updateBoard={ this.updateBoard } toggle={ this.toggle } modal={ this.state.modal } classChange={ this.state.classChange } 
            handleEditSubmit={ this.handleEditSubmit } />
            </div>
        )
    }
}

export default BoardContainer;