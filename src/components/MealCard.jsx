import React, { useEffect, useState } from "react";
import {FaYoutube, BsBoxArrowInRight} from 'react-icons';
import "./App.css";

const GetRandomFood = async () => {
  const url = "https://www.themealdb.com/api/json/v1/1/random.php";
  const response = await fetch(url);
  const data = await response.json();
  if (!response.ok) {
    console.log("Error fetching data from " + url);
  } else {
    const meal = data.meals[0];
    return {
      strMealThumb: meal.strMealThumb,
      strMeal: meal.strMeal,
      strCategory: meal.strCategory,
      strInstructions: meal.strInstructions,
      strYoutube: meal.strYoutube,
      strSource: meal.strSource,
    };
  }
};

const FoodItem = ({ food }) => {
  const {
    strMealThumb,
    strMeal,
    strCategory,
    strInstructions,
    strYoutube,
    strSource,
  } = food;

  return (
    <div className="card">
      <img src={strMealThumb} alt={strMeal} className="card-img-top" />
      <div className="card-body">
        <h3 className="card-title">{strMeal}</h3>
        <p className="card-category">{strCategory}</p>
        <p className="card-text">{strInstructions}</p>
        <form action={strYoutube} className="youtube" method="get" target="_blank">
          <button type="submit"><FaYoutube /></button>
        </form>
        <form action={strSource} className="source" method="get" target="_blank">
          <button type="submit"><BsBoxArrowInRight />Source</button>
        </form>
      </div>
    </div>
  );
};

function RandomFoods() {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    const fetchFoods = async () => {
      for (let i = 0; i < 20; i++) {
        const res = await GetRandomFood();
        setFoods((prevFoods) => [...prevFoods, res]);
      }
    };

    fetchFoods();
  }, []);

  return (
    <div>
      {foods.map((food, index) => (
        <FoodItem key={index} food={food} />
      ))}
    </div>
  );
}

export default RandomFoods;
