import React from "react";
import "font-awesome/css/font-awesome.min.css";
import styles from "./search.module.css";
import SearchResults from "../components/searchResults";

var keywordDictionary = {};

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
      searchQuery: ""
    };

    this.mapData(this.props.JSONData);
  }

  mapData = data => {
    const wasteWizardData = data.allWastewizardJson.edges;

    Object.keys(wasteWizardData).forEach(key => {
      let strtok = wasteWizardData[key].node.keywords.toLowerCase().split(",");
      strtok = strtok.map(key => key.trim()); //remove spaces in keywords

      const wasteEntry = wasteWizardData[key].node;
      strtok.forEach(key => {
        keywordDictionary[key] = wasteEntry;
      });
    });
  };

  submitSearch = query => {
    this.setState({ searchQuery: query.toLowerCase() });
  };

  handleChange = event => {
    this.setState({ inputValue: event.target.value });
    if (event.target.value === "") {
      this.submitSearch("nothing");
    }
  };

  keyPress = event => {
    if (event.keyCode === 13) {
      this.submitSearch(event.target.value);
    }
  };

  render() {
    return (
      <div>
        <div className={styles.searchContainer}>
          <input
            value={this.state.inputValue}
            onKeyDown={this.keyPress}
            onChange={this.handleChange}
            className="searchElement"
            type="text"
            placeholder="Search..."
            name="search"
          />
          <button
            className="searchElement"
            onClick={() => this.submitSearch(this.state.inputValue)}
          >
            <i className="fa fa-search fa-2x" />
          </button>
        </div>
        <SearchResults
          data={keywordDictionary}
          searchQuery={this.state.searchQuery}
        />
      </div>
    );
  }
}

export default Search;
