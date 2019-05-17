import React, { Component } from 'react';

class ImageList extends Component {
    constructor(){
        super();
        this.state = {

        }
    }
    render(){
        let imageList1=[];
        if(this.props.images){
            imageList1 = this.props.images.map((image, i) => {
                return(
                        <img onClick={ ( ) => this.props.deleteImageButtonClick(this.props.board, image, i) } alt="" key={ i } id={ image} src={ image } />
                )
            })
        }
        return(
            <div>
                { imageList1 }
            </div>
        )
    }
}

export default ImageList;