import React, { Fragment } from 'react';
import { Route, Redirect } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

export const ProtectedRoute = ({ component: Component, ... rest}) => {
    const checkValidToken = () => {
        try{
            const token = localStorage.getItem('token');
            var decoded = jwt_decode(token);
            
            return true;}
        catch(error){
            return false;
        }
    }
    return(
        <Fragment>
            {checkValidToken()
                ? <Route {...rest} render={props => <Component {...rest} {...props} />} />
                : <Redirect to="/login" />
            }
        </Fragment>
    );
}