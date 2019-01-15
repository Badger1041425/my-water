'use strict';

const Hapi = require('hapi');

// Create a server with a host and port
const server = Hapi.server({
    host: '0.0.0.0',
    port: process.env.PORT || 8000
});

// Add the route
server.route({
    method: 'GET',
    path: '/hello',
    handler: function (request, h) {
        return 'helow';
    }
});

// Add the route List Product
server.route({
    method: 'GET',
    path: '/product/list',
    handler: () => { 
        return {
            "status": 200,
            "message": "success",
            "data": [
                {
                    "id": 1,
                    "name": "Nam 1",
                    "imageUrl": "water.jpg",
                    "price": 99.99,
                    "expire": "2018-12-31"
                },
                {
                    "id": 1,
                    "name": "Nam 1",
                    "imageUrl": "water.jpg",
                    "price": 99.99,
                    "expire": "2018-12-31"
                }
            ]
        };
    }
})


// Start the server
const start = async function () {

    try {
        await server.start();
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }

    console.log('Server running at:', server.info.uri);
};

start();