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
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="col-10">
                        <section id="photos">
                            { imageList1 }
                        </section>
                    </div>
                </div>
            </div>
        )
    }
}

export default ImageList;