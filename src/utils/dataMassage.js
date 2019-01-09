const countOtherLangs = (self, edges) => {
  const { otherLangs } = self;
  edges.forEach(({ node }) => {
    const { id, name } = node;
    if (id === self.id) {
      return;
    }
    if (otherLangs[id]) {
      otherLangs[id].count++;
    } else {
      otherLangs[id] = {
        id,
        name,
        count: 1
      };
    }
  });
  return otherLangs;
};

const formatChordData = rawData => {
  // Convert the result object to the matrix that the chordchart needs
  return rawData.map(lang => {
    const { otherLangs } = lang;
    let otherLangsArray = [];
    // Make sure that otherLangs contains all languages, even if 0, and convert to array at the same time
    rawData.forEach(({ id }) => {
      if (otherLangs[id]) {
        otherLangsArray.push(otherLangs[id].count);
      } else {
        otherLangsArray.push(0);
      }
    });
    return otherLangsArray;
  });
};

const languages = ({ edges }) => {
  const result = {};
  // Loop through repos
  edges.forEach(edge => {
    const { edges } = edge.node.languages;
    // Loop through languages for the repo
    edges.forEach(({ node }) => {
      const { id, name, color } = node;
      if (result[id]) {
        result[id].count++;
      } else {
        result[id] = {
          count: 1,
          otherLangs: {},
          name,
          color,
          id
        };
      }
      // Look up what other languages this repo contains
      result[id].otherLangs = countOtherLangs(result[id], edges);
    });
  });
  // Convert the result object to an array
  return Object.values(result);
};

const topics = searchResults => {
  return searchResults;
};

export { languages, topics, formatChordData };
