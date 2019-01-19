import Trie from "../utils/trie";

/**
 * Utility class to manage the Waste Wizard Data
 */

class WasteWizardDataManager {
  /**
   * Store the keywords into a Trie for searching
   */
  static storeKeywordsInTrie() {
    Object.keys(this.keywordDictionary).forEach(keyword => {
      this.keywords.insert(keyword);
    });
  }

  /**
   * Map the keywords strings of the entries into a dictionary for faster access
   */
  static mapWasteWizardKeywords(wasteWizardJson) {
    const wasteWizardObject = wasteWizardJson.allWastewizardJson.edges;

    Object.keys(wasteWizardObject).forEach(key => {
      const wasteEntry = wasteWizardObject[key].node;

      this.sanAndTok(wasteEntry.keywords).forEach(key => {
        this.keywordDictionary[key] = wasteEntry;
      });
    });

    this.storeKeywordsInTrie();
  }

  /**
   * Convert the keyword strings to lowercase, tokenize them and trim the white spaces off the edges
   */
  static sanAndTok(keywords) {
    const toLower = keywords.toLowerCase();
    const tokenize = toLower.split(",");
    const trimTokenized = tokenize.map(key => key.trim());

    return trimTokenized;
  }
}

WasteWizardDataManager.keywordDictionary = {};
WasteWizardDataManager.keywords = new Trie();

export default WasteWizardDataManager;
