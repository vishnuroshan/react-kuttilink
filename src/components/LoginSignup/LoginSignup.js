import React, { Component } from 'react';
import classes from './LoginSignup.module.css';
import Input from '../UI/Input/Input';
import API from '../../apis/url-api';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import Button from '../UI/Button/Button';
import FormElementConfigBuilder from '../../forms/FormConfigBuilder';

// function createInputConfig(elementType, type = 'text', placeholder = '', value = null, options = null) {
//     let config = {};
//     if (elementType) config.elementType = elementType;
//     if (type || placeholder) config.elementConfig = { type, placeholder };
//     if (value) {
//         if (config.elementConfig) config.elementConfig.value = value;
//         else config.elementConfig = { value };
//     }
//     if (options) config.elementConfig.options = options;
//     return config;
// }

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
                name: new FormElementConfigBuilder('input')
                    .setValidation({ required: true, desc: 'name must not be empty' })
                    .setPlaceHolder('Your Name')
                    .build(),
                email: new FormElementConfigBuilder('input', 'email')
                    .setValidation({ required: true, desc: 'email must not be empty' })
                    .setPlaceHolder('Your Email')
                    .build(),
                password: new FormElementConfigBuilder('input', 'password')
                    .setValidation({ required: true, desc: 'password must not be empty' })
                    .setPlaceHolder('Set your password')
                    .build(),
                confirmPassword: new FormElementConfigBuilder('input', 'password')
                    .setValidation({ required: true, desc: 'passwords must match' })
                    .setPlaceHolder('Confirm your Password')
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
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;
    }


    render() {

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

        let login = (
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
                    disabled={!this.state.loginFormIsValid}
                    btnType="Action">LOGIN</Button>
            </form>
        );

        let signup = (
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
                    disabled={!this.state.signupFormIsValid}
                    btnType="Action">LOGIN</Button>
            </form>
        );

        return (
            <div className={classes.LoginSignup} >
                <h4 style={{ color: "white" }}>LoginSignup</h4>
                {/* {signup} */}
                {login}
            </div>
        );
    }
};

export default withCookies(LoginSignup);