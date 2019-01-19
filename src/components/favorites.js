import React from "react";
import WasteWizardEntries from "./WasteWizardEntries";
import LocalStorage from "../utils/localStorage";
import update from 'immutability-helper'

class Favorites extends React.Component {
  constructor() {
    super();

    this.state = {
      favorites: LocalStorage.obtain("favorites", { createIfMissing: true })
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.entries !== prevProps.entries) {
      this.update();
    }
  }

  renderFavoritesHeader() {
    if (this.state.favorites.length > 0) {
      return <div>Favorites</div>;
    }
  }

  update = () => {
    const loadFavorites = LocalStorage.obtain("favorites");
    this.setState({ favorites: loadFavorites });
  };

  renderFavorites() {
    return (
      <WasteWizardEntries entries={this.state.favorites} update={this.update} />
    );
  }

  render() {
    return (
      <div>
        {this.renderFavoritesHeader()}
        {this.renderFavorites()}
      </div>
    );
  }
}

export default Favorites;
