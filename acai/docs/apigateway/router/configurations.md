---
title: Configurations
description: The different options available to configure the router
---

# Router Configurations

As mentioned previously, the router is highly configurable to each project needs and desires. The point of the router is to enforce predictable thus making the API more extensible. Below is a table of all the configuration options available:

???+ example
    Don't like reading documentation? Then look at [our examples](https://github.com/syngenta/acai-js-docs/blob/main/examples/apigateway) which can run locally! :nerd:

### Configuration Options

| option               | type   | required                             | description                                                                       |
|----------------------|--------|--------------------------------------|-----------------------------------------------------------------------------------|
| **`afterAll`**       | func   | no                                   | will call this function after EVERY request to the API                            |
| **`autoValidate`**   | bool   | no; requires `schemaPath`            | will automatically validate request against openapi.yml                           |
| **`basePath`**       | str    | yes                                  | the base path of the API Gateway instance this is running on                      |
| **`beforeAll`**      | func   | no                                   | will call this function before EVERY request to the API                           |
| **`cacheSize`**      | int    | no (default: 128)                    | caches the routes and modules (not responses) for faster subsequent requests      |
| **`cacheMode`**      | enum   | no; all (default), static, dynamic   | determines which routes to cache; all, routes with dynamic paths or static only   |
| **`globalLogger`**   | bool   | no                                   | will assign the Acai logger to the global variable `globalLogger`                 |
| **`handlerPath`**    | str    | yes, if `routingMode` == 'directory' | file path pointing to the directory where the endpoints are                       |
| **`handlerPattern`** | str    | yes, if `routingMode` == 'pattern'   | glob pattern to be able to find the endpoint files                                |
| **`handlerList`**    | object | yes, if `routingMode` == 'list'      | object key, value pair to be able to map routes to files                          |
| **`loggerCallback`** | func   | no                                   | will call this function on every call to `global.logger`                          |
| **`onError`**        | func   | no                                   | will call this function on every unhandled error; not including validation errors |
| **`outputError`**    | bool   | no, (default: false)                 | determines if internal service error messages are outputed by api or just default |
| **`routingMode`**    | enum   | yes; directory or pattern or list    | determines how to route requests to the right files; 3 modes                      |
| **`schemaPath`**     | str    | yes, if `autoValidate`               | file path pointing to the location of the openapi.yml file                        |
| **`withAuth`**       | func   | no                                   | will call this function when `requirements` have `requiredAuth` set to `true`     |

### Example: Router Config with Directory Routing

```js

const {Router} = require('@syngenta-digital/Acai').apigateway;
const MiddlewareUtils = require('api/logic/utils/middleware');
const Authenticator = require('api/logic/authenticator');

const router = new Router({
    basePath: 'api',
    routingMode: 'directory',
    handlerPath: 'api/handler',
    schemaPath: 'api/openapi.yml',
    autoValidate: true,
    globalLogger: true,
    cacheSize: 512,
    cacheMode: 'all',
    outputError: process.env.STAGE !== 'prod', // useful for lower environments
    beforeAll: MiddlewareUtils.beforeAll,
    afterAll: MiddlewareUtils.afterAll,
    onError: MiddlewareUtils.onError,
    withAuth: Authenticator.authenticate,
    loggerCallback: MiddlewareUtils.loggerCallback,
});
router.autoLoad() // optional; pulls in files from disc into memory and shares on with concurrent lambdas

exports.route = async (event) => {
    return router.route(event);
};
```

### Example: Router Config with Pattern Routing

```js

const {Router} = require('@syngenta-digital/Acai').apigateway;
const MiddlewareUtils = require('api/logic/utils/middleware');
const Authenticator = require('api/logic/authenticator');

const router = new Router({
    basePath: 'api',
    routingMode: 'pattern',
    handlerPattern: 'api/**/*.controller.js',
    schemaPath: 'api/openapi.yml',
    autoValidate: true,
    globalLogger: true,
    cacheSize: 512,
    cacheMode: 'all',
    outputError: process.env.STAGE !== 'prod', // useful for lower environments
    beforeAll: MiddlewareUtils.beforeAll,
    afterAll: MiddlewareUtils.afterAll,
    onError: MiddlewareUtils.onError,
    withAuth: Authenticator.authenticate,
    loggerCallback: MiddlewareUtils.loggerCallback,
});
router.autoLoad() // optional; pulls in files from disc into memory and shares on with concurrent lambdas

exports.route = async (event) => {
    return router.route(event);
};
```

### Example: Router Config with List Routing

```js

const {Router} = require('@syngenta-digital/Acai').apigateway;
const MiddlewareUtils = require('api/logic/utils/middleware');
const Authenticator = require('api/logic/authenticator');

// best to put this is in separate file; but the sake of brevity...
const routes = {
    'GET::grower': 'api/routes/grower.js',
    'POST::farm': 'api/routes/farm.js',
    'PUT:farm/{farmId}/field/{fieldId}': 'api/routes/farm-field.js'
}

const router = new Router({
    basePath: 'api',
    routingMode: 'list',
    handlerList: routes,
    schemaPath: 'api/openapi.yml',
    autoValidate: true,
    globalLogger: true,
    cacheSize: 512,
    cacheMode: 'all',
    outputError: process.env.STAGE !== 'prod', // useful for lower environments
    beforeAll: MiddlewareUtils.beforeAll,
    afterAll: MiddlewareUtils.afterAll,
    onError: MiddlewareUtils.onError,
    withAuth: Authenticator.authenticate,
    loggerCallback: MiddlewareUtils.loggerCallback
});

router.autoLoad() // optional; pulls in files from disc into memory and shares on with concurrent lambdas

exports.route = async (event) => {    
    return router.route(event);
};
```
