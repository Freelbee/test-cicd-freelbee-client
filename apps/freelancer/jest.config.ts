/* eslint-disable */
export default {
  displayName: 'freelancer',
  preset: '../../jest.preset.js',
  transform: {
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nx/react/plugins/jest',
    '^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@nx/next/babel'] }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../coverage/apps/freelancer',
  moduleNameMapper: {
    '@freelancer/assets/(.*)$': '<rootDir>/src/f-shared/src/assets/$1',
    '@freelbee/assets/(.*)$': '<rootDir>/../../packages/f-shared/src/assets/$1',
    '^next/font/google$': '<rootDir>/../../packages/f-shared/src/tests/__mocks__/next/google-fonts.ts',
    '^next/font/local$': '<rootDir>/../../packages/f-shared/src/tests/__mocks__/next/localfont.ts',
  },
  setupFilesAfterEnv: ['<rootDir>/../../packages/f-shared/src/tests/__mocks__/jest.setup.ts']
};
