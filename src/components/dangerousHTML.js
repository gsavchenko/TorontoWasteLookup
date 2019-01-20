import React from "react";

/**
 * convert text to html
 */
class DangerHTML extends React.Component {
  htmlDecode(input) {
    var e = document.createElement("div");
    e.innerHTML = input;
    return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
  }

  render() {
    return (
      <div
        className={this.props.style}
        dangerouslySetInnerHTML={{
          __html: this.htmlDecode(this.props.content)
        }}
      />
    );
  }
}

export default DangerHTML;
