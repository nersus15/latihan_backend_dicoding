const hapi = require('@hapi/hapi');
const routes = require('./routes');
// const InvalidInput = require('./inputError');

const init = async () => {
    const server = hapi.server({
        port: 5000,
        host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
        routes: {
            cors: {
                "origin": ["http://notesapp-v1.dicodingacademy.com"]
            }
        }
    });
    
    server.route(routes);
    
    await server.start();
    console.log(`Server runing at ${server.info.uri}`);
}

/**
 * 
 * @param {Object} values
 * @param {Object} config 
 * @param {String} message 
 */

init();