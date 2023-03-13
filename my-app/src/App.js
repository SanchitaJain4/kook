import React, { useState } from 'react';
import { Container, Form, Button, ListGroup, Spinner } from 'react-bootstrap';
import './App.css';
import RecipeGenerator from './RecipeGenerator.js'
import RecipeView from './RecipeView.js'
import { HashRouter as Router, Route, Link, Routes,useNavigate } from 'react-router-dom'; // import react-router-dom dependencies

    const API_ENDPOINT = "";

// Use this in the fetch endpoint to hit BE.
function App() {
  // const navigate = useNavigate();

  const [todos, setTodos] = useState([]);
  const [recipe, setRecipe] = useState("");
  const [choices, setChoices] = useState([]);
  const [loading, setLoading] = useState(false);


  const handleRecipeSubmit = () => {
    setLoading(true);

    fetch(API_ENDPOINT + '/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        data: todos
      })
    })
      .then(response => response.json())
      .then(data => {
        const formattedMessage = data.choices[0].message.content.split('\n');
        setChoices(formattedMessage);
        setLoading(false);
      }).catch((error) => {
        console.error('Error:', error);
        setLoading(false);
      });
  }

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
    // navigate("/recipeview")
    // navigate("/recipeview")
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
                loading={loading}
                setLoading={setLoading}
                deleteTodos={deleteTodos}
                updateTodos={updateTodos}
                todos={todos}
                choices={choices}
                setChoices={setChoices}
                viewRecipe={viewRecipe}
                handleRecipeSubmit={handleRecipeSubmit}
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
