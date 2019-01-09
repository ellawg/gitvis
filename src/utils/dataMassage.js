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

const formatLangData = result => {
  // Convert the result object to the matrix that the chordchart needs
  return {
    chordData: Object.values(result).map(lang => {
      const { otherLangs } = lang;
      let otherLangsArray = [];
      // Make sure that otherLangs contains all languages, even if 0, and convert to array at the same time
      Object.values(result).forEach(({ id }) => {
        if (otherLangs[id]) {
          otherLangsArray.push(otherLangs[id].count);
        } else {
          otherLangsArray.push(0);
        }
      });
      return otherLangsArray;
    }),
    // Convert the result object to an array
    rawData: Object.values(result)
  };
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
  // Format data before returing it
  return formatLangData(result);
};

const topics = searchResults => {
  return searchResults;
};

export { languages, topics };
