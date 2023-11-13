const EventClient = require('acai').s3.Event;

const schema = {
    type: 'object',
    required: ['id', 'body'],
    additionalProperties: false,
    properties: {
        id: {
            type: 'string'
        },
        body: {
            type: 'object'
        }
    }
};

exports.event = async (event) => {
    const options = {
        globalLogger: true,
        operations: ['create', 'delete'], // [create, delete] by default
        operationError: false, // will raise exception if wrong operation;  default false
        requiredBody: schema, // or provide the name of a component schema found in an openapi.yml
        // schemaPath: 'openapi.yml', required if requiredBody is a name reference to openapi.yml schema
        validationError: false, // will raise exception if validation fails;  default false
        getObject: true, // will automatically pull object from bucket and hold in memory
        isJSON: true, // convert pulled object to JSON object; getObject is required
        isCSV: false, // convert pulled object to CSV object; getObject is required
        before: (records) => {
            // could do something more clever here, like push to an APM
            console.log('records', records);
        }
    }
    const eventClient = new EventClient(event, options);
    const records = await eventClient.getRecords();
    for (const record of records) {
        global.logger.log({level: 'INFO', log: record.body});
    }
};
