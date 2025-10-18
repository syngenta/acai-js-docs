---
title: "📄 SNS/SQS Record"
description: Review SNS/SQS Record Structure
---

# 📄 SNS/SQS Record

The SNS/SQS event will by default provide instances of `record` classes which will be easier to work with then a standard lambda event record object. This is the same object which will be passed down to the `dataClass`, if you provide on in your configuration. Below is a list of all the properties and example outputs for the SNS/SQS event record:

???+ example "🎓 Hands-on Example"
    Don't like reading documentation? Then look at [our examples,](https://github.com/syngenta/acai-js-docs/blob/main/examples/sns-sqs) which can be deployed in 1 command into your AWS account! :nerd:

## 📋 Record Properties

| property                                                                    | type   | description                                                      |
|-----------------------------------------------------------------------------|--------|------------------------------------------------------------------|
| **[`attributes`]({{web.url}}/sqs/record/#record.attributes)**               | object | the attributes of the message                                    |
| **[`body`]({{web.url}}/sqs/record/#record.body)**                           | object | the object from the bucket in memory; decodes json automatically |
| **[`id`]({{web.url}}/sqs/record/#record.id)**                               | str    | the id of message                                                |
| **[`md5`]({{web.url}}/sqs/record/#record.md5)**                             | str    | the message in an md4 hash format                                |
| **[`messageAttributes`]({{web.url}}/sqs/record/#record.messageAttributes)** | object | the attributes of the message, flattened                         |
| **[`raw`]({{web.url}}/sqs/record/#record.raw)**                             | any    | the body of the message as is, no conversion                     |
| **[`receiptHandle`]({{web.url}}/sqs/record/#record.receiptHandle)**         | str    | the handle of the receipt                                        |
| **[`region`]({{web.url}}/sqs/record/#record.region)**                       | str    | the region of the message                                        |
| **[`source`]({{web.url}}/sqs/record/#record.source)**                       | str    | the source of the event which invoked the lambda                 |
| **[`sourceARN`]({{web.url}}/sqs/record/#record.sourceARN)**                 | str    | the arn of the source                                            |

#### 🔹 `record.attributes`

```javascript
console.log(record.attributes);

// example output:
{
    "ApproximateReceiveCount": "1",
    "SentTimestamp": "1545082650636",
    "SenderId": "AIDAIENQZJOLO23YVJ4VO",
    "ApproximateFirstReceiveTimestamp": "1545082650649"
}
```

#### 🔹 `record.body`

```javascript
console.log(record.body);

// example output:
{
    some_key: 'some_value'
}
```

#### 🔹 `record.source`

```javascript
console.log(record.source);

// example output:
'aws:sqs'
```

#### 🔹 `record.md5`

```javascript
console.log(record.md5);

// example output:
'e4e68fb7bd0e697a0ae8f1bb342846b3'
```

#### 🔹 `record.messageAttributes`

```javascript
console.log(record.messageAttributes);

// example output:
{
    some_attribute_key: 'some_attribute_value'
}
```

#### 🔹 `record.id`

```javascript
console.log(record.id);

// example output:
'2e1424d4-f796-459a-8184-9c92662be6da'
```

#### 🔹 `record.raw`

```javascript
console.log(record.raw);

// example output:
'{"some_key": "some_value"}'
```

#### 🔹 `record.receiptHandle`

```javascript
console.log(record.receiptHandle);

// example output:
'AQEBzWwaftRI0KuVm4tP+/7q1rGgNqicHq...'
```

#### 🔹 `record.region`

```javascript
console.log(record.region);

// example output:
'us-east-2'
```

#### 🔹 `record.sourceARN`

```javascript
console.log(record.sourceARN);

// example output:
'arn:aws:sqs:us-east-2:123456789012:my-queue'
```
