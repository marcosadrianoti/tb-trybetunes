import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  state = {
    userName: '',
    isLoading: false,
  };

  componentDidMount() {
    this.getUserName();
  }

  getUserName = async () => {
    this.setState({
      isLoading: true,
    });
    const response = await getUser();
    this.setState({
      userName: response.name,
      isLoading: false,
    });
  };

  render() {
    const { userName, isLoading } = this.state;
    return (
      <header data-testid="header-component">
        { isLoading && <Loading /> }
        <h1 data-testid="header-user-name">
          { userName }
          <ul>
            <li>
              <Link to="/search" data-testid="link-to-search">
                Search
              </Link>
            </li>
            <li>
              <Link to="/favorites" data-testid="link-to-favorites">
                Favorites
              </Link>
            </li>
            <li>
              <Link to="/profile" data-testid="link-to-profile">
                Profile
              </Link>
            </li>
          </ul>
        </h1>
      </header>
    );
  }
}

export default Header;
