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
                <div key={ i }>
                    <div><img alt="" key={ i } src={ image } /></div>
                    <div><button onClick={ this.props.deleteImageButtonClick } id={ image }>Delete Image</button></div>
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