import { searchText } from '../services/text.svc';

async function searchResult() {
  const { text, results } = await searchText();
  const result = {
    text,
    results: results.map(({ subText, occurences }) => ({
      subtext: subText,
      result: occurences.join(', '),
    })),
  };
  return result;
}

export default {
  searchResult,
};
