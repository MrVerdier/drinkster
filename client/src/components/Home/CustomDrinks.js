import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function CustomDrinks() {
  const [result, setResult] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(
        `https://enigmatic-mountain-64865.herokuapp.com/api/drinks/getcustomdrinks`
      );
      const body = await result.json();
      setResult(body);
    };
    fetchData();
  }, []);

  return (
    <>
      <h3>User custom drinks</h3>
      <div className="home-section" id="topTenDrinks">
        {result.map((drink, key) => (
          <Link
            to={`/customdrinksingleview/${drink.id}`}
            key={key}
            className="drink-link"
          >
            <div className="drink-container">
              <div className="card-info">
                <h3>{drink.name}</h3>
                <div>{drink.category}</div>
              </div>
              <div className="custom-image-cover">
                <img
                  src={process.env.PUBLIC_URL + `/uploads/${drink.image_url}`}
                  alt="drink"
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
