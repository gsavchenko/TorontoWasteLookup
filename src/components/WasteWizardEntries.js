import React from "react";
import DangerousHTML from "./DangerousHTML";
import FavoriteStar from "./FavoriteStar";
import styles from "../css/entries.module.css";

/**
 * renders lists of waste wizard entries
 */
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
    if (this.props.entries !== undefined) {
      return this.props.entries.map((entry, key) => (
        <div key={key} className={`${styles.row} ${styles.container}`}>
          {this.renderStar(entry)}
          {this.renderEntryTitle(entry.title)}
          {this.renderEntryDescription(entry.desc)}
        </div>
      ));
    }
  }

  render() {
    return <div>{this.renderEntries()}</div>;
  }
}

export default WasteWizardEntries;
