import React from "react";

/**
 * utility to save data to disk
 */
class LocalStorage extends React.Component {
  static set(key, value) {
    //localStorage undefined during build
    if (typeof window !== "undefined") {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }

  static getWrapper(key) {
    //localStorage undefined during build
    if (typeof window !== "undefined") {
      return localStorage.getItem(key);
    }
  }

  // get data from disk with the option to return a new array instead of null if nothing is found
  static obtain(key, options) {
    let toObtain = this.getWrapper(key);
    let defaultOptions = { createIfMissing: false };

    if (!this.isCreateOptionEnabled(options)) {
      options = defaultOptions;
    }

    if (toObtain === null) {
      if (options.createIfMissing === true) {
        return [];
      }
    } else {
      toObtain = JSON.parse(toObtain);
    }

    return toObtain;
  }

  static isCreateOptionEnabled(options) {
    if (options !== undefined) {
      if (options.createIfMissing !== undefined) {
        return true;
      }
    }
    return false;
  }
}

export default LocalStorage;
