const actual = jest.requireActual('react-intl-universal');
export default {
  ...actual,
  get: jest.fn().mockImplementation((key) => key),
  getHTML: jest.fn().mockImplementation((key) => key),
};
