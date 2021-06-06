import { gql } from "apollo-server";

export default gql`
  type SubtextResult {
    subtext: String!
    result: String!
  }

  type TextSearchResult {
    text: String!
    results: [SubtextResult]
  }

  type SubmitResultsInput {
    candidate: String!
    text: String!
    results: [SubtextResult]
  }

  type Query {
    searchResult: TextSearchResult
  }
`;
