import React, { Component } from 'react';
import MakeBoard from './MakeBoard/MakeBoard';
import Search from './MakeBoard/Search';

class BoardContainer extends Component {
    constructor(){
        super();
        this.state = {
            boards: []
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
        console.log(boardsJSON);
        this.setState({
            boards: [boardsJSON]
        })
    };
    createBoard = async (formData) => {
        console.log('createBoard')
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
        console.log(parsedResponse)
        console.log(this.state.boards)

    };

    render(){
        console.log(this.state.boards, 'this.state.boards')
        const boardsList = this.state.boards.map((board, i) => {
            // console.log(this.state.boards[i].data[i].images, 'this.state.boards.data')

                return (
                    <div key={ board.data[i]._id }>
                        <li>{ board.data[i].title }</li>
                        <li>{ board.data[i].description }</li>
                        <img src={ this.state.boards[i].data[i].images[i] } />
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
            <MakeBoard createBoard={ this.createBoard } />
            <Search />
            </div>
        )
    }

}

export default BoardContainer;