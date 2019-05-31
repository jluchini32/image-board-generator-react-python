import React, { Component } from 'react';

class ImageList extends Component {
    constructor(){
        super();
        this.state = {

        }
    }
    render(){
        console.log(this.props.images, 'images in image list')
        // this.props.images = [this.props.images];
        let imageList1=[];
        imageList1.push(this.props.images)
        console.log(imageList1)
        // if(this.props.images){
            const imagesToShow = imageList1.map((image, i) => {
                return(
                        <img onClick={ ( ) => this.props.deleteImageButtonClick(this.props.board, image) } alt="" key={ i } id={ image } src={ image } />
                )
            })
        // }
        return(
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="col-10">
                        <section id="photos">
                            { imagesToShow }
                        </section>
                    </div>
                </div>
            </div>
        )
    }
}

export default ImageList;