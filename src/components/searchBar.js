import React from "react";
import update from 'immutability-helper';
import "font-awesome/css/font-awesome.min.css";
import styles from "./search.module.css";
import SearchResults from "./searchResults";
import DataManager from "../utils/dataManager";
import LocalStorage from "../utils/localStorage";

const KEYBOARD = {
  ENTER: 13
};

let ignore = true;

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

    this.setState({ searchResults: entries });
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

  update = () => {
    const loadFavorites = LocalStorage.obtain("favorites");
    const currentResults = [...this.state.searchResults];
    let updatedResults = [];
    let theSame = [];
    let index = 0;

    console.log(loadFavorites);

    //look through current search results
    currentResults.forEach(entry => {
      let toUpdate = false;

      //for each search results compare to the saved favorites
      loadFavorites.forEach(favorite => {
        //if the names are not the same the result is no longer favorited
        if(entry.title.localeCompare(favorite.title) !== 0)
        {
          toUpdate = true;
        }
      });

      if(toUpdate === true){
        updatedResults.push(entry); //create new entry
        //this.setState({searchResults[index]: })

      } else {
       // updatedResults.push(currentResults[index]);
      }

      index++;
    });

    console.log(updatedResults);

    //reset search results and update
    //this.setState({searchResults: updatedResults});
    //this.setState({searchResults: []}, () => {this.setState({searchResults: updatedResults});});
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
        <SearchResults searchResults={this.state.searchResults} update={this.update}/>
      </div>
    );
  }
}

export default SearchBar;
