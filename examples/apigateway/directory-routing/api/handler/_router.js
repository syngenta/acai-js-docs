const {Router} = require('acai').apigateway;
const ApiTraffic = require('../logic/api-traffic');

const router = new Router({
    routingMode: 'directory',
    basePath: 'directory-example',
    handlerPath: 'api/handler',
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
router.autoLoad();

exports.route = (event) => {
    return router.route(event);
};
