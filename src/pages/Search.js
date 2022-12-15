import React from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  state = {
    artistName: '',
    artistNameLength: false,
    isLoading: false,
    artistArr: [],
    foundArtist: '',
  };

  validationArtist = (e) => {
    const lengthMin = 2;
    this.setState({
      artistName: e.target.value,
      artistNameLength: e.target.value.length >= lengthMin,
    });
  };

  getAlbuns = (artistName) => {
    this.setState({
      isLoading: true,
    }, async () => {
      const albuns = await searchAlbumsAPI(artistName);
      this.setState({
        isLoading: false,
        foundArtist: albuns.length !== 0 ? artistName : false,
        artistName: '',
        artistArr: [...albuns],
      });
    });
  };

  render() {
    const {
      artistNameLength,
      artistName,
      isLoading,
      foundArtist,
      artistArr,
    } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        {
          (
            isLoading
              ? <Loading />
              : (
                <>
                  <input
                    type="text"
                    name="artist-name"
                    value={ artistName }
                    data-testid="search-artist-input"
                    onChange={ this.validationArtist }
                  />
                  <button
                    type="button"
                    data-testid="search-artist-button"
                    disabled={ !artistNameLength }
                    onClick={ () => this.getAlbuns(artistName) }
                  >
                    Pesquisar
                  </button>
                  <h3>
                    {
                      artistArr.length !== 0 && `Resultado de álbuns de: ${foundArtist}`
                    }
                    {
                      foundArtist === false && 'Nenhum álbum foi encontrado'
                    }
                  </h3>
                </>
              )
          )
        }

      </div>
    );
  }
}

export default Search;
