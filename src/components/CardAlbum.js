import React from 'react';
import PropTypes from 'prop-types';

class CardAlbum extends React.Component {
  render() {
    const { album } = this.props;
    return (
      <>
        <p>{ album.artistName }</p>
        <img src={ album.artworkUrl100 } alt="Capa do Album" />
        <p>{ album.artistId }</p>
        <p>{ album.collectionId }</p>
        <p>{ album.collectionName }</p>
        <p>{ album.collectionPrice }</p>
        <p>{ album.releaseDate }</p>
        <p>{ album.trackCount }</p>
      </>
    );
  }
}

CardAlbum.propTypes = {
  album: PropTypes.shape({
    artistId: PropTypes.number,
    artistName: PropTypes.string,
    collectionId: PropTypes.number,
    collectionName: PropTypes.string,
    collectionPrice: PropTypes.number,
    artworkUrl100: PropTypes.string,
    releaseDate: PropTypes.string,
    trackCount: PropTypes.number,
  }).isRequired,
};

export default CardAlbum;
