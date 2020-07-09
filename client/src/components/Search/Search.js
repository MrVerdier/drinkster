import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch
  } from "react-router-dom"
import Searchbyname from './SearchByName'
import LiqourSelect from './LiqourSelect'
import SearchByFilter from './SearchByFilter'
import DrinkSingleview from './../SingleView/DrinkSingleview'

export default function Search() {

    let { path, url } = useRouteMatch()

    return (
        <>
            <h1>What do you want to search by?</h1>
            <Router>
                <div className="sub-links">
                    <Link to={`${url}/liqourselect`}><span>Liquor</span></Link>
                    <Link to={`${url}/searchbyname`}><span>Name</span></Link>
                    <Link to={`${url}/searchbyfilter`}><span>Ingr.</span></Link>
                </div>
                <div className="search" id="search">
                    <Switch>
                        <Route path={`${path}/searchbyname`} component={Searchbyname}></Route>
                        <Route path={`${path}/liqourselect`} component={LiqourSelect}></Route>
                        <Route path={`${path}/searchbyfilter`} component={SearchByFilter}></Route>
                        <Route path={`/drinksingleview/:drinkid`} component={DrinkSingleview}></Route>
                    </Switch>
                </div>
            </Router>
        </>
    )
}

