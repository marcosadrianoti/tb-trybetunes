import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class CardAlbum extends React.Component {
  render() {
    const { album } = this.props;
    const urlAlbum = `/album/${album.collectionId}`;
    return (
      <div>
        <p>{ album.artistId }</p>
        <p>{ album.artistName }</p>
        <p>{ album.collectionId }</p>
        <p>{ album.collectionPrice }</p>
        <img src={ album.artworkUrl100 } alt={ album.collectionName } />
        <p>{ album.releaseDate }</p>
        <p>{ album.trackCount }</p>
        <Link to={ urlAlbum } data-testid={ `link-to-album-${album.collectionId}` }>
          {album.collectionName}
        </Link>
      </div>
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
