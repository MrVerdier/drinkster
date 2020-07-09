import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function FavoriteDrinks() {
  const API_KEY = process.env.REACT_APP_DRINKDB_API_KEY;

  const [drinkId, setDrinkId] = useState([]);
  const [drinks, setDrinks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(
        `https://enigmatic-mountain-64865.herokuapp.com/api/drinks/getfavoritedrinks`
      );
      const body = await result.json();
      setDrinkId(body);
    };
    fetchData();
  }, []);

  useEffect(() => {
    drinkId.forEach(function (item) {
      const fetchData = async () => {
        const result = await fetch(
          `https://www.thecocktaildb.com/api/json/v2/${API_KEY}/lookup.php?i=${item.drink_fk}`
        );
        const body = await result.json();
        setDrinks((oldArray) => [...oldArray, body]);
      };
      fetchData();
    });
  }, [drinkId, API_KEY]);

  return (
    <>
      <h2>Your Favorite Drinks</h2>
      <div className="user-custom-drinks drink-grid-container">
        {drinks.map((item, key) => (
          <div key={key}>
            {item.drinks.map((item, key) => (
              <Link
                to={`/drinksingleview/${item.idDrink}`}
                key={key}
                className="drink-link"
              >
                <div className="drink-container" key={key}>
                  <div className="card-info">
                    <h3>{item.strDrink}</h3>
                    <div>{item.strCategory}</div>
                  </div>
                  <div className="image-cover">
                    <img src={item.strDrinkThumb} alt="drink" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}
