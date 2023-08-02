import express from 'express';

export default (app) => {
  app.use('/images/favicon.ico', express.static('node_modules/govuk-frontend/govuk/assets/images/favicon.ico'));
  app.use('/favicon.ico', express.static('node_modules/govuk-frontend/govuk/assets/images/favicon.ico'));
  app.use('/public', express.static('src/public/'));
  app.use('/assets', express.static('node_modules/govuk-frontend/govuk/assets/'));
  app.use('/govuk-frontend', express.static('node_modules/govuk-frontend/govuk'));
  app.use('/govuk-frontend/components/', express.static('node_modules/govuk-frontend/govuk/components'));
};
