import React from 'react'
import RandomDrink from './RandomDrink'
import TopTenDrinks from './TopTenDrinks'
import CustomDrinks from './CustomDrinks'
import AnchorLink from 'react-anchor-link-smooth-scroll'

export default function Home({user}) {

    return (

        <div className="content-container" id="home">
            <h1>Welcome "{user.username}"</h1>
            <div className="sub-links">
                <AnchorLink href='#anchorRandomDrinks'>Random</AnchorLink>
                <AnchorLink href='#anchorTopTenDrinks'>Top Ten</AnchorLink>
                <AnchorLink href='#anchorCustomDrinks'>Custom Drinks</AnchorLink>
            </div>
            <section id="anchorRandomDrinks">
                <RandomDrink/>
            </section>
            <section id="anchorTopTenDrinks">
             <TopTenDrinks/>
            </section>
            <section id="anchorCustomDrinks">
             <CustomDrinks/>
            </section>
        </div>
    )
}

