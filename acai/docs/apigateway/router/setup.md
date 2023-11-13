---
title: Set Up
description: How to use the Acai Router
---

# Router Set Up

???+ example
    Don't like reading documentation? Then look at [our examples](https://github.com/syngenta/acai-js-docs/blob/main/examples/apigateway) which can run locally! :nerd:


### 1. Configure the Lambda

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

### 2. Configure the Router

There are three routing modes: `directory`, `pattern` and `list`; `directory` and `pattern` routing mode requires your project files to be placed in a particular way; `list` does not require any structure, as you define every route and it's corresponding file. Below are the three ways configure your router:

#### Routing Mode: Directory

???+ tip
    If you are using route params, you will need use dynamic file names which follow this pattern: `{some-variable-name}.js`.

=== "file structure"

    ```
    ~~ Directory ~~                     ~~ Route ~~
    ===================================================================
    📦api/                              |          
    │---📂handler                       |           
        │---📜router.js                 |
        │---📜org.js                    | /org    
        │---📂grower                    |
            │---📜index.js              | /grower
            │---📜{growerId}.js         | /grower/{growerId}
        │---📂farm                      |
            │---📜index.js              | /farm
            │---📂{farmId}              |
                │---📜index.js          | /farm/{farmId}
                │---📂field             |
                    │---📜index.js      | /farm/{farmId}/field
                    │---📜{fieldId}.js  | /farm/{farmId}/field/{fieldId}
    ```

=== "router.js"

    ```js
    const {Router} = require('@syngenta-digital/Acai').apigateway;
    const router = new Router({
        routingMode: 'directory',
        basePath: 'api', // for use with custom apigateway domain
        handlerPath: 'api/handler'
    });
    router.autoLoad() // optional; pulls in files from disc into memory and shares on with concurrent lambdas

    exports.route = async (event) => {
        return router.route(event);
    };
    ```

#### Routing Mode: Pattern

???+ tip
    You can use any [glob](https://en.wikipedia.org/wiki/Glob_(programming)) pattern you like; common patterns are:

    * `/**/*.controller.js`

    * `/**/handler.*.js`

    * `/**/endpoint.js`

=== "file structure"

    ```
    ~~ Pattern ~~                               ~~ Route ~~
    ================================================================================
    📦api/                                      |
    │---📜router.js                             |
    │---📂org                                   |
        │---📜org.controller.js                 | /org
        │---📜org.model.js                      |
        │---📜org.factory.js                    |
        │---📜org.logic.js                      |
    │---📂grower                                |
        │---📜grower.controller.js              | /grower
        │---📜{growerId}.controller.js          | /grower/{growerId}
        │---📜grower.model.js                   |
        │---📜grower.factory.js                 |
        │---📜grower.logic.js                   |
    │---📂farm                                  |
        │---📜farm.controller.js                | /farm
        │---📜farm.logic.js                     |
        │---📜farm.model.js                     |
        │---📂{farmId}                          |
            │---📜{farmId}.controller.js        | /farm/{farmId}
            │---📂field                         |
                │---📜field.controller.js       | /farm/{farmId}/field
                │---📜{fieldId}.controller.js   | /farm/{farmId}/field/{fieldId}
                │---📜field.logic.js            |
                │---📜field.model.js            |
    ```

=== "router.js"

    ```js
    const {Router} = require('@syngenta-digital/Acai').apigateway;

    exports.route = async (event) => {
        const router = new Router({
            routingMode: 'pattern',
            basePath: 'api', // for use with custom apigateway domain
            handlerPattern: 'api/**/*.controller.js'
        });
        return router.route(event);
    };
    ```

#### Routing Mode: List

???+ tip
    It may be more maintainable to store your routes list in a separate file, this example does not have that for brevity

???+ warning
    Even though you are matching your files to your routes, the handler files must have functions that match HTTP method (see endpoint examples here)

???+ danger
    This is not the preferred routing mode to use; this can lead to a sloppy, unpredictable project architecture which will be hard to maintain and extend. This is *NOT RECOMMENDED*.

=== "file structure"

    ```
    File structure doesn't matter
    ======================================================
    📦api/
    │---📜router.js
    ```

=== "router.js"

    ```js
    const {Router} = require('@syngenta-digital/Acai').apigateway;
    const router = new Router({
        routingMode: 'list',
        basePath: 'api', // for use with custom apigateway domain
        handlerList: {
            'GET::grower': 'api/routes/grower.js',
            'POST::farm': 'api/routes/farm.js',
            'PUT:farm/{farmId}/field/{fieldId}': 'api/routes/farm-field.js'
        }
    });

    router.autoLoad() // optional; pulls in files from disc into memory and shares on with concurrent lambdas
    exports.route = async (event) => {
        return router.route(event);
    };
    ```


### 3. Configure the Endpoint File

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

// this is a non-compliant, custom http method; this will work.
exports.query = async (request, response) => {
    response.body = [{query: true}];
    return response;
};
```
