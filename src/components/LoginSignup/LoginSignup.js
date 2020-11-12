import React, { Component } from 'react';
import classes from './LoginSignup.module.css';
import Input from '../UI/Input/Input';
import API from '../../apis/url-api';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import Button from '../UI/Button/Button';
import FormElementConfigBuilder from '../../forms/FormConfigBuilder';
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';

function refreshPage() {
    window.location.reload();
}

class LoginSignup extends Component {

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            signupForm: {
                firstname: new FormElementConfigBuilder('input')
                    .setValidation({ required: true, desc: 'first name must not be empty' })
                    .setPlaceHolder('Your First name')
                    .build(),
                lastname: new FormElementConfigBuilder('input')
                    .setValidation({ required: false })
                    .setPlaceHolder('Your Last name')
                    .build(),
                email: new FormElementConfigBuilder('input', 'email')
                    .setValidation({ required: true, desc: 'email must not be empty' })
                    .setPlaceHolder('Your Email')
                    .build(),
                password: new FormElementConfigBuilder('input', 'password')
                    .setValidation({ required: true, desc: 'password must not be empty' })
                    .setPlaceHolder('Set your password')
                    .build()
            },
            loginForm: {
                email: new FormElementConfigBuilder('input', 'email')
                    .setValidation({ required: true, desc: 'email must not be empty' })
                    .setPlaceHolder('Your Email')
                    .build(),
                password: new FormElementConfigBuilder('input', 'password')
                    .setValidation({ required: true, desc: 'password must not be empty' })
                    .setPlaceHolder('Your password')
                    .build()
            },
            loginFormIsValid: false,
            signupFormIsValid: false
        }
    }

    loginHandler = (event) => {
        event.preventDefault();
        API.login(this.state.loginForm.email.value, this.state.loginForm.password.value).then((response) => {
            const { cookies } = this.props;
            cookies.set('token', response.token);
            refreshPage();
        });
    };

    loginInputChangedHandler = (event, inputIdentfier) => {
        const updatedLoginForm = {
            ...this.state.loginForm
        };
        const updatedFormElement = { ...updatedLoginForm[inputIdentfier] };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedLoginForm[inputIdentfier] = updatedFormElement;

        let formIsValid = true;

        for (let inputIdentfier in updatedLoginForm) {
            formIsValid = updatedLoginForm[inputIdentfier].valid && formIsValid
        }
        this.setState({ loginForm: updatedLoginForm, loginFormIsValid: formIsValid });
    }

    signupInputChangedHandler = (event, inputIdentfier) => {
        const updatedSignupForm = {
            ...this.state.signupForm
        };
        const updatedFormElement = { ...updatedSignupForm[inputIdentfier] };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedSignupForm[inputIdentfier] = updatedFormElement;

        let formIsValid = true;

        for (let inputIdentfier in updatedSignupForm) {
            formIsValid = updatedSignupForm[inputIdentfier].valid && formIsValid
        }
        this.setState({ signupForm: updatedSignupForm, signupFormIsValid: formIsValid });
    }

    checkValidity = (value, rules) => {
        let isValid = true;
        if (rules.required) isValid = value.trim() !== '' && isValid;
        if (rules.minLength) isValid = value.length >= rules.minLength && isValid;
        if (rules.maxLength) isValid = value.length <= rules.maxLength && isValid;
        return isValid;
    }

    render() {
        const activeStyle = {
            color: '#fa923f',
            textDecoration: 'underline'
        };
        let loginForm = [];
        let signupForm = [];
        for (let key in this.state.loginForm) {
            loginForm.push({
                id: key,
                config: this.state.loginForm[key]
            })
        }
        for (let key in this.state.signupForm) {
            signupForm.push({
                id: key,
                config: this.state.signupForm[key]
            })
        }

        const login = (
            <React.Fragment>
                <h4 style={{ color: "white" }}>login</h4>
                <form onSubmit={this.loginHandler}>
                    {loginForm.map((formElement) => <Input
                        touched={formElement.config.touched}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        changed={(event) => this.loginInputChangedHandler(event, formElement.id)}
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.elementConfig.value}
                    />
                    )}
                    <Button
                        onClick={this.loginHandler}
                        disabled={!this.state.loginFormIsValid}>LOGIN</Button>
                </form>
            </React.Fragment>
        );

        const signup = (
            <React.Fragment>
                <h4 style={{ color: "white" }}>Sign-up</h4>
                <form>
                    {signupForm.map((formElement) => {
                        return <Input
                            touched={formElement.config.touched}
                            invalid={!formElement.config.valid}
                            shouldValidate={formElement.config.validation}
                            changed={(event) => this.signupInputChangedHandler(event, formElement.id)}
                            key={formElement.id}
                            elementType={formElement.config.elementType}
                            elementConfig={formElement.config.elementConfig}
                            value={formElement.config.elementConfig.value}
                        />
                    })}
                    <Button
                        disabled={!this.state.signupFormIsValid}>SIGN-UP</Button>
                </form>
            </React.Fragment>

        );


        return (
            <div>
                <header>
                    <nav>
                        <ul>
                            <li>
                                <NavLink
                                    to="/login/"
                                    exact
                                    activeClassName="my-active"
                                    activeStyle={activeStyle}>
                                    Login
                                </NavLink></li>
                            <li>
                                <NavLink
                                    to="/signup/"
                                    activeStyle={activeStyle}>
                                    Sign-up
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                </header>
                <Switch>
                    <Route path="/login" render={() => login} />
                    <Route path="/signup" render={() => signup} />
                    <Redirect from="/" to="/login" />
                    {/* <Route path="/" component={Posts} /> */}
                </Switch>
            </div>
        );
    }
};

export default withCookies(LoginSignup);