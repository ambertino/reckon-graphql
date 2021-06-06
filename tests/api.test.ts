import faker from 'faker';
import axios from 'axios';
import {
  getTextToSearch,
  getSubTexts,
  SubTextsApiResponse,
  TextToSearchApiResponse,
} from '../src/api';
import * as utils from '../src/utils';

interface AxiosResult<T> {
  data: T;
}

interface AxiosFailure {
  status: string;
  statusText: string;
}

describe('API module', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('getTextToSearch returns currect result if successful', async () => {
    const randomText = faker.random.words(100);

    jest.spyOn(axios, 'get').mockResolvedValue({
      data: {
        text: randomText,
      },
    } as AxiosResult<TextToSearchApiResponse>);

    const textToSearch = await getTextToSearch();

    expect(textToSearch).toEqual(randomText);
  });

  it('getTextToSearch retries if failed', async () => {
    jest.spyOn(axios, 'get').mockRejectedValue({
      status: '403',
      statusText: 'Forbidden',
    } as AxiosFailure);

    const mockedRetrial = jest.fn();
    jest.spyOn(utils, 'keepTrying').mockImplementation(mockedRetrial);

    await getTextToSearch();

    expect(mockedRetrial).toHaveBeenCalledTimes(1);
  });

  it('getSubTexts returns currect result if successful', async () => {
    const randomSubs = [];
    for (let i = 0; i < 10; i++) {
      randomSubs.push(faker.random.word());
    }

    jest.spyOn(axios, 'get').mockResolvedValue({
      data: {
        subTexts: randomSubs,
      },
    } as AxiosResult<SubTextsApiResponse>);

    const searchedSubs = await getSubTexts();

    expect(randomSubs).toEqual(searchedSubs);
  });

  it('getSubTexts retries if failed', async () => {
    jest.spyOn(axios, 'get').mockRejectedValue({
      status: '403',
      statusText: 'Forbidden',
    } as AxiosFailure);

    const mockedRetrial = jest.fn();
    jest.spyOn(utils, 'keepTrying').mockImplementation(mockedRetrial);

    await getSubTexts();

    expect(mockedRetrial).toHaveBeenCalledTimes(1);
  });
});
