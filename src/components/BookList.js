'use strict'

import React from 'react';
import PropTypes from 'prop-types';
import BookActions from '../actions/bookActions';
import Table from 'react-bootstrap/Table';

import BookOpModal from './Modal';

export class BookList extends React.Component{

    createBookRow(book){
        return (
            <tr key={book.bookId}>  
                <td style={{width: '255px'}}>
                <BookOpModal type={"update"} book={book}/>
                <BookOpModal type={"delete"} book={book}/>
                </td>              
                <td style={{textAlign: 'center'}}> {book.bookId} </td>
                <td> {book.title} </td>
                <td style={{textAlign: 'center'}}> {book.author} </td>
                <td style={{textAlign: 'center'}}> {book.publisher} </td>
                <td style={{textAlign: 'center'}}> {book.year} </td>
            </tr>            
        );
    }

    componentDidMount(){
        BookActions.readBooks();
    }

    render() {
        
        let content = '';
        
        if(this.props.book.readState.pending){
            content = (
                <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                    </div> 
                </div>)
        }
        
        if(this.props.book.readState.success){
            content = (
                <Table striped bordered hover size="sm"> 
                    <thead>
                        <tr>       
                            <th><BookOpModal type="add" book={{}}/> </th>             
                            <th style={{textAlign: 'center'}}>ID</th>
                            <th style={{textAlign: 'center'}}>Title</th>
                            <th style={{textAlign: 'center'}}>Author</th>
                            <th style={{textAlign: 'center'}}>Publisher</th>
                            <th style={{textAlign: 'center'}}>Year</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.book.bookList.map(this.createBookRow, this)}
                    </tbody>    
                </Table>)
        }

        if(this.props.book.readState.failure){
            content = (
                <div className="alert alert-danger" role="alert">
                    Error while loading books!
                </div>)
        }

        return(
            <div>
                <h1>Books</h1>
                {content}
            </div>
        );
    }
}

BookList.propTypes = {
    book: PropTypes.object.isRequired    
};