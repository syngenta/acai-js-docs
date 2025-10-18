---
title: "📄 DynamoDB Record"
description: Review DynamoDB Record Structure
---

# 📄 DynamoDB Record

The DynamoDB event will by default provide instances of `record` classes which will be easier to work with then a standard lambda event record object. This is the same object which will be passed down to the `dataClass`, if you provide on in your configuration. Below is a list of all the properties and example outputs for the DynamoDB event record:

???+ example "🎓 Hands-on Example"
    Don't like reading documentation? Then look at [our examples,](https://github.com/syngenta/acai-js-docs/blob/main/examples/dynamodb) which can be deployed in 1 command into your AWS account! :nerd:

## 📋 Record Properties

| property                                                               | type   | description                                          |
|------------------------------------------------------------------------|--------|------------------------------------------------------|
| **[`body`]({{web.url}}/node/dynamodb/record/#recordbody)**             | object | the new image of dynamodb record; created or updated |
| **[`created`]({{web.url}}/node/dynamodb/record/#recordcreated)**       | float  | the approximate creationDate time                    |
| **[`expired`]({{web.url}}/node/dynamodb/record/#recordexpired)**       | bool   | whether the ttl has expired                          |
| **[`id`]({{web.url}}/node/dynamodb/record/#recordid)**                 | str    | the id of the event which invoked the lambda         |
| **[`identity`]({{web.url}}/node/dynamodb/record/#recordidentity)**     | object | the identity who triggered the dynamodb change       |
| **[`keys`]({{web.url}}/node/dynamodb/record/#recordkeys)**             | object | the keys of DynamoDB record                          |
| **[`name`]({{web.url}}/node/dynamodb/record/#recordname)**             | str    | the name of the event which invoked the lambda       |
| **[`newImage`]({{web.url}}/node/dynamodb/record/#recordnewimage)**     | object | the new image of dynamodb record; created or updated |
| **[`oldImage`]({{web.url}}/node/dynamodb/record/#recordoldimage)**     | object | the old image of dynamodb record; updated or deleted |
| **[`operation`]({{web.url}}/node/dynamodb/record/#recordoperation)**   | str    | triggered operation lambda (create, update, delete)  |
| **[`region`]({{web.url}}/node/dynamodb/record/#recordregion)**         | str    | the region the record is from                        |
| **[`size`]({{web.url}}/node/dynamodb/record/#recordsize)**             | int    | the size in bytes of the record                      |
| **[`source`]({{web.url}}/node/dynamodb/record/#recordsource)**         | str    | the source of the event which invoked the lambda     |
| **[`sourceARN`]({{web.url}}/node/dynamodb/record/#recordsourcearn)**   | str    | the event source arn                                 |
| **[`streamType`]({{web.url}}/node/dynamodb/record/#recordstreamtype)** | str    | the stream view type                                 |
| **[`version`]({{web.url}}/node/dynamodb/record/#recordversion)**       | str    | the event version                                    |

#### 🔹 `record.region`

```javascript
console.log(record.region);

// example output:
'us-east-2'
```

#### 🔹 `record.id`

```javascript
console.log(record.id);

// example output:
'9a37c0d03eb60f7cf70cabc823de9907'
```

#### 🔹 `record.name`

```javascript
console.log(record.name);

// example output:
'INSERT'
```

#### 🔹 `record.source`

```javascript
console.log(record.source);

// example output:
'aws:dynamodb'
```

#### 🔹 `record.keys`

???+ info
    This is converted from the original DDB JSON to standard json

```javascript
console.log(record.keys);

// example output:
{
    example_id: '123456789'
}
```

#### 🔹 `record.oldImage`

???+ info
    This is converted from the original DDB JSON to standard json

```javascript
console.log(record.oldImage);

// example output:
{
    old_data: '123456789'
}
```

#### 🔹 `record.newImage`

???+ info
    This is converted from the original DDB JSON to standard json

```javascript
console.log(record.newImage);

// example output:
{
    new_data: '123456789'
}
```

#### 🔹 `record.body`

???+ info
    This is converted from the original DDB JSON to standard json from `newImage`

```javascript
console.log(record.body);

// example output:
{
    new_data: '123456789'
}
```

#### 🔹 `record.operation`

```javascript
console.log(record.operation);

// example output:
'create'
```

#### 🔹 `record.sourceARN`

```javascript
console.log(record.sourceARN);

// example output:
'arn:aws:dynamodb:us-east-1:771875143460:table/test-example/stream/2019-10-04T23:18:26.340'
```

#### 🔹 `record.version`

```javascript
console.log(record.version);

// example output:
'1.1'
```

#### 🔹 `record.streamType`

```javascript
console.log(record.streamType);

// example output:
'NEW_AND_OLD_IMAGES'
```

#### 🔹 `record.size`

```javascript
console.log(record.size);

// example output:
1124
```

#### 🔹 `record.created`

```javascript
console.log(record.created);

// example output:
1538695200.0 //unix timestamp
```

#### 🔹 `record.identity`

```javascript
console.log(record.identity);

// example output:
{
    type: 'Service',
    principalId: 'dynamodb.amazonaws.com'
}
```

#### 🔹 `record.expired`

```javascript
console.log(record.expired);

// example output:
false
```
