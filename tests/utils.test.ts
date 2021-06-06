import { keepTrying } from '../src/utils';

describe('keepTrying', () => {
  it('Should keep retrying until success (sending errors)', async () => {
    let timesCalled = 0;

    const failedFn = async () => {
      if (timesCalled++ < 2) {
        throw new Error('Test error');
      }
    };

    const reportError = jest.fn();
    jest.spyOn(console, 'error').mockImplementation(reportError);

    await keepTrying(failedFn);

    expect(timesCalled).toEqual(3);
    expect(reportError).toHaveBeenCalledTimes(2);
  });
});
