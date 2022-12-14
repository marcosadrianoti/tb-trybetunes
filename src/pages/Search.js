import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  state = {
    // artistName: '',
    artistNameLength: false,
  };

  validationArtist = (e) => {
    const lengthMin = 2;
    this.setState({
      // artistName: e.target.value,
      artistNameLength: e.target.value.length >= lengthMin,
    });
  };

  render() {
    const { artistNameLength } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <input
          type="text"
          name="artist-name"
          data-testid="search-artist-input"
          onChange={ this.validationArtist }
        />
        <button
          type="button"
          data-testid="search-artist-button"
          disabled={ !artistNameLength }
          // onClick={}
        >
          Pesquisar
        </button>
      </div>
    );
  }
}

export default Search;
