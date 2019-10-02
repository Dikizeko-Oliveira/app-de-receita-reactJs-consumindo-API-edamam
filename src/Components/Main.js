import React, { useState, useEffect } from "react";
import API from "../Services/Api";
import "./Main.css";

const Main = () => {
  const APP_ID = "d30710d4";
  const APP_KEY = "cff50961cd112056d2c0021998d54b17";

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("chicken");

  useEffect(() => {
    getRecipes();
  }, [query]);

  const updateSearch = e => {
    setSearch(e.target.value);
  };

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  };

  // faz a requisição da api
  const getRecipes = async () => {
    const response = await API.get(
      `search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    setRecipes(response.data.hits);
    // console.log(response.data);
  };

  return (
    <div className="main">
      <form onSubmit={getSearch}>
        <input
          type="text"
          name="search"
          value={search}
          placeholder="Escreva um alimento ex.: Banana"
          onChange={updateSearch}
        />
        <button type="submit">Search</button>
      </form>

      {recipes.map(recipe => (
        <div key={recipe.recipe.label} className="recipes">
          <h1>{recipe.recipe.label}</h1>
          <img src={recipe.recipe.image} alt={recipe.recipe.label} />
          <p>Calorias: {recipe.recipe.calories}</p>
          <ul>
            {recipe.recipe.ingredients.map(ingredient => (
              <li key={Math.random() * 1000}>{ingredient.text}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Main;
