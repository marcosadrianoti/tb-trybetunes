import React from 'react';
import PropTypes from 'prop-types';
import CardAlbum from './CardAlbum';

class AlbunsList extends React.Component {
  render() {
    const { artistArr } = this.props;
    return (
      artistArr.map((album) => (

        <CardAlbum key={ album.collectionId } album={ album } />
        // <p key={ album.collectionId }>{album.artworkUrl100}</p>
      ))
    );
  }
}

AlbunsList.propTypes = {
  artistArr: PropTypes.arrayOf(PropTypes.shape({
    artistId: PropTypes.number.isRequired,
    artistName: PropTypes.string.isRequired,
    collectionId: PropTypes.number.isRequired,
    collectionName: PropTypes.string.isRequired,
    collectionPrice: PropTypes.number.isRequired,
    artworkUrl100: PropTypes.string.isRequired,
    releaseDate: PropTypes.string.isRequired,
    trackCount: PropTypes.number.isRequired,
  })).isRequired,
};

export default AlbunsList;
