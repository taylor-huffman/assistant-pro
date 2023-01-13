import React from 'react'
import Account from './Account'
import Home from './Home'
import ProfileEmployer from './ProfileEmployer'
import { Route, Switch } from 'react-router-dom'


function Body() {

    return (
        <>
            <Switch>
                <Route exact path="/account">
                    <Account/>
                </Route>
                <Route exact path="/account/profile-employer">
                    <ProfileEmployer/>
                </Route>
                <Route exact path="/">
                    <Home/>
                </Route>
            </Switch>
        </>
    )
}
export default Body