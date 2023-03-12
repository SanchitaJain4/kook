import React from 'react';
import { Container, Form, Button, ListGroup } from 'react-bootstrap';
import './App.css';

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
   
        fetch('http://localhost:5000/api', {
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
              Give Recipe Suggestions
            </Button>
         <br/>
        {this.state.choices && <div>{messageList.length !=0 ? messageList: this.state.resp}</div>}
        </Container>
      </div>
    );
  }
}

export default App;
