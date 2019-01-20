import React from "react";
import LocalStorage from "../utils/localStorage";

const COLORS = {
  ON: "#56ca90",
  OFF: "grey"
};

class FavoriteStar extends React.Component {
  constructor() {
    super();

    this.state = {
      title: "",
      desc: "",
      color: COLORS.OFF,
      isActive: false
    };
  }

  componentDidMount() {
    this.setState(
      {
        title: this.props.title,
        desc: this.props.desc
      },
      () => this.initialize()
    );
  }
  
  initialize = () => {
    if (this.checkIfActivated() === true) {
      this.activate();
    }
  };

  activate() {
    this.setState({
      color: COLORS.ON,
      isActive: true
    });
  }

  deactivate() {
    this.setState({
      color: COLORS.OFF,
      isActive: false
    });
  }

  saveToLocalStorage = entry => {
    let toUpdate = LocalStorage.obtain("favorites", { createIfMissing: true });
    toUpdate.push(entry);
    LocalStorage.set("favorites", toUpdate);
  };

  deleteFromLocalStorage = entry => {
    let loadFavorites = LocalStorage.obtain("favorites");
    let toUpdate = loadFavorites.filter(entryStored => entryStored.title.localeCompare(entry.title) !== 0);

    LocalStorage.set("favorites", toUpdate);
  };

  checkIfActivated = () => {
    let isFavorited = false;

    LocalStorage.obtain("favorites", { createIfMissing: true }).forEach(
      item => {
        if (this.state.title.localeCompare(item.title) === 0) {
          isFavorited = true;
        }
      }
    );

    return isFavorited;
  };

  toggleColor = () => {
    if (this.state.isActive === false) {
      this.activate();
    } else {
      this.deactivate();
    }
  };

  toggleLocalStorage = () => {
    if (this.state.isActive === false) {
      this.saveToLocalStorage({
        title: this.state.title,
        desc: this.state.desc
      });
    } else {
      this.deleteFromLocalStorage({
        title: this.state.title,
        desc: this.state.desc
      });
    }
  };

  toggleFavorite = () => {
    this.toggleColor();
    this.toggleLocalStorage();
    this.props.update(); //update parents
  };

  render() {
    return (
        <i onClick={this.toggleFavorite} className={`fa fa-star`} style={{ color: this.state.color }} />
    );
  }
}

export default FavoriteStar;
