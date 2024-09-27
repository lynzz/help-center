/**
 * space router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::space.space', {
  config: {
    find: {
      middlewares: [
        async (ctx, next) => {
          console.log('GET /api/spaces - Request:', {
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
          console.log('GET /api/spaces/:id - Request:', {
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
          console.log('POST /api/spaces - Request:', {
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
          console.log('PUT /api/spaces/:id - Request:', {
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
          console.log('DELETE /api/spaces/:id - Request:', {
            params: ctx.params,
            headers: ctx.request.headers
          });
          await next();
        }
      ]
    }
  }
});
