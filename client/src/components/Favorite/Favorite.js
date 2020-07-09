import React, { useState, useEffect } from "react";
import { FaHeart } from "react-icons/fa";

export default function Favorite({ drinkId }) {
  const [favoriteStatus, setFavoriteStatus] = useState(false);
  const [heartColor, setHeartColor] = useState("grey");

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(
        `https://enigmatic-mountain-64865.herokuapp.com/api/drinks/getfavorite?id=${drinkId}`
      );
      const body = await data.json();
      if (body === false) {
        setFavoriteStatus(false);
      } else {
        setFavoriteStatus(true);
      }
    };
    fetchData();
  }, [drinkId]);

  const favoriteThis = async () => {
    fetch("/api/drinks/setfavoritedrink", {
      method: "POST",
      body: JSON.stringify({ drinkId }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setHeartColor("red");
  };

  return (
    <>
      <div
        className="heart-button"
        onClick={favoriteThis}
        disabled={favoriteStatus}
      >
        {favoriteStatus === false ? (
          <FaHeart style={{ color: heartColor }} />
        ) : (
          <FaHeart style={{ color: "#ec3f3f" }} />
        )}
      </div>
    </>
  );
}
