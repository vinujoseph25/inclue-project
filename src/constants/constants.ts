export const REACT_ROUTES = {
  HOME: '/home',
};
// Languages formatted per the UI
type UiLanguages = 'en-us' | 'de-DE';

// Languages formatted for Enum -> System.Text.Json conversion in the API
type ApiLanguages = 'EN_US' | 'DE_DE';

// Pairing API values and UI values so they are forced to stay in sync via Record
export const LANGUAGES: Record<ApiLanguages, UiLanguages> = {
  EN_US: 'en-us',
  DE_DE: 'de-DE',
};

// Pairing UI values and API values so they are forced to stay in sync via Record
export const API_LANGUAGES: Record<UiLanguages, ApiLanguages> = {
  'en-us': 'EN_US',
  'de-DE': 'DE_DE',
};
