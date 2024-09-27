/**
 * article router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::article.article', {
  config: {
    find: {
      middlewares: [
        async (ctx, next) => {
          console.log('GET /api/articles - Request:', {
            query: ctx.query,
            params: ctx.params,
            headers: ctx.request.headers
          });
          await next();
        }
      ]
    },
    findOne: {
      middlewares: [
        async (ctx, next) => {
          console.log('GET /api/articles/:id - Request:', {
            params: ctx.params,
            query: ctx.query,
            headers: ctx.request.headers
          });
          await next();
        }
      ]
    },
    create: {
      middlewares: [
        async (ctx, next) => {
          console.log('POST /api/articles - Request:', {
            body: ctx.request.body,
            headers: ctx.request.headers
          });
          await next();
        }
      ]
    },
    update: {
      middlewares: [
        async (ctx, next) => {
          console.log('PUT /api/articles/:id - Request:', {
            params: ctx.params,
            body: ctx.request.body,
            headers: ctx.request.headers
          });
          await next();
        }
      ]
    },
    delete: {
      middlewares: [
        async (ctx, next) => {
          console.log('DELETE /api/articles/:id - Request:', {
            params: ctx.params,
            headers: ctx.request.headers
          });
          await next();
        }
      ]
    }
  }
});
