import React from 'react';
import classes from './LoginSignup.module.css';

const LoginSignup = (props) => {

    let emailElemRef, passwordElemRef;

    return (
        <div className={classes.LoginSignup} >
            <h4 style={{ color: "white" }}>LoginSignup</h4>
            <form>
                <input
                    ref={(el) => emailElemRef = el}
                    type="email"
                    placeholder="email" />
                <input
                    ref={(el) => passwordElemRef = el}
                    type="password"
                    placeholder="password" />
                <button
                    onSubmit={() => props.login(emailElemRef, passwordElemRef)}
                    className={classes.LoginButton}>
                    login
            </button>
            </form>
        </div>
    );
};

export default LoginSignup;