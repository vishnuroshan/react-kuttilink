import React from 'react';
import { Route, Redirect } from 'react-router-dom';


const ProtectedRoute = (Component, props) => {

    return (
        <Route
            {...props}
            render={props => (
                props.auth ? <Component {...props} /> : <Redirect to='/login' />
            )}
        />
    )
};

export default ProtectedRoute;