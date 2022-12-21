import React from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { addSong, removeSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  state = {
    isLoading: false,
    isChecked: false,
    isFavorite: false,
    show: true,
  };

  componentDidMount() {
    const { favorite } = this.props;
    if (favorite) {
      this.setState({
        isChecked: favorite,
        isFavorite: favorite,
      });
    }
  }

  handleOnChange = (track, isFavorite, islistingFavoritesSongs) => {
    if (isFavorite === true) {
      this.setState({
        isLoading: true,
        isChecked: false,
        isFavorite: false,
      }, async () => {
        await removeSong(track);
        this.setState({
          isLoading: false,
          show: !islistingFavoritesSongs,
        });
      });
    }
    if (isFavorite === false) {
      this.setState({
        isLoading: true,
        isChecked: true,
        isFavorite: true,
      }, async () => {
        await addSong(track);
        this.setState({
          isLoading: false,
        });
      });
    }
  };

  render() {
    const { trackName, previewUrl, trackId, track, islistingFavoritesSongs } = this.props;
    const { isLoading, isChecked, isFavorite, show } = this.state;
    return (
      (
        isLoading
          ? <Loading />
          : (
            show && (
              <div>
                <h4>{ trackName }</h4>
                <audio data-testid="audio-component" src={ previewUrl } controls>
                  <track kind="captions" />
                </audio>
                <label htmlFor="check">
                  <input
                    type="checkbox"
                    data-testid={ `checkbox-music-${trackId}` }
                    id="check"
                    onChange={ () => this.handleOnChange(
                      track,
                      isFavorite,
                      islistingFavoritesSongs,
                    ) }
                    checked={ isChecked }
                  />
                  Favorita
                </label>
              </div>

            )
          )
      )
    );
  }
}

MusicCard.propTypes = ({
  trackName: PropTypes.string,
  previewUrl: PropTypes.string,
  trackId: PropTypes.number,
}).isRequired;

export default MusicCard;
