import React, {useState} from 'react'
import Pagination from './Pagination'
import { Link } from "react-router-dom"

export default function SearchByFilter() {

    const API_KEY = process.env.REACT_APP_DRINKDB_API_KEY

    const [searchTerm1, setSearchTerm1] = useState('')
    const [searchTerm2, setSearchTerm2] = useState('')
    const [searchTerm3, setSearchTerm3] = useState('')
    const [result, setResult] = useState([])
    const [currentPage, setCurrentpage] = useState(1)
    const [drinksPerPage] = useState(10)

    const onSubmit = async e => {
        e.preventDefault()

        if (searchTerm1 === '' && searchTerm2 === '' && searchTerm3 === '' ) {
            console.log("please fill out at least 1 ingredient") 
        } else {
            let ingredients = ''
            ingredients += searchTerm1
            if(searchTerm2) {
                ingredients += ","+searchTerm2
            }
            if(searchTerm3) {
                ingredients += ","+searchTerm3
            }
            const result = await fetch(`https://www.thecocktaildb.com/api/json/v2/${API_KEY}/filter.php?i=${ingredients}`)
            const body = await result.json()
            setResult(body.drinks)
        }
    }

    // pagination
    const indexOfLastDrink = currentPage * drinksPerPage
    const indexOfFirstDrink = indexOfLastDrink - drinksPerPage
    const currentDrinks = result.slice(indexOfFirstDrink, indexOfLastDrink) 

    const paginate = (pageNumber, e) => {
        e.preventDefault()
        setCurrentpage(pageNumber)
    }

    return (
        <>
            <h2>Search by ingredients</h2>

                <div className="search">
                <form onSubmit={onSubmit}>
                <label htmlFor="ingredient1">Ingredient 1</label>
                <input type="text" placeholder="Search" id="ingredient1" value={searchTerm1} onChange={(e) => setSearchTerm1(e.target.value)} className="name-search"></input>
                <label htmlFor="ingredient2">Ingredient 2</label>
                <input type="text" placeholder="Search" id="ingredient2" value={searchTerm2} onChange={(e) => setSearchTerm2(e.target.value)} className="name-search"></input>
                <label htmlFor="ingredient3">Ingredient 3</label>
                <input type="text" placeholder="Search" id="ingredient3" value={searchTerm3} onChange={(e) => setSearchTerm3(e.target.value)} className="name-search"></input>
                <input type="submit" value="Submit"></input>
                </form>
                <div id="searchContainer">
                    {currentDrinks === "None Found" ? 
                        (
                        <div>Nothing found</div>
                        ) :
                        (currentDrinks && currentDrinks.map((item, key) => (
                            <Link to={`/drinksingleview/${item.idDrink}`} key={key} className="drink-link">
                                <div className="drink-container" key={key}>
                                    <div className="card-info">
                                        <h3>{item.strDrink}</h3>
                                    </div>
                                    <div className="image-cover">
                                        <img src={item.strDrinkThumb} alt='drink' />
                                    </div>
                                </div>
                            </Link>
                        ))
                        )
                    }
                <Pagination drinksPerPage={drinksPerPage} totalDrinks={result.length} paginate={paginate}/>
                </div>
            </div>
        </>
    )
}

