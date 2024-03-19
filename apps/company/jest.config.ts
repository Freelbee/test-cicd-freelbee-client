/* eslint-disable */
export default {
  displayName: 'company',
  preset: '../../jest.preset.js',
  transform: {
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nx/react/plugins/jest',
    '^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@nx/next/babel'] }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../coverage/apps/company',
  moduleNameMapper: {
    '^next/font/local$': '<rootDir>/../../packages/f-shared/src/tests/__mocks__/localfont.ts',
    '@company/assets/(.*)$': '<rootDir>/src/f-shared/src/assets/$1',
    '@freelbee/assets/(.*)$': '<rootDir>/../../packages/f-shared/src/assets/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/../../packages/f-shared/src/tests/__mocks__/jest.setup.ts']
};