import React, { useState, useEffect } from 'react'
import ShortenUrl from '../../components/ShortenUrl/ShortenUrl';
import Dashboard from '../Dashboard/Dashboard';
// import LoginSignup from '../../components/LoginSignup/LoginSignup';
import API from '../../apis/url-api';
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import { Container, AppBar, IconButton, makeStyles, Toolbar, Typography, Button } from '@material-ui/core';
// import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import MenuIcon from '@material-ui/icons/Menu';
import Cookies from 'universal-cookie';
import cssClasses from './UrlShortener.module.css';

import Login from '../../components/Login/Login';
import Signup from '../../components/Signup/Signup';

const cookies = new Cookies();

const UrlShortener = (props) => {

    const classes = { ...cssClasses }

    const [urls, setUrls] = useState([]);
    const [user, setUser] = useState({});
    const [auth, setAuth] = useState(cookies.get('token') ? true : false);


    useEffect(() => {
        if (auth) {
            API.getUrls().then((urlData) => {
                console.log(urlData);
                setUrls(urlData.data);
            });
        }
    }, [auth]);


    return (

        <div className={classes.Main}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.MenuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.Title}>kutti link</Typography>
                    <NavLink
                        className={classes.NavLink}
                        to="/login/"
                        exact
                        activeClassName="my-active">
                        Login</NavLink>

                    <NavLink

                        className={classes.NavLink}
                        to="/signup/"
                        exact
                        activeClassName="my-active">
                        Sign-up</NavLink>
                </Toolbar>
            </AppBar>

            <Container maxWidth='lg'>
                {/* <ShortenUrl /> */}
                {/* {auth ? <Dashboard urls={urls} /> : null} */}

                <Switch>
                    <Route path='/url' exact component={ShortenUrl} />
                    <Route path="/login" exact component={Login} />
                    <Route path='/signup' exact component={Signup} />
                    {/* <Redirect path="/" to={auth ? "/dashboard" : "/url"} /> */}
                    {/* <Route path='/dashboard' render={() => <Dashboard urls={urls} />} /> */}
                </Switch>

            </Container>
        </div>
    );
}

export default UrlShortener;
