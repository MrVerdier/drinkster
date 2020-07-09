import React, {useEffect, useState} from 'react'
import { Link } from "react-router-dom"

export default function TopTenDrinks() {

    const API_KEY = process.env.REACT_APP_DRINKDB_API_KEY

    const [result, setResult] = useState([])

    useEffect(() => {
        const fetchData = async () => {  
            const result = await fetch(`https://www.thecocktaildb.com/api/json/v2/${API_KEY}/popular.php`)
            const body = await result.json()
            const limitbody = body.drinks.slice(0, 10)
            setResult(limitbody)
        }
        fetchData()
    }, [API_KEY])

    return (
        <>
            <h3>Top 10</h3>
            <div className="home-section" id="topTenDrinks">
                        {result && result.map((item, key) => (
                            <Link to={`/drinksingleview/${item.idDrink}`} key={key} className="drink-link">
                                <div className="drink-container" key={key}>
                                    <div className="card-info">
                                        <h3>{item.strDrink}</h3>
                                        <div>{item.strCategory}</div>
                                    </div>
                                    <div className="image-cover">
                                        <img src={item.strDrinkThumb} alt='drink' />
                                    </div>
                                </div>
                            </Link>
                        ))}
                </div>
            </>
    )
}

