---
title: "🚀 Router Setup"
description: How to configure the Acai router
---

# 🛣️ Router Setup

???+ example "🎓 Hands-on Example"
    Prefer to learn by doing? Explore the [runnable API Gateway examples](https://github.com/syngenta/acai-js-docs/blob/main/examples/apigateway) and see the router in action.


### 1️⃣ Configure the Lambda

=== "Serverless Framework"

```yaml
functions:
    apigateway-handler:
        handler: api/handler/router.route
        events:
            - http:
                path: /
                method: ANY
            - http:
                path: /{proxy+}
                method: ANY    
```

### 2️⃣ Configure the Router

Acai ships with a **single pattern-based resolver**. Provide either:

- `handlerPath`: directory shorthand that automatically expands to `**/*.js`.
- `handlerPattern`: full glob expression when you want a custom naming convention.

Both inputs support dynamic segments such as `{userId}.js` and share identical behaviour.

#### 🗂️ Directory-Style Shorthand (`handlerPath`)

???+ tip "💡 Tip"
    When you introduce path parameters, name files using the `{param}.js` convention (for example `{farmId}.js`).

=== "router.js"

    ```js
    const {Router} = require('acai').apigateway;

    const router = new Router({
        basePath: 'api',               // optional: useful with custom domains
        handlerPath: 'api/handler'     // auto-expands to api/handler/**/*.js
    });

    router.autoLoad(); // optional cache shared across warm Lambdas

    exports.route = async (event) => router.route(event);
    ```

#### 🧵 Custom Glob (`handlerPattern`)

???+ tip "🧠 Pattern Ideas"
    Common globs include:

    * `api/**/*.controller.js`
    * `src/**/handler.*.js`
    * `services/**/endpoint.js`

=== "router.js"

    ```js
    const {Router} = require('acai').apigateway;
    const router = new Router({
        basePath: 'api',
        handlerPattern: 'api/**/*.controller.js'
    });

    exports.route = async (event) => router.route(event);
    ```

### 3️⃣ Configure the Endpoint File

Every endpoint file should contain a function which matches an [HTTP method](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods) in lower case. Most common are `post`, `get`, `put`, `patch`, `delete`, but this library does support custom methods, if you so choose. As long as the method of the request matches the function name, it will work.

```js
exports.post = async (request, response) => {
    response.body = {post: true};
    return response;
};

exports.get = async (request, response) => {
    response.body = {get: true};
    return response;
};

exports.patch = async (request, response) => {
    response.body = {patch: true};
    return response;
};

exports.put = async (request, response) => {
    response.body = {put: true};
    return response;
};

exports.delete = async (request, response) => {
    response.body = {delete: true};
    return response;
};

// Example of a non-standard method - still works if the request method matches.
exports.query = async (request, response) => {
    response.body = [{query: true}];
    return response;
};
```
