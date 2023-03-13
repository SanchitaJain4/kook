import {React, useState, useEffect} from 'react';
import { Container, Form, Button, ListGroup, Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

var API_ENDPOINT = '';

function RecipeView(props) {
  const navigate = useNavigate();
  const [loading,setLoading] = useState(false)
  const [recipeContent, setRecipeContent] = useState("");

  useEffect(() => {

    if(props.recipe) {
      setLoading(true)
    fetch(API_ENDPOINT + "/getRecipe", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        data: props.recipe
      })
    }).then(response => response.json())
      .then(data => {
        const recipe = data.choices[0].message.content;
        setRecipeContent(recipe);
      })
      .catch(error => {
        console.error('Error fetching recipe data:', error);
      }).finally(()=>{
        setLoading(false)
      });
    }
    
  }, [props.recipe]);


  return (
    <Container className="center">
      <p onClick={() => navigate(-1)}>&lt; Back</p>
      {props.recipe}
      {loading && <Spinner animation="border" size="sm" className="mr-2" />}
      {recipeContent.split("\n").map((line, index) => {
        return <p key={index}>{line}</p>
      })}
    </Container>
  );
}

export default RecipeView;