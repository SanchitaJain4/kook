import React from 'react';
import { Container, Form, Button, ListGroup, Spinner } from 'react-bootstrap';
import {Link} from "react-router-dom"
// Use this in the fetch endpoint to hit BE.

var API_ENDPOINT = "http://localhost:5000"

class RecipeGenerator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      newTodo: '',
      choices: [],
      loading: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleRecipeSubmit = this.handleRecipeSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.newTodo !== '') {
      this.props.updateTodos(this.state.newTodo)
      this.setState(prevState => ({
        newTodo: ''
      }));
    }
  }

  handleRecipeSubmit(e) {
    this.setState({loading: true})
        fetch(API_ENDPOINT + '/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        data: this.props.todos
      })
    })
      .then(response => response.json())
      .then(data => {
        const formattedMessage = data.choices[0].message.content.split('\n');
        this.setState({ choices: formattedMessage, resp: data.choices[0].message.content });
      }).finally(() => {
        this.setState({loading: false})
      });

  }

  // handleDelete(index) {
  //   const newTodos = [...this.state.todos];
  //   newTodos.splice(index, 1);
  //   this.setState({ todos: newTodos });
  // }

  handleInputChange(e) {
    this.setState({ newTodo: e.target.value });
  }

  render() {
    const regex = /^\d+\./;

    const messageList = this.state.choices.map(item => item.trim()) // Remove any leading/trailing whitespace from each item
    .map((item, index) => <p key={index}>{item} {regex.test(item) ? 
      "View Recipe" : "" }</p>);
            

     // Render each item as a list item element
  
    return (
        <Container className="center">
          <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Control
                type="text"
                placeholder="Enter ingredient"
                value={this.state.newTodo}
                onChange={this.handleInputChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3">
              Add
            </Button>
          </Form>
          <ListGroup className="mt-3">
            {this.props.todos.map((todo, index) => (
              <ListGroup.Item key={index}>
                {todo}
                <Button
                  variant="danger"
                  className="float-right"
                  onClick={() => this.props.deleteTodos(index)}
                >
                  Delete
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>

          
               

            <Button
            disabled={this.props.todos.length === 0 || this.state.loading} 
            onClick={this.handleRecipeSubmit} variant="primary" type="submit" className="mt-3">
                {this.state.loading && <Spinner animation="border" size="sm" className="mr-2" />} {/* Add the spinner here */}

              Generate Recipe Suggestions
            </Button>
         <br/>
        {this.state.choices && <div>{messageList.length !=0 ? messageList: this.state.resp}</div>}
        </Container>
    );
  }
}

// <Link to="/recipeView">View Recipe</Link>
export default RecipeGenerator;
