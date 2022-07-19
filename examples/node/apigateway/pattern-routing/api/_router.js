const {Router} = require('@syngenta-digital/alc').apigateway;
const ApiTraffic = require('common/api-traffic.logic');

exports.route = async (event) => {
    const router = new Router({
        routingMode: 'pattern',
        basePath: 'pattern-example',
        handlerPath: 'api/**/*.controller.js',
        schemaPath: 'openapi.yml',
        autoValidate: true, // will automatically validate against openapi.yml
        beforeAll: ApiTraffic.logRequest,
        afterAll: ApiTraffic.logResponse,
        onError: (request, response, error) => {
            // could do something more clever here, like push to an APM
            console.error(error);
        }
    });
    return router.route(event);
};
