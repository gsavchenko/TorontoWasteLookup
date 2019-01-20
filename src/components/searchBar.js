import React from "react";
import "font-awesome/css/font-awesome.min.css";
import styles from "../css/search.module.css";
import SearchResults from "./SearchResults";
import DataManager from "../utils/dataManager";
import LocalStorage from "../utils/localStorage";

const KEYBOARD = {
  ENTER: 13
};

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      searchResults: []
    };
  }

  titlesToEntries(entryTitles) {
    return entryTitles.map(title => {
      return {
        title: title,
        desc: DataManager.keywordDictionary[title].body
      };
    });
  }

  submitSearch = searchQuery => {
    const results = DataManager.keywords.search(searchQuery.toLowerCase());
    const entries = this.titlesToEntries(results);

    if (searchQuery === "") {
      this.submitNoResults();
    } else if (
      entries.length === 0 &&
      searchQuery.localeCompare("default") !== 0
    ) {
      this.submitNoResults();
    } else {
      this.setState({ searchResults: entries });
    }
  };

  handleChange = event => {
    this.setState({ input: event.target.value });
    if (event.target.value === "") {
      this.clearSearchResults();
    }
  };

  keyPress = event => {
    if (event.keyCode === KEYBOARD.ENTER) {
      this.submitSearch(event.target.value);
    }
  };

  clearSearchResults() {
    this.submitSearch("default");
  }

  submitNoResults() {
    this.setState({
      searchResults: [
        { title: "Oh no :(", desc: "No results for this query, try again!" }
      ]
    });
  }

  /**
   * update search results when 'favorites' stars clicked
   * remove the entries that don't need to be updated, update the state, then update back to original
   */
  update = () => {
    const loadFavorites = LocalStorage.obtain("favorites");
    const currentResults = [...this.state.searchResults];
    const updatedResults = [];

    currentResults.forEach(entry => {
      let toUpdate = true;

      loadFavorites.forEach(storedEntry => {
        if (storedEntry.title.localeCompare(entry.title) === 0) {
          toUpdate = false;
        }
      });

      if (toUpdate === false) {
        updatedResults.push(entry);
      }
    });

    this.setState({ searchResults: updatedResults }, () =>
      this.setState({ searchResults: currentResults })
    );
  };

  render() {
    return (
      <div>
        <div className={styles.row}>
          <input
            value={this.state.input}
            onKeyDown={this.keyPress}
            onChange={this.handleChange}
            className={`${styles.column} ${styles.left}`}
            type="text"
            placeholder="Search..."
            name="search"
          />
          <button
            className={`${styles.column} ${styles.right}`}
            onClick={() => this.submitSearch(this.state.input)}
          >
            <i className="fa fa-search fa-2x" />
          </button>
        </div>
        <SearchResults
          searchResults={this.state.searchResults}
          update={this.update}
        />
      </div>
    );
  }
}

export default SearchBar;
