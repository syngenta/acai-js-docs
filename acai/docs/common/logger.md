---
title: "🛠️ Logger"
description: How to use the Acai Logger
---

# 🛠️ Logger
The Acai logger is automatically logs in a formatted JSON string for easy reading and searching with AWS Cloud Watch. A developer can then use [AWS filter patterns](https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/FilterAndPatternSyntax.html) making it effortless to find the exact log they are looking for. Below is an example of how to use the logger:

## 🎯 Examples

### 🔹 Basic Usage

```javascript
// if you use globalLogger: true, in any config the logger is available globally
global.logger.info('testing info');

global.logger.debug('testing debug');

global.logger.warn('testing warn');

global.logger.error('testing warn');

// standard output
{
	level: '$LEVEL', 
    log: '$MESSGE'
}
```

### 🔹 Advanced Usage

```javascript
// if you use globalLogger: true, in any config the logger is available globally
global.logger.log({level:'INFO', log: {someKey: 'testing info'}});

// standard output
{
    level: 'INFO',
    log: {
        someKey: 'testing info'
    }
}
```
