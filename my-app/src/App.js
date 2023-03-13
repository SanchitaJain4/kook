import React, { useState } from 'react';
import { Container, Form, Button, ListGroup, Spinner } from 'react-bootstrap';
import './App.css';
import RecipeGenerator from './RecipeGenerator.js'
import RecipeView from './RecipeView.js'
import { HashRouter as Router, Route, Link, Routes } from 'react-router-dom'; // import react-router-dom dependencies

// Use this in the fetch endpoint to hit BE.
function App() {
  const [todos, setTodos] = useState([]);
  const [recipe, setRecipe] = useState("");

  const updateTodos = (todo) => {
    setTodos([...todos, todo]);
  }

  const deleteTodos = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  }

  const viewRecipe = (item) => {
    setRecipe(item);
  }

  return (
    <Router>
      <div className="bg">
        <header className="header">
          AI Recipe Generator
        </header>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <RecipeGenerator
                deleteTodos={deleteTodos}
                updateTodos={updateTodos}
                todos={todos}
              />
            }
          />
          <Route
            path="/recipeview"
            element={<RecipeView recipe={recipe} />}
          />
        </Routes>
        <footer className="footer">Powered by ChatGpt 3.5</footer>
      </div>
    </Router>
  );
}

export default App;
