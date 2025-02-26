/* storage.js */

// Local Storage Helper Functions

function getFromLocalStorage(key) {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    } catch (error) {
        console.error(`Error retrieving data from local storage for key: ${key}`, error);
        return null;
    }
}

function saveToLocalStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
        console.error(`Error saving data to local storage for key: ${key}`, error);
    }
}

function removeFromLocalStorage(key) {
    try {
        localStorage.removeItem(key);
    } catch (error) {
        console.error(`Error removing data from local storage for key: ${key}`, error);
    }
}

function clearLocalStorage() {
    try {
        localStorage.clear();
    } catch (error) {
        console.error("Error clearing local storage", error);
    }
}

function getKeysFromLocalStorage() {
  try {
    const keys = [];
    for (let i = 0; i < localStorage.length; i++) {
      keys.push(localStorage.key(i));
    }
    return keys;
  } catch (error) {
    console.error("Error getting keys from local storage", error);
    return [];
  }
}