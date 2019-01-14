class trieNode {
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

class trie {
  constructor() {
    this.root = new trieNode(null);
  }

  //insert word into trie
  insert(word) {
    var node = this.root; // start at the root

    // for every character in the word
    for (var i = 0; i < word.length; i++) {
      // check to see if character node exists in children.
      if (!node.children[word[i]]) {
        // if it doesn't exist, we then create it.
        node.children[word[i]] = new trieNode(word[i]);

        // we also assign the parent to the child node.
        node.children[word[i]].parent = node;
      }

      // proceed to the next depth in the trie.
      node = node.children[word[i]];

      // finally, we check to see if it's the last word.
      if (i === word.length - 1) {
        // if it is, we set the end flag to true.
        node.endOfWord = true;
      }
    }
  }

  // recursive function to find all words in the given node.
  findAllWords(node, arr) {
    // base case, if node is at a word, push to output
    if (node.endOfWord) {
      arr.unshift(node.getWord());
    }

    // iterate through each children, call recursive findAllWords
    for (var child in node.children) {
      this.findAllWords(node.children[child], arr);
    }
  }

  // returns every word with given prefix
  search(prefix) {
    var node = this.root;
    var output = [];

    // for every character in the prefix
    for (var i = 0; i < prefix.length; i++) {
      // make sure prefix actually has words
      if (node.children[prefix[i]]) {
        node = node.children[prefix[i]];
      } else {
        // there's none. just return it.
        return output;
      }
    }

    // recursively find all words in the node
    this.findAllWords(node, output);

    return output;
  }
}

export default trie;
