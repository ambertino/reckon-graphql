import axois from 'axios';
import { keepTrying } from './utils';
import { TextSearchResultToSubmit } from './types';

const API_BASE_URL = 'https://join.reckon.com/test2';
const AUTHOR_NAME = 'Dmitry Istomin';

export interface TextToSearchApiResponse {
  text: string;
}

export async function getTextToSearch(): Promise<string> {
  return keepTrying(async () => {
    const { data } = await axois.get<TextToSearchApiResponse>(
      `${API_BASE_URL}/textToSearch`
    );
    return data.text;
  });
}

export interface SubTextsApiResponse {
  subTexts: string[];
}

export async function getSubTexts(): Promise<string[]> {
  return keepTrying(async () => {
    const { data } = await axois.get<SubTextsApiResponse>(
      `${API_BASE_URL}/subTexts`
    );
    return data.subTexts;
  });
}

export async function submitSearchResult(result: TextSearchResultToSubmit) {
  return keepTrying(async () => {
    await axois.post(`${API_BASE_URL}/submitResults`, result);
  });
}
