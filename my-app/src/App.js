import React from 'react';
import { Container, Form, Button, ListGroup } from 'react-bootstrap';
import './App.css';

// Use this in the fetch endpoint to hit BE.
var API_ENDPOINT = "http://localhost:5000"

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      newTodo: '',
      choices: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleRecipeSubmit = this.handleRecipeSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.newTodo !== '') {
      this.setState(prevState => ({
        todos: [...prevState.todos, prevState.newTodo],
        newTodo: ''
      }));
    }
  }

  handleRecipeSubmit(e) {
   
        fetch('/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        data: this.state.todos
      })
    })
      .then(response => response.json())
      .then(data => {
        const formattedMessage = data.choices[0].message.content.split('\n');
        this.setState({ choices: formattedMessage, resp: data.choices[0].message.content });
      });
  }

  handleDelete(index) {
    const newTodos = [...this.state.todos];
    newTodos.splice(index, 1);
    this.setState({ todos: newTodos });
  }

  handleInputChange(e) {
    this.setState({ newTodo: e.target.value });
  }

  render() {
    const messageList = this.state.choices.map(item => item.trim()) // Remove any leading/trailing whitespace from each item
    .map((item, index) => <p key={index}>{item}</p>);
      
     // Render each item as a list item element
  
    return (
      <div className="bg">
              <header className="header">
              AI Recipe Generator</header>

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
            {this.state.todos.map((todo, index) => (
              <ListGroup.Item key={index}>
                {todo}
                <Button
                  variant="danger"
                  className="float-right"
                  onClick={() => this.handleDelete(index)}
                >
                  Delete
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
            <Button
            disabled={this.state.todos.length===0} 
            onClick={this.handleRecipeSubmit} variant="primary" type="submit" className="mt-3">
              Generate Recipe Suggestions
            </Button>
         <br/>
        {this.state.choices && <div>{messageList.length !=0 ? messageList: this.state.resp}</div>}
        </Container>
        <footer className="footer"></footer>
      </div>
    );
  }
}

export default App;
