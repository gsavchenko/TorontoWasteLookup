import React from "react";
import WasteWizardEntries from "./WasteWizardEntries";
import Favorites from "./favorites";
import LocalStorage from "../utils/localStorage";;

class SearchResults extends React.Component {
  constructor() {
    super();

    this.state = {
      search: "",
      favorites: LocalStorage.obtain("favorites", { createIfMissing: true })
    };
  }

  update = () => {
    const loadFavorites = LocalStorage.obtain("favorites");
    this.setState({ favorites: loadFavorites });
  };

  updateSearchResults = () => {
    this.props.update();
  }

  render() {
    return (
      <div>
        <WasteWizardEntries entries={this.props.searchResults} update={this.update} />
        <Favorites entries={this.state.favorites} update={this.update}/>
      </div>
    );
  }
}

export default SearchResults;
