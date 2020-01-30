import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'; 
import PropTypes from 'prop-types';
import BookActions from '../actions/bookActions';


export default class BookOpModal extends React.Component{

  constructor(props){ 

    super(props);

    this.state = {
          
      show: false,      

      book: {
        year: props.book.year,
        title: props.book.title,
        author: props.book.author,
        bookId: props.book.bookId,
        publisher: props.book.publisher
      }
    },

    this.modal = ( ()=> {

      switch(props.type){

        case "add": 
          return { 
            title: "Add Book",
            action: BookActions.addBook,
            readOnly: false,
            button: {
              title: "Add Book",
              variant: "primary"
            }              
          };  

        case "update": 
          return { 
            title: "Update Book",
            action: BookActions.updateBook,
            readOnly: false,
            button: {
              title: "Update Book",
              variant: "info"
            }
          };

        case "delete": 
          return { 
            title: "Delete Book",
            action: BookActions.deleteBook,
            readOnly: true,
            button: {
              title: "Delete Book",
              variant: "danger"
            }
          };
        default: break;
      }
    })()
  }

  handleShow(){     
    this.setState({ ...this.state, show: true });    
  }

  handleClose(){    
    this.setState({ ...this.state, show: false });
  }

  handleChange(e){
    this.setState({ ...this.state,
      book: {
        ...this.state.book, [e.target.id]: e.target.value
      }
    })    
  }

  submit(){
    let book = this.state.book;
    this.modal.action(book);
  }
  
  render(){        
    return (      
      
      <span>
        <Button

          variant={this.modal.button.variant}
          onClick={this.handleShow.bind(this)}
          
          >{this.modal.button.title}

        </Button>

        <Modal show={this.state.show} onHide={ ()=> { this.setState({ ...this.state, show: false })}}>
          <Modal.Header closeButton>
            <Modal.Title>{this.modal.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form onSubmit={this.submit.bind(this)}>

            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="input"                
                defaultValue={this.state.book.title}
                readOnly={this.modal.readOnly}
                onChange={this.handleChange.bind(this)} />
            </Form.Group>

            <Form.Group controlId="author">
              <Form.Label>Author ID</Form.Label>
              <Form.Control
                type="input"
                defaultValue={this.state.book.author}
                readOnly={this.modal.readOnly}
                onChange={this.handleChange.bind(this)} />
            </Form.Group>

            <Form.Group controlId="publisher">
              <Form.Label>Publisher ID</Form.Label>
              <Form.Control
                type="input"
                defaultValue={this.state.book.publisher}
                readOnly={this.modal.readOnly}
                onChange={this.handleChange.bind(this)} />
            </Form.Group>

            <Form.Group controlId="year">
              <Form.Label>Year</Form.Label>
              <Form.Control
                type="input"
                defaultValue={this.state.book.year}
                readOnly={this.modal.readOnly }
                onChange={this.handleChange.bind(this)} />
            </Form.Group>

            <Button variant="primary" type="submit" onSubmit={this.submit.bind(this)}>
              Submit
            </Button>
            <Button variant="secondary" onClick={this.handleClose.bind(this)}>
              Close
            </Button>
          </Form>
          </Modal.Body>
        </Modal>
      </span>      
    )      
  }
}

BookOpModal.propTypes = {
  type: PropTypes.string.isRequired,
  book: PropTypes.object.isRequired
};