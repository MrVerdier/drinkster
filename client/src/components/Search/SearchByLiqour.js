import React, {useState, useEffect} from 'react'
import { Link } from "react-router-dom"
import Pagination from './Pagination'


export default function SearchByLiqour( {match} ) {

    const API_KEY = process.env.REACT_APP_DRINKDB_API_KEY

    const liquor = match.params.ingredient
    const [result, setResult] = useState([])
    const [currentPage, setCurrentpage] = useState(1)
    const [drinksPerPage] = useState(10)

    useEffect(() => {
        const fetchData = async () => {  
            const result = await fetch(`https://www.thecocktaildb.com/api/json/v2/${API_KEY}/filter.php?i=${liquor}`)
            const body = await result.json()
            setResult(body.drinks)
        }
        fetchData()
    }, [liquor, API_KEY])

    const indexOfLastDrink = currentPage * drinksPerPage
    const indexOfFirstDrink = indexOfLastDrink - drinksPerPage
    const currentDrinks = result.slice(indexOfFirstDrink, indexOfLastDrink)

    const paginate = (pageNumber, e) => {
        e.preventDefault()
        setCurrentpage(pageNumber)
    }

    return (
        <>
            <h1>{liquor}</h1>
                <div id="searchContainer">
                {currentDrinks && currentDrinks.map((item, key) => (
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
                <Pagination drinksPerPage={drinksPerPage} totalDrinks={result.length} paginate={paginate}/>
        </>
    )
}

