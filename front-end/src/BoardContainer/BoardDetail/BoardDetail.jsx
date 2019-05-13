import React, { Component } from 'react';

class BoardDetail extends Component {
    constructor(){
        super();
        this.state = {

        }
    }
    render(){
        console.log(this.props.boards, 'this.props.boards boardDetail');

        const imageList = this.props.boards.map((image, i) => {
            console.log(image.images, 'from imageList')
            return (
                image.images
            )
        });
        console.log(imageList, 'after imageList');

        const images = imageList.map((image, i) => {
            console.log(image, 'from images')
            return(
                <img src={ image[i] } />
            )
        })
        console.log(images, 'after images')
  
        const boardsList = this.props.boards.map((board) => {
            return (
                <div key={ board._id }>
                    <div>{ board.title }</div>
                    <div>{ board.description }</div>
                    {/* <div>{ board.images } </div> */}
                    <div>{ images }</div>
                </div>
            )
        });   
        return(
            <div>
                <h1>BoardDetail</h1>
                <div>
                    { boardsList }
                </div>
            </div>
        )
    }
}

export default BoardDetail;