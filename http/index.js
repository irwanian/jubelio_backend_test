'use strict';

const Hapi = require('@hapi/hapi');
const inert = require('@hapi/inert')
const HapiRoutesLoader = require('hapi-routes-loader')

const { PORT, HOST } = process.env

const init = async () => {

    const server = Hapi.server({
        port: PORT || 2021,
        host: HOST || 'localhost'
    });

    await server.register([inert, 
    {
        plugin: HapiRoutesLoader,
        options: {
            dirname: __dirname,
            pathRoutes: '/../routes'
        }
    }
])

    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => h.response('BANZAI!!')
    })

    await server.start();
    console.log(`Server running on ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();