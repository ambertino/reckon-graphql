import { gql } from 'apollo-server';

export default gql`
  type SubtextSearchResult {
    subtext: String!
    positions: String!
  }

  type TextSearchResult {
    text: String!
    results: [SubtextSearchResult]
  }

  type Query {
    searchResult: TextSearchResult
  }
`;
