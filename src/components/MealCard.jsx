import React, { useEffect, useState } from "react";
import "../App.css";

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
    <div className="container">
      <div className="card">
        <img src={strMealThumb} className="image" />
        <div className="card-body">
          <h3 className="title">{strMeal}</h3>
          <p className="category">{strCategory}</p>
          <span className="instructions">{strInstructions}</span>
          <div className="buttons">
            <form action={strYoutube} method="get" target="_blank">
              <button type="submit" className="youtube">
                Youtube
              </button>
            </form>
            <form action={strSource} method="get" target="_blank">
              <button type="submit" className="source">
                Source
              </button>
            </form>
          </div>
        </div>
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
