import * as api from '../../src/api';
import { searchText } from '../../src/services/text.svc';

describe('Text service', () => {
  it('Should correct results', async () => {
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
});
