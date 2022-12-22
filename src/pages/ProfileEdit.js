import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends React.Component {
  state = {
    name: '',
    email: '',
    image: '',
    description: '',
    disabledButton: true,
  };

  componentDidMount() {
    this.userProfile();
  }

  userProfile = async () => {
    const user = await getUser();
    this.setState({
      name: user.name,
      email: user.email,
      image: user.image,
      description: user.description,
    });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => { this.validationFields(); });
  };

  validationFields = () => {
    const { name, email, image, description } = this.state;
    let validated = name === '' || email === '' || image === '' || description === '';
    const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    if (regex.test(email) === false) { validated = true; }
    this.setState({
      disabledButton: validated,
    });
  };

  savingUser = async () => {
    const { history } = this.props;
    const { name, email, image, description } = this.state;
    await updateUser({
      name,
      email,
      image,
      description,
    });
    history.push('/profile');
  };

  render() {
    const {
      name,
      email,
      image,
      description,
      disabledButton,
    } = this.state;
    return (
      (
        <div data-testid="page-profile-edit">
          <Header />
          <form>
            <p>Editar perfil</p>
            <label htmlFor="name">
              Nome
              <input
                type="text"
                name="name"
                value={ name }
                data-testid="edit-input-name"
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="email">
              Email
              <input
                type="text"
                name="email"
                value={ email }
                data-testid="edit-input-email"
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="description">
              Descrição
              <input
                type="text"
                name="description"
                value={ description }
                data-testid="edit-input-description"
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="image">
              Imagem
              <input
                type="text"
                name="image"
                value={ image }
                data-testid="edit-input-image"
                onChange={ this.handleChange }
              />
            </label>
            <button
              type="button"
              data-testid="edit-button-save"
              disabled={ disabledButton }
              onClick={ this.savingUser }
            >
              Salvar
            </button>
          </form>
        </div>
      )
    );
    // );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default ProfileEdit;
