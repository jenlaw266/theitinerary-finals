const addDescription = (name, places) => {
  for (const place of places) {
    if (name === place.name) {
      return place.description;
    }
  }
};

module.exports = addDescription;