const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: "Contact API",
        description: "List of contacts. Project 2 of CSE 341 course.",
        contact: {
            name: "Greice Moreira",
            email: "deandradegreice@gmail.com",
          },
          version: "1.0.0"
    },
    servers: [
        { url: "http://localhost:8080" },
        { url: "https://cse341-gm.onrender.com" }
    ],
    schemes: ['http', 'https'],

    definitions: {
        Contact: {
          firstName: "John",
          lastName: "Doe",
          email: "john@example.com",
          favoriteColor: "blue",
          birthday: "1990-01-01"
        }
      },

    externalDocs: {
        description: "GitHub Repository",
        url: "https://github.com/GreiceMoreira/cse341-gm/tree/main/project2-contact"
      }

};

const outputFile = './swagger.json';
const endpointsFiles = ['./server.js']; 

swaggerAutogen(outputFile, endpointsFiles, doc);