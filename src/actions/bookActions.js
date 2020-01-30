import Dispatcher from '../dispatcher/appDispatcher';
import axios from 'axios'

const BooksActions = {       

    books: [],

    readBooks: function(){
        Dispatcher.dispatch({
            actionType: 'read_books_started'
        });
       
        axios.get(`http://localhost:3000/book`)     
        .then( res => {         
            let books = res.data;           
            Dispatcher.dispatch({
                actionType: 'read_books_successful',
                data:  books        
            });
        })
        .catch( error => {
            console.log(error);
            Dispatcher.dispatch({
                actionType: 'read_books_failure'
            });
        });
    },

    addBook: function(book){
        Dispatcher.dispatch({
            actionType: 'add_book_started'
        });        
        axios.post(`http://localhost:3000/book`, book)     
        .then( res => {  
            book.bookId = res.data.bookId;                   
            Dispatcher.dispatch({
                actionType: 'add_book_successful',
                data: book                 
            });
        })
        .catch( error => {
            console.log(error);
            Dispatcher.dispatch({
                actionType: 'add_book_failure'
            });
        });
    },

    updateBook: function(updatedBook){                 
        Dispatcher.dispatch({
            actionType: 'update_book_started'
        });        
        axios.put(`http://localhost:3000/book`, updatedBook)  
        .then( res => {   
            console.log('Should use res to notify user update successful...');                      
            console.log(res);
            Dispatcher.dispatch({
                actionType: 'update_book_successful',
                data: updatedBook                 
            });
        })
        .catch( error => {
            console.log(error);
            Dispatcher.dispatch({
                actionType: 'update_book_failure'
            });
        });
    },

    deleteBook: function(book){      
        Dispatcher.dispatch({
            actionType: 'delete_book_started'
        });        
        axios.delete(`http://localhost:3000/book/${book.bookId}`)     
        .then( res => {
            console.log('Should use res to notify user delete successful...');                      
            console.log(res);                              
            Dispatcher.dispatch({
                actionType: 'delete_book_successful',
                data: book
            });
        })
        .catch( error => {
            console.log(error);
            Dispatcher.dispatch({
                actionType: 'delete_book_failure'
            });
        });
    }
}

module.exports = BooksActions;