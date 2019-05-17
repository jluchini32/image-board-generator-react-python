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
                <section key={ i } id="photos" className="photo-wrapper">
                    <img onClick={ ( ) => this.props.deleteImageButtonClick(this.props.board, image, i) } alt="" key={ i } id={ image} src={ image } />
                    <div><button onClick={ () => this.props.deleteImageButtonClick(this.props.board, image, i) } id={ image }>Delete Image</button></div>
                </section>
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