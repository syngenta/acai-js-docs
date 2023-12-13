---
title: Set Up
description: How to set up an endpoint for the Acai
---

# Endpoint Set Up

Each endpoint is meant to be treated as a separate module within the API. These endpoints are not meant to be extended or commingled and thus should approach individually. If resources are meant to be shared across endpoints, then those resources should be packaged as shared classes or utilities.

Each endpoint should read as a procedural list of steps to be completed. To help keep this list clean and easy to read, the Acai follows its philosophy of "Happy Path Programming." To achieve this, the Acai comes with a plethora of validation configurations with the ability to extend with even more customized validation options. This ensures the request sent to your endpoint will be correct with little need for exception handling or complex conditionals.

???+ examples
    Don't like reading documentation? Then look at [our examples,](https://github.com/syngenta/acai-js-docs/blob/main/examples/apigateway) which can run locally! :nerd:

### 1. Match Function to HTTP Method

Each endpoint must have stateless functions which match the name of the HTTP method. If endpoint is called the a `POST` HTTP method, then the `post` endpoint function is invoked.

```js
// example for endpoint file: api/grower.js

exports.requirements = {}; // discussed in next section below

exports.post = async (request, response) => {
    response.body = {message: '[POST] /grower was called'};
    return response;
};

exports.get = async (request, response) => {
    response.body = {message: '[GET] /grower was called'};
    return response;
};

exports.patch = async (request, response) => {
    response.body = {message: '[PATCH] /grower was called'};
    return response;
};

exports.put = async (request, response) => {
    response.body = {message: '[PUT] /grower was called'};
    return response;
};

exports.delete = async (request, response) => {
    response.body = {message: '[DELETE] /grower was called'};
    return response;
};

exports.query = async (request, response) => {
    response.body = {message: '[QUERY] /grower, a custom http method, was called'};
    return response;
};
```

### 2. Configure the Requirements (optional)

Each method within the endpoint file can have individual validation requirements. These requirements allow you to test all structural points of the request, with the ability to use JSONSchema and custom middleware to further extend the validation options. Below is an example of a full requirements object:

???+ info
    See the full configuration list, explanation and example of each setting in our [Configurations Section]({{web.url}}/node/apigateway/endpoint/configurations/).

???+ tip
    If you are already using an `openapi.yml`, none of these requirements below are necessary. Ensure your `router` has enabled [`autoValidate`]({{web.url}}/node/apigateway/router/configurations/#example-router-config-with-directory-routing) with proper `schemaPath` configured and the below requirements are not necessary for any basic structural validation (headers, body, query, params will be checked via openapi.yml). You can still use `before`, `after` & `dataClass` with other custom validations for more advanced use cases.

```js
// example for endpoint file: api/grower.js

const Grower = require('api/logic/grower');

exports.requirements = {
    post: {
        requiredHeaders: ['x-onbehalf-of'],
        availableHeaders: ['x-requester-id', 'x-test-id'], //not advisable to use; too strict
        requiredBody: 'post-grower-request'
    },
    get: {
        requiredQuery: ['requester_id'],
        availableQuery: ['grower_email', 'grower_phone', 'grower_first', 'grower_last'],
    },
    put: {
        requiredPath: 'grower/{id}',
        requiredAuth: true,
        requiredBody: 'put-grower-request',
        dataClass: Grower,
        timeout: 1500, // will override timeout value set in router config
    },
    patch: {
        requiredPath: 'grower/{id}',
        requiredAuth: true,
        requiredBody: 'patch-grower-request',
        before: async (request, response, requirements) => { // might be cleaner to put this in a separate file and call in context.
            const result = await db.checkGrowerIdExists(request.pathParams.id);
            if (!result){
                response.setError('grower/{id}', `grower with id: ${id} does not exist.`);
            }
        }
    },
    delete: {
        requiredPath: 'grower/{id}',
        after: async (request, response, requirements) => { // might be cleaner to put this in a separate file and call in context.
            const relations = await db.getRequesterRelations(request.headers['x-requester-id']);
            const results = []
            for (const grower in response.rawBody){
                if (relations.includes(grower.id)){
                    results.push(grower);
                }
            }
            response.body = results;
            return response;
        }
    }
};

exports.post = async (request, response) => {
    response.body = {message: '[POST] /grower was called'};
    return response;
};

exports.get = async (request, response) => {
    response.body = {message: '[GET] /grower was called'};
    return response;
};

exports.patch = async (request, response) => {
    response.body = {message: '[PATCH] /grower was called'};
    return response;
};

exports.put = async (grower, response) => {
    response.body = {message: '[PUT] /grower was called; got instance of grower instead of request'};
    return response;
};

exports.delete = async (request, response) => {
    response.body = {message: '[DELETE] /grower was called'};
    return response;
};

exports.query = async (request, response) => {
    response.body = {message: '[QUERY] /grower, a custom http method, was called'};
    return response;
};
```
