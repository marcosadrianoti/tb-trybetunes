import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import ListCards from '../components/ListCards';
import getMusics from '../services/musicsAPI';

class Album extends React.Component {
  state = {
    musicArr: [],
  };

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.musics(id);
  }

  musics = async (id) => {
    const musics = await getMusics(id);
    this.setState({
      musicArr: musics,
    });
  };

  render() {
    const { musicArr } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {musicArr.length > 0 && <ListCards musics={ musicArr } />}
      </div>
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
