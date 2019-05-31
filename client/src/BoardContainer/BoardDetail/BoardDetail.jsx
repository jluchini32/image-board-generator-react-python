import React, { Component } from 'react';
import ImageList from './ImageList';
import EditBoard from './EditBoard/EditBoard';
import { Button } from 'reactstrap';

class BoardDetail extends Component {
    constructor(){
        super();
        this.state = {
            id: "",
        }
    };

    render(){
        console.log(this.props.boards, 'boards in board detail')
        const usersBoardsToShow = this.props.boards;
        const boardsToShow = usersBoardsToShow.map((board, i) => {
            return (
                <div key={ i } id={ board.id } className="parent">
                    <div><h2>{ board.title }</h2></div>
                    <div>{ board.description }</div>
                    <Button className="button" onClick={ this.props.addNewImageButtonClick } id={ board.id }>Add New Image</Button>
                    <Button className="button" id={ board.id } onClick={ this.props.editBoardButtonClick }>Edit Board</Button>
                    <Button className="button" id={ board.id } onClick={ this.props.deleteBoardButtonClick }>Delete Board</Button>
                    <ImageList images = { board.images_column } deleteImageButtonClick= { this.props.deleteImageButtonClick } board = {board} />
                </div>
            )
        });  

        return(
            <div>
                <div>
                    <EditBoard toggleEdit={ this.props.toggleEdit } editModal={ this.props.editModal } handleEditSubmit={ this.props.handleEditSubmit } />
                </div>
                <div>
                    { boardsToShow }
                </div>
            </div>
        )
    }
}

export default BoardDetail;