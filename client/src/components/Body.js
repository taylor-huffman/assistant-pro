import React, { useContext } from 'react'
import Account from './Account'
import Home from './Home'
import ProfileEmployer from './ProfileEmployer'
import ProfileAssistant from './ProfileAssistant'
import Login from './Login'
import { Route, Switch } from 'react-router-dom'
import { UserContext } from '../context/user';
import { Redirect } from 'react-router-dom'


function Body() {

    const { user } = useContext(UserContext)

    return (
        <>
            <Switch>
                <Route exact path="/login">
                    <Login/>
                </Route>
                <Route exact path="/account">
                    {/* {!isAuth ? <Redirect to="/login" /> : <Account/>} */}
                    <Account/>
                </Route>
                <Route exact path="/account/profile-employer">
                    {/* {user.error ? <Redirect to="/login" /> : <ProfileEmployer/>} */}
                    <ProfileEmployer/>
                </Route>
                <Route exact path="/account/profile-assistant">
                    {/* {user.error ? <Redirect to="/login" /> : <ProfileAssistant/>} */}
                    <ProfileAssistant/>
                </Route>
                <Route exact path="/">
                    <Home/>
                </Route>
            </Switch>
        </>
    )
}
export default Body