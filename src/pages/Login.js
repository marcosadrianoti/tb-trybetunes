import React from 'react';
import PropTypes from 'prop-types';
import Loading from '../components/Loading';

class Login extends React.Component {
  render() {
    const {
      validationUser,
      userNameLength,
      userName,
      isLoading,
      savingUser,
    } = this.props;
    return (
      <div data-testid="page-login">
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
                    onChange={ validationUser }
                  />
                  <button
                    type="button"
                    data-testid="login-submit-button"
                    disabled={ !userNameLength }
                    onClick={ () => (savingUser(userName)) }
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

Login.propTypes = {
  validationUser: PropTypes.func.isRequired,
  savingUser: PropTypes.func.isRequired,
  userNameLength: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  userName: PropTypes.string.isRequired,
};

export default Login;
