import React, {useEffect, useState} from 'react'
import Pagination from './Pagination'
import { Link } from "react-router-dom"

export default function SearchByName() {

    const API_KEY = process.env.REACT_APP_DRINKDB_API_KEY

    const [searchTerm, setSearchTerm] = useState('')
    const [result, setResult] = useState([])
    const [currentPage, setCurrentpage] = useState(1)
    const [drinksPerPage] = useState(10)

    const handleChange = event => {
        setSearchTerm(event.target.value)
    }

    useEffect(() => {
        const fetchData = async () => {  
            const result = await fetch(`https://www.thecocktaildb.com/api/json/v2/${API_KEY}/search.php?s=${searchTerm}`)
            const body = await result.json()
            setResult(body.drinks)
        }
        fetchData()
    }, [searchTerm, API_KEY])

    // pagination
    const indexOfLastDrink = currentPage * drinksPerPage
    const indexOfFirstDrink = indexOfLastDrink - drinksPerPage
    if (result === null) {
        return ( 
            <>
                <h2>Search by name</h2>
                <div className="search">
                    <input type="text" placeholder="Search" value={searchTerm} onChange={handleChange} className="name-search"></input>
                    <div>Nothing found</div>
                </div>
            </>
        )
    }
    const currentDrinks = result.slice(indexOfFirstDrink, indexOfLastDrink)

    const paginate = (pageNumber, e) => {
        e.preventDefault()
        setCurrentpage(pageNumber)
    }

    return (
        <>
            <h2>Search by name</h2>
                <div className="search">
                <input type="text" placeholder="Search" value={searchTerm} onChange={handleChange} className="name-search"></input>
                <div id="searchContainer">
                    {currentDrinks === null ? 
                        (
                        <div>Nothing found</div>
                        ) : (currentDrinks && currentDrinks.map((item, key) => (
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
                        ))
                        )
                    }
                </div>
                <Pagination drinksPerPage={drinksPerPage} totalDrinks={result.length} paginate={paginate}/>
            </div>
        </>
    )
}

