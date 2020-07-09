import React from 'react'
import CustomDrink from './CustomDrink'
import UserDrinks from './UserDrinks'
import FavoriteDrinks from './../Favorite/FavoriteDrinks'
import AnchorLink from 'react-anchor-link-smooth-scroll'

export default function Profile({user}) {

    return (
        <div className="profile-page">
            <h1>Profile</h1>
             <div className="sub-links">
                <AnchorLink href='#anchorCustomDrink'>Upload Drinks</AnchorLink>
                <AnchorLink href='#anchorUserDrink'>Your Drinks</AnchorLink>
                <AnchorLink href='#anchorFavoriteDrinks'>Favorites</AnchorLink>
            </div>
            <div className="user-container">
                <h2>Username: "{user.username}"</h2>
                <div className="user-info">First Name: "{user.firstName}"</div>
                <div className="user-info">Last Name: "{user.lastName}"</div>
                <div className="user-info">Email: "{user.email}"</div>
            </div>
            <section id="anchorCustomDrink">
                <CustomDrink/>
            </section>
            <section id="anchorUserDrink">
                <UserDrinks />
            </section>
            <section id="anchorFavoriteDrinks">
                <FavoriteDrinks />
            </section>
        </div>
    )
}

