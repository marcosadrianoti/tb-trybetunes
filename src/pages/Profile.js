import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';

class Profile extends React.Component {
  state = {
    name: '',
    email: '',
    image: '',
    description: '',
  };

  componentDidMount() {
    this.userProfile();
  }

  userProfile = async () => {
    this.setState({
    });
    const user = await getUser();
    this.setState({
      name: user.name,
      email: user.email,
      image: user.image,
      description: user.description,
    });
  };

  render() {
    const { name, email, image, description } = this.state;
    return ((
      <div data-testid="page-profile">
        <Header />
        <img src={ image } alt={ name } data-testid="profile-image" />
        <p>{ name }</p>
        <p>{ email }</p>
        <p>{ description }</p>
        <Link to="/profile/edit">Editar perfil</Link>
      </div>
    ));
  }
}

export default Profile;
