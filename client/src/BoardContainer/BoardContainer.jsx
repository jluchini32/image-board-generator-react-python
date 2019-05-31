import React, { Component } from 'react';
import MakeBoard from './MakeBoard/MakeBoard';
import BoardDetail from './BoardDetail/BoardDetail';

class BoardContainer extends Component {
    constructor(){
        super();
        this.state = {
            classChange: false,
            modal: false,
            editModal: false,
            boards: [],
            selectedImage: "",
            id: "",
            editBoardId: "",
            renderBoardDetail: false
        }
        this.toggle = this.toggle.bind(this);
        this.toggleEdit = this.toggleEdit.bind(this);
    }

    componentDidMount(){
        this.getUsersBoards();
    };

    getUsersBoards = async () => {
        const allBoards = await fetch(`${process.env.REACT_APP_BACKEND_ADDRESS}/api/v1/boards`, {
            credentials: 'include'
        })
        const showAllBoards = await allBoards.json();
        this.setState({
            boards: showAllBoards,
        })
    };

    createBoard = async (formData) => {
        const newBoard = await fetch(`${process.env.REACT_APP_BACKEND_ADDRESS}/api/v1/boards`, {
            credentials: 'include',
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const parsedResponse = await newBoard.json();
        // if(newBoard.status === 200){
            this.setState({
                boards: [parsedResponse, ...this.state.boards]
            })
        // }
    };

    selectedImageStateChange = (newState) => {
        this.setState({
            selectedImage: newState.selectedImage
        })
    };

    handleImageSubmit = ()=> {
        this.toggle();
        this.state.boards.map((board) => {
            if(board.id == this.state.id){
                this.updateBoard(board, board.id)
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

    toggleEdit(){
        this.setState(prevState => ({
            editModal: !prevState.editModal
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
        console.log(foundBoard, 'foundboard in update')
        if(foundBoard.images_column === null){
            foundBoard.images_column = [];
            foundBoard.images_column.push(this.state.selectedImage);
        } else if (typeof foundBoard.images_column == "string"){
            foundBoard.images_column = [foundBoard.images_column];
            foundBoard.images_column.push(this.state.selectedImage);
        }
        else{
            foundBoard.images_column.push(this.state.selectedImage);
        }
        
        
        await fetch(`${process.env.REACT_APP_BACKEND_ADDRESS}/api/v1/boards/${id}`, {
            method: "PUT",
            body: JSON.stringify(foundBoard),
            headers: {
                "Content-Type": "application/json"
            }
        })
    };

    deleteBoardButtonClick = (e, id) => {
        console.log(e.target.id)

        this.state.boards.map((board) => {
            console.log(board.id)

            if (board.id == e.target.id){
                console.log(board.id, 'hit')

                this.deleteBoard(board.id)
            }
        })
    };

    deleteBoard = async (id) => {
        console.log(id)
        const response = await fetch(`${process.env.REACT_APP_BACKEND_ADDRESS}/api/v1/boards/${id}`, {
            method: "DELETE",
        })
        if(response.status === 200){
            this.setState({
                boards: this.state.boards.filter(board => board.id !== id)
            })
        }
    }; 

    updateBoardAfterDelete = async (board) => {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_ADDRESS}/api/v1/boards/${board.id}`, {
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

    editBoardButtonClick = (e) => {
        console.log(e.target.id)
        this.setState({
            editBoardId: e.target.id
        })
        this.toggleEdit();
    };
    
    handleEditSubmit = (text) => {
        this.state.boards.map((board) => {
            if (board.id == this.state.editBoardId){
                console.log(board.id, 'hit')

                this.editBoard(text, board)
            }
        })
        this.toggleEdit();
    };

    editBoard = async (text, board) => {
        console.log(text)
        console.log(board)
        const response = await fetch(`${process.env.REACT_APP_BACKEND_ADDRESS}/api/v1/boards/${this.state.editBoardId}`, {
            method: "PUT",
            body: JSON.stringify(text),
            headers: {
                "Content-Type": "application/json"
            }
        })
        if(response.status === 200){
            this.setState({
                boards: [...this.state.boards, text, board]
            })
        }
        this.getUsersBoards();
    }; 

    render(){
        return (
            <div>   
                <MakeBoard createBoard={ this.createBoard } selectedImageStateChange={ this.selectedImageStateChange } 
                handleImageClick={ this.handleImageClick } imageStateChange={ this.imageStateChange } 
                updateBoard={ this.updateBoard } toggle={ this.toggle } modal={ this.state.modal } classChange={ this.state.classChange } 
                handleImageSubmit={ this.handleImageSubmit } />
                <hr />
            
                <BoardDetail boards={ this.state.boards } addNewImageButtonClick={ this.addNewImageButtonClick } 
                deleteBoardButtonClick={ this.deleteBoardButtonClick } deleteImageButtonClick= { this.deleteImageButtonClick }
                toggleEdit={ this.toggleEdit } editModal={ this.state.editModal } editBoardButtonClick={ this.editBoardButtonClick }
                handleEditSubmit={ this.handleEditSubmit } showBoards={ this.props.showBoards }  />
   
                 
            </div>
        )
    }
}

export default BoardContainer;