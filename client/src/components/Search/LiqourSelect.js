import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch
  } from "react-router-dom"
import SearchByLiqour from './SearchByLiqour'
import DrinkSingleview from './../SingleView/DrinkSingleview'

export default function LiquorSelect() {

    let { path, url } = useRouteMatch()

    return (
        <>
            <Router>
            <   div className="liquor-links">
                    <Link to={`${url}/searchbyingredient/vodka`}>Vodka</Link>
                    <Link to={`${url}/searchbyingredient/rum`}>Rum</Link>
                    <Link to={`${url}/searchbyingredient/gin`}>Gin</Link>
                    <Link to={`${url}/searchbyingredient/whiskey`}>Whiskey</Link>
                    <Link to={`${url}/searchbyingredient/beer`}>Beer</Link>
                    <Link to={`${url}/searchbyingredient/tequila`}>Tequila</Link>
                </div>

                <Switch>
                    <Route path={`${path}/searchbyingredient/:ingredient`} component={SearchByLiqour} ></Route>
                    <Route path={`/drinksingleview/:drinkid`} component={DrinkSingleview}></Route>
                </Switch>
            </Router>
        </> 
    )
}