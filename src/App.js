import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';
import { createUser } from './services/userAPI';

class App extends React.Component {
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
      <BrowserRouter>
        <p>TrybeTunes...</p>
        <Switch>
          <Route path="/search" component={ Search } />
          <Route path="/album/:id" component={ Album } />
          <Route path="/favorites" component={ Favorites } />
          <Route path="/profile/edit" component={ ProfileEdit } />
          <Route path="/profile" component={ Profile } />
          <Route
            path="/"
            render={ () => (
              isLoged
                ? <Redirect to="/search" />
                : (
                  <Login
                    userName={ userName }
                    userNameLength={ userNameLength }
                    isLoading={ isLoading }
                    validationUser={ this.validationUser }
                    savingUser={ this.savingUser }
                  />
                )
            ) }
          />
          <Route path="*" component={ NotFound } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
