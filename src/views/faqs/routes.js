import get from './faqs';

export const appendRoutes = (router) => {
  router.get('/faqs', get);
};

export { appendRoutes as default };
