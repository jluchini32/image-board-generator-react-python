import React, { Component } from 'react';
import MakeBoard from './MakeBoard/MakeBoard';
import Search from './MakeBoard/Search';

class BoardContainer extends Component {
    constructor(){
        super();
        this.state = {
            boards: [],
            images: []
        }
    }
    componentDidMount(){
        this.getBoards();
    }
    getBoards = async () => {
        const boards = await fetch('http://localhost:9000/boards', {
            credentials: 'include'
        })
        const boardsJSON = await boards.json();
        this.setState({
            boards: [boardsJSON]
        })
    };
    createBoard = async (formData) => {
        const newBoard = await fetch('http://localhost:9000/boards', {
            credentials: 'include',
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const parsedResponse = await newBoard.json();
        if(newBoard.status === 200){
            this.setState({
                boards: [...this.state.boards, parsedResponse]
            })
        }
    };
    createImage = async (query) => {
        const newImage = await fetch(`https://api.unsplash.com/search/photos/?page=1&per_page=10&query=${query}&client_id=1fe232c10d045efb942c686798a897086057edb740c100d8ee47adf69d77c998`, {
            credentials: 'include',
            method: "POST",
            body: JSON.stringify(query),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const parsedResponse = await newImage.json();
        if(newImage.status === 200){
            this.setState({
                images: [...this.state.boards.image, parsedResponse]
            })
        }
        console.log(this.state.boards, 'this.state.boards')
        console.log(this.state.boards.images, 'this.state.boards.images')

    };

    render(){
        console.log(this.state.boards, 'this.state.boards')
        const boardsList = this.state.boards.map((board, i) => {
            // console.log(this.state.boards[i].data[i].images, 'this.state.boards.data')

                return (
                    <div key={ board.data[i]._id }>
                        <li>{ board.data[i].title }</li>
                        <li>{ board.data[i].description }</li>
                        <img alt={i} src={ this.state.boards[i].data[i].images[i] } />
                    </div>
                )   
        })
// figure out how to get images to show up

        // const imageList = this.state.boards.data.map((image) => {
        //         return (
        //             <img src={ image.data.images } />
        //         )
        // })
        console.log(boardsList, 'boardsList')

        return (
            <div>
            <h1>BoardContainer</h1>
            <ul>
                { boardsList }
            </ul>
            {/* { imageList} */}
            <MakeBoard createBoard={ this.createBoard } createImage={ this.createImage } />
            <Search />
            </div>
        )
    }

}

export default BoardContainer;