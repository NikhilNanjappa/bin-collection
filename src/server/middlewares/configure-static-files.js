import express from 'express';

export default (app) => {
  app.use('/public', express.static('src/public/'));
};
