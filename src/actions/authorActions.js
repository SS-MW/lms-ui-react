import Dispatcher from '../dispatcher/appDispatcher';
import axios from 'axios'

const AuthorActions = {       

    authors: [],

    readAuthors: function(){
        Dispatcher.dispatch({
            actionType: 'read_authors_started'
        });
        
        axios.get(`http://localhost:3000/author`)     
        .then( res => {         
            let authors = res.data;     
                           
            Dispatcher.dispatch({
                actionType: 'read_authors_successful',
                data:  authors        
            });
        })
        .catch( error => {
            console.log(error);
            Dispatcher.dispatch({
                actionType: 'read_authors_failure'
            });
        });
    }, 
}

module.exports = AuthorActions;