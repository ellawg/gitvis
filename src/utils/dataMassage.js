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

const languages = (edges, minCount) => {
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
  return Object.values(result).filter(({ count }) => count >= minCount);
};

const topics = (edges, minCount) => {
  const result = {};
  const count = 1;
  edges.forEach(({ node: { repositoryTopics: { edges } } }) => {
    edges.forEach(
      ({
        node: {
          topic: {
            id,
            name,
            stargazers: { totalCount: stars }
          }
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
  return Object.values(result).filter(({ count }) => count >= minCount);
};

const langSizeCalc = ({ edges, totalSize }) => {
  return edges.map(({ node: { color, name, id }, size }) => ({
    color,
    name,
    id,
    size: size / totalSize
  }));
};

const repos = edges => {
  const result = [];
  edges.forEach(
    ({
      node: {
        id,
        url,
        forkCount: forks,
        languages,
        nameWithOwner: name,
        stargazers: { totalCount: stars }
      }
    }) => {
      result.push({
        id,
        url,
        name,
        stars,
        forks,
        languages: langSizeCalc(languages)
      });
    }
  );
  return result;
};

const filter = ({ edges }, langFilters, topicFilters) => {
  if (!langFilters.length && !topicFilters.length) {
    return edges;
  } else {
    return edges.filter(
      ({
        node: {
          languages: { edges: languages },
          repositoryTopics: { edges: topics }
        }
      }) => {
        const langsArray = languages.map(({ node: { name } }) => name);
        const topicsArray = topics.map(
          ({
            node: {
              topic: { name }
            }
          }) => name
        );
        const hasLang = !langFilters.length
          ? false
          : langFilters.reduce(
              (acc, lang) => (acc ? langsArray.includes(lang) : acc),
              true
            );
        const hasTopic = !topicFilters.length
          ? false
          : topicFilters.reduce(
              (acc, topic) => (acc ? topicsArray.includes(topic) : acc),
              true
            );
        return hasLang || hasTopic;
      }
    );
  }
};

export { languages, topics, formatChordData, repos, filter };
