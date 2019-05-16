import React, { Component } from 'react';
import ImageList from './ImageList';

class BoardDetail extends Component {
    constructor(){
        super();
        this.state = {
            id: ""
        }
    }
    render(){
        const boardsList = this.props.boards.map((board, i) => {
            return (
                <div key={ board._id } id={ board._id } className="parent">
                    <div>{ board.title }</div>
                    <div>{ board.description }</div>
                    <ImageList images = { board.images }/>
                    <button onClick={ this.props.addNewImageButtonClick } id={ board._id }>Add New Image</button>
                </div>
            )
        });   
        return(
            <div>
                <h1>BoardDetail</h1>
                <div>
                    { boardsList }
                    <div>
                    </div>
                </div>
            </div>
        )
    }
}

export default BoardDetail;