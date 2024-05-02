/* eslint-disable */
export default {
  displayName: 'landing',
  preset: '../../jest.preset.js',
  transform: {
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nx/react/plugins/jest',
    '^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@nx/next/babel']}],
    "node_modules/swiper/.+\\.mjs?$": "ts-jest"
  },
  roots: ['.'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../coverage/apps/landing',
  moduleNameMapper: {
    '@landing/assets/(.*)$': '<rootDir>/src/f-shared/src/assets/$1',
    '@freelbee/assets/(.*)$': '<rootDir>/../../packages/f-shared/src/assets/$1',
    '^next/font/google$': '<rootDir>/../../packages/f-shared/src/tests/__mocks__/next/google-fonts.ts',
    '^next/font/local$': '<rootDir>/../../packages/f-shared/src/tests/__mocks__/next/localfont.ts',
    '^swiper/(.*)$': '<rootDir>/src/f-shared/src/tests/__mocks__/swiper.ts',
  },
  // transformIgnorePatterns: [
  //   "node_modules/(?!swiper/.*)"
  // ],
  setupFilesAfterEnv: ['<rootDir>/../../packages/f-shared/src/tests/__mocks__/jest.setup.ts']
};

