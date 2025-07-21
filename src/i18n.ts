import React from 'react';
import intl from 'react-intl-universal';
import { LANGUAGES } from './constants/constants';
import { UserContext } from './contexts/UserProvider';
import PropTypes from 'prop-types';

const locales = {
  [LANGUAGES.EN_US]: require('./locales/en-US.json'),
  [LANGUAGES.DE_DE]: require('./locales/de-DE.json'),
};

class I18N extends React.Component {
  static contextType = UserContext;
  i18n: any;
  state = {
    initDone: false,
    language: LANGUAGES.EN_US,
  };

  constructor(props, context) {
    super(props, context);
    this.i18n = {
      setLanguage: this.setLanguage,
    };
  }

  static childContextTypes = {
    i18n: PropTypes.any,
  };

  getChildContext() {
    return {
      i18n: this.i18n,
    };
  }

  componentDidMount() {
    this.setLanguage(LANGUAGES.EN_US);
  }
  componentDidUpdate() {
    const lang = this.context.language;
    if (this.state.language !== lang) {
      this.setLanguage(lang);
      this.setState(
        {
          language: lang,
          initDone: false,
        },
        () =>
          this.setState({
            initDone: true,
          }),
      );
    }
  }
  //
  // modify this to make an axios call to a language set in the future
  // grab on demand locales
  //

  setLanguage = (language: string) => {
    intl
      .init({
        currentLocale: language, // TODO: determine locale here
        locales,
      })
      .then(() => {
        this.setState({ initDone: true });
      });
  };

  render() {
    return this.state.initDone && this.props.children;
  }
}

export default I18N;
