import React from 'react';
import Header from '../components/Header';
import ListCards from '../components/ListCards';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';

class Favorites extends React.Component {
  state = {
    musicArr: [],
    favoriteSongs: [],
    isLoading: false,
  };

  componentDidMount() {
    this.musics();
  }

  musics = async () => {
    this.setState({
      isLoading: true,
    });
    const favorites = await getFavoriteSongs();
    const musics = favorites;
    this.setState({
      musicArr: musics,
      favoriteSongs: favorites,
      isLoading: false,
    });
  };

  render() {
    const { musicArr, favoriteSongs, isLoading } = this.state;
    return (
      (
        isLoading
          ? <Loading />
          : (
            <div data-testid="page-favorites">
              <Header />
              {musicArr.length > 0
          && <ListCards musics={ musicArr } favorites={ favoriteSongs } />}
            </div>
          )
      )
    );
  }
}

export default Favorites;
