import React from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { addSong, removeSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  state = {
    isLoading: false,
    isChecked: false,
    isFavorite: false,
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

  handleOnChange = (isInputChecked, favorite, track, isFavorite) => {
    if (isFavorite === true) {
      this.setState({
        isLoading: true,
        isChecked: false,
        isFavorite: false,
      }, async () => {
        await removeSong(track);
        this.setState({
          isLoading: false,
        });
      });
    }
    if (isInputChecked === true && favorite === false) {
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
    const { trackName, previewUrl, trackId, favorite, track } = this.props;
    const { isLoading, isChecked, isFavorite } = this.state;
    return (
      (
        isLoading
          ? <Loading />
          : (
            <>
              <h4>{ trackName }</h4>
              <audio data-testid="audio-component" src={ previewUrl } controls>
                <track kind="captions" />
              </audio>
              <label htmlFor="check">
                <input
                  type="checkbox"
                  data-testid={ `checkbox-music-${trackId}` }
                  id="check"
                  onChange={ (e) => this.handleOnChange(
                    e.target.checked,
                    favorite,
                    track,
                    isFavorite,
                  ) }
                  checked={ isChecked }
                />
                Favorita
              </label>
            </>
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
