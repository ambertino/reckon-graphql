import { searchText } from '../../services/text.svc';

export async function searchResult() {
  return searchText();
}

export default {
  searchResult,
};
