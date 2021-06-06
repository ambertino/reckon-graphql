import { gql } from 'apollo-server';

export default gql`
  input SubtextSearchResultInput {
    subtext: String!
    positions: String!
  }

  input ResultsToSubmit {
    candidate: String!
    text: String!
    results: [SubtextSearchResultInput]
  }

  type Mutation {
    submitResults(results: ResultsToSubmit): Boolean
  }
`;
