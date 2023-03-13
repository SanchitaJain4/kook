import React, { useState } from 'react';
import { Container, Form, Button, ListGroup, Spinner } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";

const API_ENDPOINT = "http://localhost:5000";

function RecipeGenerator({ todos, updateTodos, deleteTodos, choices, setChoices, handleRecipeSubmit, loading, setLoading, viewRecipe }) {
  const [newTodo, setNewTodo] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTodo !== '') {
      updateTodos(newTodo);
      setNewTodo('');
    }
  };

  const handleInputChange = (e) => {
    setNewTodo(e.target.value);
  };

  const regex = /^\d+\./;

  const messageList = choices.map(item => item.trim())
    .map((item, index) => (
      <p key={index}>
        {item} {regex.test(item) ? <p onClick={()=>{viewRecipe(item); navigate("/recipeview")}}>View Recipe</p> : ''}
      </p>
    ));

  return (
    <Container className="center">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Control
            type="text"
            placeholder="Enter ingredient"
            value={newTodo}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-3">
          Add
        </Button>
      </Form>
      <ListGroup className="mt-3">
        {todos.map((todo, index) => (
          <ListGroup.Item key={index}>
            {todo}
            <Button
              variant="danger"
              className="float-right"
              onClick={() => deleteTodos(index)}
            >
              Delete
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>

      <Button
        disabled={todos.length === 0 || loading}
        onClick={handleRecipeSubmit}
        variant="primary"
        type="submit"
        className="mt-3"
      >
        {loading && <Spinner animation="border" size="sm" className="mr-2" />}
        Generate Recipe Suggestions
      </Button>
      <br />
      {choices && <div>{messageList.length !== 0 ? messageList : choices[0]}</div>}
    </Container>
  );
}

export default RecipeGenerator;
