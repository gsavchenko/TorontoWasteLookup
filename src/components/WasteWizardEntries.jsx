import React from "react";
import DangerousHTML from "./dangerousHTML";
import FavoriteStar from "../components/favoriteStar";
import styles from "./searchResults.module.css";

class WasteWizardEntries extends React.Component {
  renderStar(favorite) {
    return (
      <div className={`${styles.column} ${styles.star}`}>
        <FavoriteStar
          title={favorite.title}
          desc={favorite.desc}
          update={this.props.update}
        />
      </div>
    );
  }

  renderEntryTitle(title) {
    return <div className={`${styles.column} ${styles.left}`}>{title}</div>;
  }

  renderEntryDescription(desc) {
    return (
      <DangerousHTML
        style={`${styles.column} ${styles.right}`}
        content={desc}
      />
    );
  }

  renderEntries() {
    return this.props.entries.map((entry, key) => (
      <div key={key} className={`${styles.row} ${styles.container}`}>
        {this.renderStar(entry)}
        {this.renderEntryTitle(entry.title)}
        {this.renderEntryDescription(entry.desc)}
      </div>
    ));
  }

  render() {
    return this.renderEntries();
  }
}

export default WasteWizardEntries;
