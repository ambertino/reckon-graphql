import * as api from '../../src/api';
import { searchText, submitResult } from '../../src/services/text.svc';

describe('Text service', () => {
  it('searchText should return correct results', async () => {
    const text = `Hello Deema! How are you Deema? What are you doing Deema?`;
    const subtexts = ['Are you', 'deema', 'Deema', '?', 'test'];

    jest.spyOn(api, 'getTextToSearch').mockResolvedValue(text);
    jest.spyOn(api, 'getSubTexts').mockResolvedValue(subtexts);

    const result = await searchText();

    expect(result).toEqual({
      text,
      results: [
        {
          subtext: 'Are you',
          positions: '17, 37',
        },
        {
          subtext: 'deema',
          positions: '6, 25, 51',
        },
        {
          subtext: 'Deema',
          positions: '6, 25, 51',
        },
        {
          subtext: '?',
          positions: '30, 56',
        },
        {
          subtext: 'test',
          positions: '<No Output>',
        },
      ],
    });
  });

  it('submitSearchResult should successfully submit result', async () => {
    const result = {
      candidate: 'Deema',
      text: 'Hey Deema!',
      results: [
        {
          subtext: 'Deema',
          positions: '4',
        },
      ],
    };
    const mockedApi = jest
      .spyOn(api, 'submitSearchResult')
      .mockImplementation(jest.fn());

    await submitResult(result);

    expect(mockedApi).toHaveBeenCalledTimes(1);
    expect(mockedApi).toHaveBeenCalledWith(result);
  });
});
