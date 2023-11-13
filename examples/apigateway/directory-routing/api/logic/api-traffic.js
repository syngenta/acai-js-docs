class ApiTraffic {

    // this would get really noisy if uncommented, but gives the idea of how you could
    // capture all the api traffic
    static async logRequest(request, response, requirements){
        console.log(request, response, requirements);
    }

    static async logResponse(request, response, requirements){
        console.log(request, response, requirements);
    }
}

module.exports = ApiTraffic;
