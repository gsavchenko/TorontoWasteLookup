import React from "react";
import WasteWizardEntries from "./WasteWizardEntries";
import LocalStorage from "../utils/localStorage";

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
    if (this.state.favorites !== undefined) {
      if (this.state.favorites.length > 0) {
        return (
          <h1 style={{ color: `#56ca90`, marginTop: `20px` }}>Favorites</h1>
        );
      }
    }
  }

  update = () => {
    const loadFavorites = LocalStorage.obtain("favorites");
    //leave it like this important
    this.setState({ favorites: [] }, () =>
      this.setState({ favorites: loadFavorites })
    );
    this.props.update();
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
