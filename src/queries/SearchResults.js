import gql from "graphql-tag";

export default gql`
  query SearchResults($query: String!) {
    search(first: 100, query: $query, type: REPOSITORY) {
      edges {
        node {
          __typename
          ... on Repository {
            description
            forkCount
            homepageUrl
            url
            nameWithOwner
            languages(first: 15) {
              totalCount
              totalSize
              edges {
                size
                node {
                  color
                  name
                  id
                }
              }
            }
            primaryLanguage {
              name
            }
            pushedAt
            repositoryTopics(first: 15) {
              totalCount
              edges {
                node {
                  url
                  topic {
                    stargazers {
                      totalCount
                    }
                    id
                    name
                  }
                }
              }
            }
            stargazers {
              totalCount
            }
          }
        }
      }
    }
  }
`;
