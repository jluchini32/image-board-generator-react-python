import React, { Component } from 'react';

class ImageList extends Component {
    constructor(){
        super();
        this.state = {

        }
    }
    render(){
        const imageList1 = this.props.images.map((image, i) => {
            return(
                <div key={ i } className="images">
                    <div><img alt="" key={ i } src={ image } /></div>
                    <div><button onClick={ ( ) => this.props.deleteImageButtonClick(this.props.board, image, i) } id={ image }>Delete Image</button></div>
                </div>
            )
        })
        return(
            <div>
                { imageList1 }
            </div>
        )
    }
}

export default ImageList;