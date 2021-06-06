import { getTextToSearch, getSubTexts, submitSearchResult } from '../api';
import { TextSearchResult, TextSearchResultToSubmit } from '../types';

export async function searchText(): Promise<TextSearchResult> {
  const [text = '', subTexts = []] = [
    await getTextToSearch(),
    await getSubTexts(),
  ];

  return {
    text,
    results: subTexts.map((sub) => {
      const occurences = [];
      const pattern = escapeRegExp(sub);
      const regex = new RegExp(pattern, 'gi');

      while (true) {
        let match = regex.exec(text);
        if (!match) break;
        occurences.push(match.index);
      }

      return {
        subtext: sub,
        positions: occurences.join(', ') || '<No Output>',
      };
    }),
  };
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

export async function submitResult(result: TextSearchResultToSubmit) {
  return submitSearchResult(result);
}
