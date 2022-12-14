import React from 'react';
import { Redirect } from 'react-router-dom';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  state = {
    userName: '',
    userNameLength: false,
    isLoading: false,
    isLoged: false,
  };

  validationUser = (e) => {
    const lengthMin = 3;
    this.setState({
      userName: e.target.value,
      userNameLength: e.target.value.length >= lengthMin,
    });
  };

  savingUser = async (userName) => {
    this.setState({
      isLoading: true,
    });
    await createUser({ name: `${userName}` });
    this.setState({
      isLoading: false,
      isLoged: true,
    });
  };

  render() {
    const { userNameLength, userName, isLoading, isLoged } = this.state;
    return (
      <div data-testid="page-login">
        { isLoged && <Redirect to="/search" /> }
        {
          (
            isLoading
              ? <Loading />
              : (
                <label htmlFor="user-name">
                  Nome
                  <input
                    type="text"
                    name="user-name"
                    data-testid="login-name-input"
                    onChange={ this.validationUser }
                  />
                  <button
                    type="button"
                    data-testid="login-submit-button"
                    disabled={ !userNameLength }
                    onClick={ () => this.savingUser(userName) }
                  >
                    Entrar
                  </button>
                </label>
              )
          )
        }
      </div>
    );
  }
}

export default Login;
