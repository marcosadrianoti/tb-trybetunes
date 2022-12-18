import React from 'react';
import PropTypes from 'prop-types';
import MusicCard from './MusicCard';

class ListCards extends React.Component {
  isFavorite = (favorites, trackId) => favorites
    .map((fav) => fav.trackId)
    .includes(trackId);

  render() {
    const { musics, favorites } = this.props;
    return (
      <div>
        <section>
          <h2 data-testid="artist-name">{ musics[0].artistName }</h2>
          <h3 data-testid="album-name">{ musics[0].collectionName }</h3>
          { musics.filter((_music, index) => index !== 0).map((track) => (
            <div key={ track.trackId }>
              <MusicCard
                trackName={ track.trackName }
                previewUrl={ track.previewUrl }
                trackId={ track.trackId }
                favorite={ this.isFavorite(favorites, track.trackId) }
                track={ track }
              />
            </div>
          ))}
        </section>
      </div>
    );
  }
}

ListCards.propTypes = {
  musics: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.object]),
  ).isRequired,
  favorites: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.object]),
  ).isRequired,
};

export default ListCards;
