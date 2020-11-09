import React, { Component } from 'react';
import classes from './LoginSignup.module.css';
import Input from '../UI/Input/Input';
import API from '../../apis/url-api';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import Button from '../UI/Button/Button';

function createInputConfig(elementType, type = 'text', placeholder = '', value = null, options = null) {
    let config = {};
    if (elementType) config.elementType = elementType;
    if (type || placeholder) config.elementConfig = { type, placeholder };
    if (value) {
        if (config.elementConfig) config.elementConfig.value = value;
        else config.elementConfig = { value };
    }
    if (options) config.elementConfig.options = options;
    return config;
}

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
                name: createInputConfig('input', 'text', 'Your Name'),
                email: createInputConfig('input', 'email', 'Your Email'),
                password: createInputConfig('input', 'password', 'Set your password'),
                confirmPassword: createInputConfig('input', 'password', 'Confirm your password'),
            },
            loginForm: {
                email: createInputConfig('input', 'email', 'Your Email'),
                password: createInputConfig('input', 'password', 'Your password'),
            }
        }
    }

    loginHandler = (event) => {
        event.preventDefault();
        API.login(this.state.loginForm.email.value, this.state.loginForm.password.value).then((response) => {
            console.log('dasdasdasdadad:::>>> ', response);
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
        updatedLoginForm[inputIdentfier] = updatedFormElement;
        this.setState({ loginForm: updatedLoginForm });
    }

    signupInputChangedHandler = (event, inputIdentfier) => {
        const updatedSignupForm = {
            ...this.state.signupForm
        };
        const updatedFormElement = { ...updatedSignupForm[inputIdentfier] };
        updatedFormElement.value = event.target.value;
        updatedSignupForm[inputIdentfier] = updatedFormElement;
        this.setState({ signupForm: updatedSignupForm });
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
                    changed={(event) => this.loginInputChangedHandler(event, formElement.id)}
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.elementConfig.value}
                />
                )}
                <Button btnType="Action">LOGIN</Button>
            </form>
        );

        let signup = (
            <form>
                {signupForm.map((formElement) => {
                    return <Input
                        changed={(event) => this.signupInputChangedHandler(event, formElement.id)}
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.elementConfig.value}
                    />
                })}
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