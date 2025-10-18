---
title: "📝 Breaking Changes"
description: Key updates in Acai 2.0
---

# 📝 Breaking Changes from 1.x to 2.0

Acai 2.0 introduces new capabilities and a few necessary deprecations. The tables below summarise what changed and how to migrate.

???+ tip "⚙️ Upgrade Script"
    Want to automate the migration? Run the script below from the root of your project:
    ```bash
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/syngenta/acai-js-docs/main/scripts/node-upgrade.sh)"
    ```

### 🚦 API Gateway

| old              | new                       | description                                                    |
|------------------|---------------------------|----------------------------------------------------------------|
| `router.route()` | **`router.route(event)`** | `router.route` now requires the event to be passed in          |
| `requiredParams` | **`requiredQuery`**       | `requiredQuery` is how you define required query string params |
| `request.params` | **`request.query`**       | `request.query` is how you access query string params          |

### 🔄 DynamoDB, S3 & SNS/SQS Event

| old             | new                            | description                                                                           |
|-----------------|--------------------------------|---------------------------------------------------------------------------------------|
| `event.records` | **`await event.getRecords()`** | To use advanced validation features, call the async method; `.records` still works.    |

### 🗃️ DynamoDB Record

| old                                  | new                     |
|--------------------------------------|-------------------------|
| `record.approximateCreationDateTime` | **`record.created`**    |
| `record.awsRegion`                   | **`record.region`**     |
| `record.eventID`                     | **`record.id`**         |
| `record.eventName`                   | **`record.name`**       |
| `record.eventSource`                 | **`record.source`**     |
| `record.eventSourceARN`              | **`record.sourceARN`**  |
| `record.streamViewType`              | **`record.streamType`** |
| `record.sizeBytes`                   | **`record.size`**       |
| `record.userIdentity`                | **`record.identity`**   |
| `record.timeToLiveExpired`           | **`record.expired`**    |

### 🪣 S3 Record

| old                                   | new                    |
|---------------------------------------|------------------------|
| `record.awsRegion`                    | **`record.region`**    |
| `record.eventID`                      | **`record.id`**        |
| `record.eventName`                    | **`record.name`**      |
| `record.eventSource`                  | **`record.source`**    |
| `record.eventSourceARN`               | **`record.sourceARN`** |
| `record.requestParameters`            | **`record.request`**   |
| `record.responseElements`             | **`record.response`**  |
| `record.s3SchemaVersion`              | **`record.version`**   |

### ✉️ SNS/SQS Record

| old               | new                    |
|-------------------|------------------------|
| `record.awsRegion`| **`record.region`**    |
| `record.eventName`| **`record.name`**      |
| `record.eventSource`| **`record.source`**  |
| `record.eventSourceARN`| **`record.sourceARN`** |
| `record.messageId`| **`record.id`**        |
| `record.rawBody`  | **`record.raw`**       |
