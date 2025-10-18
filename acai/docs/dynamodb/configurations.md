---
title: "⚙️ DynamoDB Configurations"
description: Configure DynamoDB Acai Events
---

# ⚙️ DynamoDB Configurations

The Dynamodb event will automatically handle many common things done when eventing off a DynamoDB stream. Developers then have the ability to further extend that functionality with custom middleware. Below is a full list of all the configurations available and examples of their use.

???+ example "🎓 Hands-on Example"
    Don't like reading documentation? Then look at [our examples,](https://github.com/syngenta/acai-js-docs/blob/main/examples/dynamodb) which can be deployed in 1 command into your AWS account! :nerd:

## 📋 Configuration Options

| option                | type       | required | default                        | description                                                               |
|-----------------------|------------|----------|--------------------------------|---------------------------------------------------------------------------|
| **`before`**          | func       | no       | null                           | a custom function to be ran before your records are pulled                |
| **`dataClass`**       | class      | no       | null                           | a custom class that will be passed instead of the records object          |
| **`globalLogger`**    | bool       | no       | false                          | will assign the Acai logger to the global variable `globalLogger`         |
| **`operations`**      | array      | no       | ['create', 'update', 'delete'] | will only run if record was created from the listed operation             |
| **`operationError`**  | bool       | no       | false                          | will raise exception if operation of record is not from listed operations |
| **`requiredBody`**    | str or obj | no       | null                           | will validate body of record against this schema                          |
| **`schemaPath`**      | str        | no       | null                           | file path pointing to the location of the openapi.yml file                |
| **`validationError`** | bool       | no       | false                          | will raise exception if validation of record fails                        |

## 🧪 Example: DynamoDB Configuration

```js
const EventClient = require('@syngenta-digital/Acai').dynamodb.Event;
const Grower = require('api/logic/grower');

exports.stream = async (event) => {
    const options = {
        globalLogger: true,
        operations: ['create', 'update'], // [create, update, delete] by default
        operationError: false, // will raise exception if wrong operation;  default false
        requiredBody: 'ddb-record',
        schemaPath: 'api/openapi.yml',
        validationError: false, // will raise exception if validation fails;  default false
        dataClass: Grower, // will get instance of this instead of record instance
        before: (records) => {
            // run this before records are sent
        }
    }
    const eventClient = new EventClient(event, options);
    const records = await eventClient.getRecords();
    for (const grower of records) {
        // do stuff here
    }
};
```
