import React, {useEffect, useState} from 'react'
import { Link } from "react-router-dom"

export default function RandomDrink() {

    const API_KEY = process.env.REACT_APP_DRINKDB_API_KEY

    const [result, setResult] = useState([])

    useEffect(() => {
        const fetchData = async () => {  
            const result = await fetch(`https://www.thecocktaildb.com/api/json/v2/${API_KEY}/random.php`)
            const body = await result.json()
            setResult(body)
        }
        fetchData()
    }, [API_KEY])

    return (
        <div className="home-section" id="randomDrinks">
            <h3>Why don't you try this drink??</h3>
                    {result.drinks && result.drinks.map((item, key) => (
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
    )
}

