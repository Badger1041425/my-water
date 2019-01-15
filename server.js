'use strict';

const Hapi = require('hapi');

// Create a server with a host and port
const server = Hapi.server({
    host: '0.0.0.0',
    port: process.env.PORT || 8000
});

// Add the route List Product
server.route({
    method: 'GET',
    path: '/product/list',
    handler: () => { 
        return server.methods.product.ListProduct();
    }
})



// Start the server
const start = async function () {

    try {
        await server.register([require('./hapi-my-water-product')]);
        await server.start();
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }

    console.log('Server running at:', server.info.uri);
};

start();