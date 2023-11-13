const {Router} = require('acai').apigateway;
const ApiTraffic = require('./shared/api-traffic');
const {routes} = require('./routes');

exports.route = async (event) => {
    const router = new Router({
        routingMode: 'list',
        basePath: 'list-example',
        handlerList: routes,
        schemaPath: 'openapi.yml',
        autoValidate: true, // will automatically validate against openapi.yml
        beforeAll: ApiTraffic.logRequest,
        afterAll: ApiTraffic.logResponse,
        onError: (request, response, error) => {
            // could do something more clever here, like push to an APM
            console.error(error);
            response.code = 500;
            response.setError('ERROR', error.message);
        }
    });
    return router.route(event);
};
