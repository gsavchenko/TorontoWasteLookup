import React from "react";

class FavoriteStar extends React.Component {
  constructor() {
    super();

    this.state = {
      title: "",
      desc: "",
      color: "grey"
    };
  }

  checkSaved = () => {
    let loadFavorites = localStorage.getItem("favorites");
    let isSaved = false;

    if (loadFavorites !== null) {
      loadFavorites = JSON.parse(loadFavorites);

      loadFavorites.forEach(item => {
        if (this.state.title.localeCompare(item.title) === 0) {
          isSaved = true;
        }
      });
    }

    if (isSaved === true) {
      this.setState({ color: "#56ca90" });
    }
  };

  toggleFavorite = () => {
    this.forceUpdate();
    if (this.state.color === "grey") {
      this.setState({
        color: "#56ca90"
      });

      this.props.saveFavorite({
        title: this.state.title,
        desc: this.state.desc
      });
    } else {
      this.setState({
        color: "grey"
      });
      this.props.unSaveFavorite({
        title: this.state.title,
        desc: this.state.desc
      });
    }
  };

  componentDidMount() {
    this.setState(
      {
        title: this.props.title,
        desc: this.props.desc
      },
      () => this.checkSaved()
    );
  }

  render() {
    return (
      <div onClick={this.toggleFavorite}>
        <i className={`fa fa-star`} style={{ color: this.state.color }} />
      </div>
    );
  }
}

export default FavoriteStar;
