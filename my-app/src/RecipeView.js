import React from 'react';
import { Container, Form, Button, ListGroup, Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

var API_ENDPOINT = 'http://localhost:5000';

function RecipeView() {
  const navigate = useNavigate();

  return (
    <Container className="center">
      <p onClick={() => navigate(-1)}>Back</p>
      Recipe View
      {this.props.recipe}
    </Container>
  );
}

export default RecipeView;