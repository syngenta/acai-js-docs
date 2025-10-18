---
title: "⚙️ Configurations"
description: Router configuration options
---

# ⚙️ Router Configurations

Acai's router is deliberately configurable so teams can bake in cross-cutting concerns (auth, logging, validation) while keeping handlers lightweight. The table below summarises each option.

???+ example "🎓 Hands-on Example"
    Prefer sample code? Jump into the [API Gateway examples](https://github.com/syngenta/acai-js-docs/blob/main/examples/apigateway) and experiment locally.

## 📋 Configuration Options

| option                 | type   | required                    | description                                                                           |
|------------------------|--------|-----------------------------|---------------------------------------------------------------------------------------|
| **`afterAll`**         | func   | no                          | Invoked after every request (handy for shared cleanup).                               |
| **`autoValidate`**     | bool   | no; requires `schemaPath`   | Validates requests against your OpenAPI document.                                     |
| **`basePath`**         | str    | yes                         | Base path of the API Gateway deployment (e.g. `api/v1`).                              |
| **`beforeAll`**        | func   | no                          | Invoked before every request (great for correlation IDs, auth context, etc.).         |
| **`cacheSize`**        | int    | no (default: 128)           | Number of routes cached in-memory per warm Lambda execution environment.              |
| **`cacheMode`**        | enum   | no; `all`, `dynamic`, `static` | Controls which routes are cached (`all` is default).                                  |
| **`globalLogger`**     | bool   | no                          | Exposes the Acai logger as `global.logger`.                                           |
| **`handlerPath`**      | str    | yes, if no `handlerPattern` | Directory shorthand automatically expanded to `**/*.js`.                              |
| **`handlerPattern`**   | str    | yes, if no `handlerPath`    | Custom glob pattern when you want explicit control over file discovery.              |
| **`loggerCallback`**   | func   | no                          | Called with every log payload emitted by Acai's logger.                               |
| **`onError`**          | func   | no                          | Runs when an unhandled error bubbles up (before the response is returned).           |
| **`onTimeout`**        | func   | no                          | Runs when endpoint execution exceeds `timeout`.                                      |
| **`outputError`**      | bool   | no (default: `false`)       | When `true`, returns original error messages instead of the generic message.          |
| **`schemaPath`**       | str    | yes, if `autoValidate`      | Absolute or relative path to an OpenAPI document.                                    |
| **`timeout`**          | int    | no                          | Maximum execution time (ms) for handlers; distinct from Lambda timeout.               |
| **`validateResponse`** | bool   | no                          | Validates handler responses using OpenAPI or inline schemas.                          |
| **`withAuth`**         | func   | no                          | Runs when an endpoint requirement sets `requiredAuth` to `true`.                      |

## 🧪 Example Configuration (Directory-Style)

```js
const {Router} = require('acai').apigateway;
const Middleware = require('api/logic/middleware');
const Authenticator = require('api/logic/authenticator');

const router = new Router({
    basePath: 'api',
    handlerPath: 'api/handler',          // expanded to api/handler/**/*.js
    schemaPath: 'api/openapi.yml',
    autoValidate: true,
    validateResponse: process.env.STAGE !== 'prod',
    outputError: process.env.STAGE !== 'prod',
    cacheSize: 512,
    cacheMode: 'all',
    timeout: 2800,
    beforeAll: Middleware.beforeAll,
    afterAll: Middleware.afterAll,
    withAuth: Authenticator.authenticate,
    onError: Middleware.onError,
    onTimeout: Middleware.onTimeout,
    loggerCallback: Middleware.loggerCallback,
    globalLogger: true
});

router.autoLoad();
exports.route = async (event) => router.route(event);
```

## 🧵 Example Configuration (Custom Pattern)

```js
const {Router} = require('acai').apigateway;

exports.route = async (event) => {
    const router = new Router({
        basePath: 'api/v1',
        handlerPattern: 'src/features/**/*.controller.js',
        schemaPath: 'openapi.yml'
    });

    return router.route(event);
};
```

!!! note "✨ Tip"
    `handlerPath` and `handlerPattern` are mutually exclusive. Pick whichever matches your project structure—behaviour is identical once the router resolves modules.
