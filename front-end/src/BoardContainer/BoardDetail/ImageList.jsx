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
                <img alt="" key={ image } src={ image } />
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