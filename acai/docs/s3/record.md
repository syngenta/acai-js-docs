---
title: "📄 S3 Record"
description: Review S3 Record Structure
---

# 📄 S3 Record

The S3 event will by default provide instances of `record` classes which will be easier to work with then standard lambda event record object. This is the same object which will be passed down to the `dataClass`, if you provide on in your configuration. Below is a list of all the properties and example outputs for the S3 event record:

???+ example
    Don't like reading documentation? Then look at [our examples](https://github.com/syngenta/acai-js-docs/blob/main/examples/s3) which can be deployed in 1 command into your AWS account! :nerd:

## 📋 Record Properties

| property                                                   | type   | description                                                      |
|------------------------------------------------------------|--------|------------------------------------------------------------------|
| **[`body`]({{web.url}}/s3/record/#record.body)**           | object | the object from the bucket in memory; buffer, json or csv object |
| **[`bucket`]({{web.url}}/s3/record/#record.bucket)**       | str    | the name of the bucket                                           |
| **[`id`]({{web.url}}/s3/record/#record.id)**               | str    | the id of configuration                                          |
| **[`key`]({{web.url}}/s3/record/#record.key)**             | str    | the bucket key                                                   |
| **[`name`]({{web.url}}/s3/record/#record.name)**           | str    | the name of the event which invoked the lambda                   |
| **[`object`]({{web.url}}/s3/record/#record.object)**       | object | the object described from the bucket                             |
| **[`operation`]({{web.url}}/s3/record/#record.operation)** | str    | triggered operation lambda (create, delete)                      |
| **[`region`]({{web.url}}/s3/record/#record.region)**       | str    | the region the record is from                                    |
| **[`request`]({{web.url}}/s3/record/#record.request)**     | object | the request parameters                                           |
| **[`response`]({{web.url}}/s3/record/#record.response)**   | object | the response parameters                                          |
| **[`source`]({{web.url}}/s3/record/#record.source)**       | str    | the source of the event which invoked the lambda                 |
| **[`time`]({{web.url}}/s3/record/#record.time)**           | float  | the event time                                                   |
| **[`version`]({{web.url}}/s3/record/#record.version)**     | object | the s3 schema version                                            |


#### 🔹 `record.region`

```javascript
console.log(record.region);

// example output:
'us-east-2'
```

#### 🔹 `record.body`

```javascript
console.log(record.body);

// example output: depending on the configuration, it might be a Buffer, CSV, or JSON object
// does require `getObject: true` to be set in the options of the EventClient
```

#### 🔹 `record.bucket`

```javascript
console.log(record.bucket);

// example output:
{
    "name": "DOC-EXAMPLE-BUCKET",
    "ownerIdentity": {
        "principalId": "A3I5XTEXAMAI3E"
    },
    "arn": "arn:aws:s3:::lambda-artifacts-deafc19498e3f2df"
}
```

#### 🔹 `record.id`

```javascript
console.log(record.id);

// example output:
'828aa6fc-f7b5-4305-8584-487c791949c1'
```

#### 🔹 `record.name`

```javascript
console.log(record.name);

// example output:
'ObjectCreated:Put'
```

#### 🔹 `record.source`

```javascript
console.log(record.source);

// example output:
'aws:s3'
```

#### 🔹 `record.time`

```javascript
console.log(record.time);

// example output:
'2019-09-03T19:37:27.192Z'
```

#### 🔹 `record.key`

```javascript
console.log(record.key);

// example output:
'some-directory/b21b84d653bb07b05b1e6b33684dc11b.json'
```

#### 🔹 `record.object`

```javascript
console.log(record.object);

// example output:
{
    'key': 'some-directory/b21b84d653bb07b05b1e6b33684dc11b.json',
    'size': 1305107,
    'eTag': 'b21b84d653bb07b05b1e6b33684dc11b',
    'sequencer': '0C0F6F405D6ED209E1'
}
```

#### 🔹 `record.operation`

```javascript
console.log(record.operation);

// example output:
'create'
```

#### 🔹 `record.request`

```javascript
console.log(record.request);

// example output:
{
    "sourceIPAddress": "205.255.255.255"
}
```


#### 🔹 `record.response`

```javascript
console.log(record.response);

// example output:
{
    "x-amz-request-id": "D82B88E5F771F645",
    "x-amz-id-2": "vlR7PnpV2Ce81l0PRw6jlUpck7Jo5ZsQjryTjKlc5aLWGVHPZLj5NeC6qMa0emYBDXOo6QBU0Wo="
}
```

#### 🔹 `record.version`

```javascript
console.log(record.version);

// example output:
"1.0"
```
