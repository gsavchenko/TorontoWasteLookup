class node {
  constructor(key) {
    this.key = key; //character in sequence
    this.parent = null;
    this.children = {};
    this.endOfWord = false;
  }

  //itterate through parents to get word
  getWord() {
    let output = [];
    let node = this;

    while (node !== null) {
      output.unshift(node.key);
      node = node.parent;
    }

    return output.join("");
  }
}

export default node;
