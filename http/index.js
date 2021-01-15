'use strict';

const Hapi = require('@hapi/hapi');
const inert = require('@hapi/inert')
const HapiRoutesLoader = require('hapi-routes-loader')

const { PORT, HOST } = process.env

const init = async () => {

    const server = Hapi.server({
        port: PORT,
        host: 'https://secure-peak-22813.herokuapp.com/'
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

    await server.start();
    console.log(`Server running on ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();