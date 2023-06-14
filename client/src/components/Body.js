import React, { useContext } from 'react'
import Account from './Account'
import Home from './Home'
import ProfileEmployer from './ProfileEmployer'
import ProfileEmployerCreate from './ProfileEmployerCreate'
import ProfileAssistant from './ProfileAssistant'
import ProfileAssistantCreate from './ProfileAssistantCreate'
import SearchAssistants from './SearchAssistants'
import Login from './Login'
import { Route, Switch } from 'react-router-dom'
import { UserContext } from '../context/user';
import { Redirect } from 'react-router-dom'
import { Grid } from 'react-loader-spinner'
import ProfileEmployerCreateJob from './ProfileEmployerCreateJob'


function Body() {

    const { user, isAuth, isLoading } = useContext(UserContext)

    const spinner = <div style={{ width: '100%', height: '100%' }}>
            <div style={{ position: 'absolute', top: '40%', left: 'calc(50% - 30px)' }}>
                <Grid
                height="60"
                width="60"
                color="#518938"
                ariaLabel="grid-loading"
                radius="12.5"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />
            </div>
        </div>

    return (
        <>
            <Switch>
                <Route exact path="/login">
                    {isLoading ? spinner : (
                        function() {
                            if (isAuth) {
                                return <Redirect to="/account" />
                            } else {
                                return <Login/>
                            }
                        }
                    )}
                </Route>
                <Route exact path="/account">
                    {/* {isAuth ? <Account/> : <Login/>} */}
                    {isLoading ? spinner : (
                        function() {
                            if (isAuth) {
                                return <Account/>
                            } else {
                                return <Redirect to="/login" />
                            }
                        }
                    ) }
                    {/* <Account/> */}
                </Route>
                <Route exact path="/account/profile-employer">
                    {/* {isAuth ? <ProfileEmployer/> : <Login/>} */}
                    {isLoading ? spinner : (
                        function() {
                            if (isAuth && user.employer) {
                                return <ProfileEmployer/>
                            } else {
                                return <Redirect to="/login" />
                            }
                        }
                    ) }
                    {/* <ProfileEmployer/> */}
                </Route>
                <Route exact path="/account/profile-employer/create">
                    {/* {isAuth ? <ProfileEmployerCreate/> : <Login/>} */}
                    {isLoading ? spinner : (
                        function() {
                            if (isAuth && !user.employer) {
                                return <ProfileEmployerCreate/>
                            } else {
                                return <Redirect to="/login" />
                            }
                        }
                    ) }
                    {/* <ProfileEmployerCreate/> */}
                </Route>
                <Route exact path="/account/profile-assistant">
                    {/* {isAuth ? <ProfileAssistant/> : <Login/>} */}
                    {isLoading ? spinner : (
                        function() {
                            if (isAuth && user.assistant) {
                                return <ProfileAssistant/>
                            } else {
                                return <Redirect to="/login" />
                            }
                        }
                    ) }
                    {/* <ProfileAssistant/> */}
                </Route>
                <Route exact path="/account/profile-assistant/create">
                    {/* {isAuth ? <ProfileAssistantCreate/> : <Login/>} */}
                    {isLoading ? spinner : (
                        function() {
                            if (isAuth && !user.assistant) {
                                return <ProfileAssistantCreate/>
                            } else {
                                return <Redirect to="/login" />
                            }
                        }
                    ) }
                    {/* <ProfileAssistant/> */}
                </Route>
                <Route exact path="/account/profile-employer/post">
                    {/* {isAuth ? <ProfileAssistantCreate/> : <Login/>} */}
                    {isLoading ? spinner : (
                        function() {
                            if (isAuth && user.employer) {
                                return <ProfileEmployerCreateJob/>
                            } else {
                                return <Redirect to="/login" />
                            }
                        }
                    ) }
                    {/* <ProfileAssistant/> */}
                </Route>
                <Route exact path="/search/assistants">
                    {/* {isAuth ? <ProfileAssistantCreate/> : <Login/>} */}
                    {isLoading ? spinner : (
                        function() {
                            if (isAuth) {
                                return <SearchAssistants/>
                            } else {
                                return <Redirect to="/login" />
                            }
                        }
                    ) }
                    {/* <ProfileAssistant/> */}
                </Route>
                <Route exact path="/">
                    <Home/>
                </Route>
            </Switch>
        </>
    )
}
export default Body