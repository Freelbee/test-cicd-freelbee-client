// import '@types/jest';
import 'cross-fetch/polyfill';
import fetchMock from 'jest-fetch-mock';

window.scrollTo = jest.fn().mockImplementation(() => ({}));
fetchMock.enableMocks();