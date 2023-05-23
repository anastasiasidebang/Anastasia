import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import MealCard from "./components/MealCard";

function App() {
  return (
    <div className="App">
      <div className="App-header">
        <Header />
      </div>
      <div>
        <MealCard />
      </div>
    </div>
  );
}

export default App;
