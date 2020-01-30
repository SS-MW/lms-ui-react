import Dispatcher from '../dispatcher/appDispatcher';
import {EventEmitter} from 'events';

const CHANGE_EVENT = 'change';

let _bookStore = {
    book:{
        bookList: [],
        readState:{
            pending:false,
            success:false,
            failure:false
        },
        error: ''
    }
};

class BookStoreClass extends EventEmitter{

    addChangeListener(cb){
        this.on(CHANGE_EVENT, cb);
    }

    removeChangeListener(cb){
        this.removeListener(CHANGE_EVENT, cb);
    }

    emitChange(){
        this.emit(CHANGE_EVENT);
    }

    getAllBooks(){
        return _bookStore.book;
    }

    resetReadState(){
        _bookStore.book.readState = {
            pending:false,
            success:false,
            failure:false
          }
    }
}

const BookStore = new BookStoreClass();

Dispatcher.register( (action) => {    
    switch (action.actionType){
        // Create
        case 'add_book_successful':
            BookStore.resetReadState();            
            _bookStore.book.readState.success = true;
            _bookStore.book.bookList.push(action.data);
            BookStore.emitChange();
            break;
        case 'add_book_failure':
            BookStore.resetReadState();
            _bookStore.book.readState.failure = true;
            BookStore.emitChange();
            break;
        case 'add_book_started':
            BookStore.resetReadState();
            _bookStore.book.readState.pending = true;
            BookStore.emitChange();
            break;

        // Read
        case 'read_books_successful':
            BookStore.resetReadState();
            _bookStore.book.bookList = action.data;
            _bookStore.book.readState.success = true;
            BookStore.emitChange();
            break;
        case 'read_books_failure':
            BookStore.resetReadState();
            _bookStore.book.readState.failure = true;
            BookStore.emitChange();
            break;
        case 'read_books_started':
            BookStore.resetReadState();
            _bookStore.book.readState.pending = true;
            BookStore.emitChange();
            break;

        // Update
        case 'update_book_successful':            
            BookStore.resetReadState();            
            var updatedBookList = _bookStore.book.bookList.map( book => {
                return book.bookId == action.data.bookId ? action.data : book;
            })
            _bookStore.book.bookList = updatedBookList;
            _bookStore.book.readState.success = true;
            BookStore.emitChange();
            break;
        case 'update_book_failure':
            BookStore.resetReadState();
            _bookStore.book.readState.failure = true;
            BookStore.emitChange();
            break;
        case 'update_book_started':
            BookStore.resetReadState();
            _bookStore.book.readState.pending = true;
            BookStore.emitChange();
            break;

        // Delete
        case 'delete_book_successful':                  
            BookStore.resetReadState();
            var index = _bookStore.book.bookList.indexOf(action.data);
            _bookStore.book.bookList.splice(index, 1);
            _bookStore.book.readState.success = true;
            BookStore.emitChange();
            break;
        case 'delete_book_failure':
            BookStore.resetReadState();
            _bookStore.book.readState.failure = true;
            BookStore.emitChange();
            break;
        case 'delete_book_started':
            BookStore.resetReadState();
            _bookStore.book.readState.pending = true;
            BookStore.emitChange();
            break;
        default:
            return;
    }
});

export default BookStore;