import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import ListCards from '../components/ListCards';
import getMusics from '../services/musicsAPI';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';

class Album extends React.Component {
  state = {
    musicArr: [],
    favoriteSongs: [],
    isLoading: false,
  };

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.musics(id);
  }

  musics = async (id) => {
    this.setState({
      isLoading: true,
    });
    const musics = await getMusics(id);
    const favorites = await getFavoriteSongs();
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
            <div data-testid="page-album">
              <Header />
              {musicArr.length > 0
          && <ListCards musics={ musicArr } favorites={ favoriteSongs } />}
            </div>
          )
      )
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default Album;
