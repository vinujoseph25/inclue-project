// General
global.fetch = jest.fn();

(global.sessionStorage) = {
  clear: jest.fn(),
};

(global.console) = {
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
  debug: jest.fn(),
};

// Globals that need to be mocked for other libraries to work

// For ApolloClient
class MutationObserver {
  constructor() {}
  observe() {}
}
(global.MutationObserver) = MutationObserver;

// For MaterialUI
global.elementAcceptingRef = jest.fn();
global.PropTypes = {
  bool: {},
  func: {},
};


jest.mock('helpers', () => {
  const original = jest.requireActual('helpers');
  return {
    ...original,
    getRuntimeConfig: jest.fn(),
  };
});