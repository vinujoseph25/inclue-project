// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//


import 'cypress-file-upload';


Cypress.Commands.add('unregisterServiceWorkers', () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations()
      .then(registrations => registrations.forEach(reg => reg.unregister()));
  }
});

Cypress.Commands.add('paste', { prevSubject: true }, (subject, { pastePayload, simple = true, pasteType = 'text' }) => {
  if (simple) {
      subject[0].value = pastePayload;
      return;
  }

  // https://developer.mozilla.org/en-US/docs/Web/API/Element/paste_event
  const pasteEvent = Object.assign(new Event('paste', { bubbles: true, cancelable: true }), {
      clipboardData: {
          getData: (type = pasteType) => pastePayload,
      },
  });
  subject[0].dispatchEvent(pasteEvent);

  return subject;

});


Cypress.Commands.add('enterText', (selector, text) => {
  cy.get(selector).click();
  cy.get(selector + 'input').type(text, { force: true, delay: 0 });
})


