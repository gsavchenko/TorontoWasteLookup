import React from "react";
import Trie from "../utils/trie";
import styles from "./searchResults.module.css";
import FavoriteStar from "../components/favoriteStar";

var words = new Trie();

class SearchResults extends React.Component {
  constructor() {
    super();

    if (typeof window !== "undefined") {
      let storedFavorites = JSON.parse(localStorage.getItem("favorites"));

      if (storedFavorites === null) {
        storedFavorites = [];
      }

      this.state = {
        search: "",
        favorites: storedFavorites
      };
    }
  }

  htmlDecode(input) {
    var e = document.createElement("div");
    e.innerHTML = input;
    return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.searchQuery !== nextProps.searchQuery) {
      return true;
    }
    if (this.state.favorites !== nextState.favorites) {
      return true;
    } else {
      return false;
    }
  }

  loadFavorites() {
    if (typeof window !== "undefined") {
      const loadFavorites = localStorage.getItem("favorites");

      if (loadFavorites !== null) {
        this.setState({
          favorites: JSON.parse(loadFavorites)
        });
      }
    }
  }

  componentDidMount() {
    const data = this.props.data;

    Object.keys(data).forEach(keyword => {
      words.insert(keyword);
    });
  }

  renderItem(query) {
    return query.map((results, key) => (
      <div className={`${styles.row} ${styles.container}`} key={key}>
        <div className={`${styles.column} ${styles.star}`}>
          <FavoriteStar
            title={this.props.data[results].title}
            desc={this.props.data[results].body}
            saveFavorite={this.saveFavorite}
            unSaveFavorite={this.unSaveFavorite}
          />
        </div>
        <div
          className={`${styles.column} ${styles.left}`}
          dangerouslySetInnerHTML={{
            __html: this.htmlDecode(this.props.data[results].title)
          }}
        />
        <div
          className={`${styles.column} ${styles.right}`}
          dangerouslySetInnerHTML={{
            __html: this.htmlDecode(this.props.data[results].body)
          }}
        />
      </div>
    ));
  }

  commitChange = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("favorites", JSON.stringify(this.state.favorites));
    }
  };

  saveFavorite = item => {
    let toUpdate = this.state.favorites.slice();
    toUpdate.push(item);

    this.setState(
      {
        favorites: toUpdate
      },
      () => this.commitChange()
    );
  };

  unSaveFavorite = item => {
    let toUpdate = this.state.favorites.slice();
    toUpdate.push(item);

    if (typeof window !== "undefined") {
      let loadFavorites = localStorage.getItem("favorites");

      let index = 0;
      let itemLocation = 0;

      if (loadFavorites !== null) {
        loadFavorites = JSON.parse(loadFavorites);

        loadFavorites.forEach(itemSaved => {
          if (item.title.localeCompare(itemSaved.title) === 0) {
            itemLocation = index;
          }

          index++;
        });
      }

      toUpdate.splice(itemLocation);

      this.setState(
        {
          favorites: toUpdate
        },
        () => this.commitChange()
      );
    }
  };

  renderSavedItems = () => {
    return this.state.favorites.map((favorite, key) => (
      <div className={`${styles.row} ${styles.container}`} key={key}>
        <div className={`${styles.column} ${styles.star}`}>
          <FavoriteStar
            title={favorite.title}
            desc={favorite.desc}
            saveFavorite={this.saveFavorite}
            unSaveFavorite={this.unSaveFavorite}
          />
        </div>
        <div className={`${styles.column} ${styles.left}`}>
          {favorite.title}
        </div>
        <div
          className={`${styles.column} ${styles.right}`}
          dangerouslySetInnerHTML={{
            __html: this.htmlDecode(favorite.desc)
          }}
        />
      </div>
    ));
  };

  renderFavorites() {
    if (this.state != null) {
      if (this.state.favorites.length > 0) {
        return (
          <div>
            Favorites <div>{this.renderSavedItems()}</div>
          </div>
        );
      }
    }
  }

  render() {
    const searchResult = words.search(this.props.searchQuery);
    return (
      <div>
        {this.renderItem(searchResult)}
        {this.renderFavorites()}
      </div>
    );
  }
}

export default SearchResults;
