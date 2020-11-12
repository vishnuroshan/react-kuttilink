import React, { useState, useEffect } from 'react'
import ShortenUrl from '../../components/ShortenUrl/ShortenUrl';
import API from '../../apis/url-api';
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';
import { Container, AppBar, IconButton, Toolbar, Typography, Button } from '@material-ui/core';
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
        console.log('useEffect 1:>> ', user);
        if (auth) {
            API.getUrls().then((urlData) => {
                console.log(urlData);
                setUrls(urlData.data);
                setUser(urlData.user);
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [auth]);


    function logoutHandler() {
        cookies.remove('token');
        setAuth(false);
        setUrls([]);
        setUser({});
    }

    let navs = auth && user ? <p>{user.firstname}</p> : <React.Fragment>
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
            Sign-up
                    </NavLink>
    </React.Fragment>


    return (
        <div className={classes.Main}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.MenuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.Title}>url-shortener</Typography>
                    {navs}
                    {auth ? <Button onClick={logoutHandler} variant="contained" color="primary" href="#contained-buttons">
                        Logout
                    </Button> : null}
                </Toolbar>
            </AppBar>

            <Container maxWidth='lg'>
                {/* <ShortenUrl /> */}
                {/* {auth ? <Dashboard urls={urls} /> : null} */}

                <Switch>
                    <Route path='/url' exact render={(props) => <ShortenUrl auth={auth} urls={urls} {...props} />} />
                    <Route path="/login" exact render={(props) => <Login {...props} setUser={setUser} />} />
                    <Route path='/signup' exact component={Signup} />
                    <Redirect path="/" to={auth ? "/dashboard" : "/url"} />
                    {/* <Route path='/dashboard' render={() => <Dashboard urls={urls} />} /> */}
                </Switch>

            </Container>
        </div>
    );
}

export default UrlShortener;
