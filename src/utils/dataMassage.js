const countOtherLangs = ({ otherLangs, id: selfId }, { edges }) => {
  const count = 1;
  edges.forEach(({ node: { id, name } }) => {
    if (id === selfId) {
      return;
    }
    if (otherLangs[id]) {
      otherLangs[id].count++;
    } else {
      otherLangs[id] = {
        id,
        name,
        count
      };
    }
  });
  return otherLangs;
};

const formatChordData = languages => {
  // Convert the result object to the matrix that the chordchart needs
  return languages.map(({ otherLangs }) => {
    let otherLangsArray = [];
    // Make sure that otherLangs contains all languages, even if 0, and convert to array at the same time
    languages.forEach(({ id }) => {
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
  const count = 1;
  // Loop through repos
  edges.forEach(({ node: { languages } }) => {
    // Loop through languages for the repo
    languages.edges.forEach(({ node: { id, name, color } }) => {
      if (result[id]) {
        result[id].count++;
      } else {
        result[id] = {
          count,
          otherLangs: {},
          name,
          color,
          id
        };
      }
      // Look up what other languages this repo contains
      result[id].otherLangs = countOtherLangs(result[id], languages);
    });
  });
  // Convert the result object to an array
  return Object.values(result);
};

const topics = ({ edges }) => {
  const result = {};
  const count = 1;
  edges.forEach(({ node: { repositoryTopics } }) => {
    repositoryTopics.edges.forEach(
      ({
        topic: {
          id,
          name,
          stargazers: { totalCount: stars }
        }
      }) => {
        if (result[id]) {
          result[id].count++;
        } else {
          result[id] = {
            stars,
            id,
            count,
            name
          };
        }
      }
    );
  });
  return Object.values(result);
};

export { languages, topics, formatChordData };
