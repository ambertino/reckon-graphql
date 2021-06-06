import axois from 'axios';
import { keepTrying } from '../utils';

const API_BASE_URL = 'https://join.reckon.com/test2';

interface TextToSearchApiResponse {
  text: string;
}

async function getTextToSearch(): Promise<string> {
  return keepTrying(async () => {
    const { data } = await axois.get<TextToSearchApiResponse>(
      `${API_BASE_URL}/textToSearch`
    );
    return data.text;
  });
}

interface SubTextsApiResponse {
  subTexts: string[];
}

async function getSubTexts(): Promise<string[]> {
  return keepTrying(async () => {
    const { data } = await axois.get<SubTextsApiResponse>(
      `${API_BASE_URL}/subTexts`
    );
    return data.subTexts;
  });
}

export interface SubTextSearchResult {
  subText: string;
  occurences: string;
}

export async function searchText() {
  const [text = '', subTexts = []] = [
    await getTextToSearch(),
    await getSubTexts(),
  ];

  return {
    text,
    results: subTexts.map((sub) => {
      const occurences = [];
      const regex = new RegExp(sub, 'gi');

      while (true) {
        let match = regex.exec(text);
        if (!match) break;
        occurences.push(match.index);
      }

      return {
        subText: sub,
        occurences,
      };
    }),
  };
}
