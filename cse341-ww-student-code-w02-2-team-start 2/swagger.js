const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: "API",
        description: "Team Week 02",
    },
    host: 'localhost:8080',
    schemes: ['http'],
};

const outputFile = './sweeger_output.json';
const endpointsFiles = ['./index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);