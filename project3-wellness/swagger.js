const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: "Mood Journal API",
        description: "API to create and track mood journal entries including sleep, hydration, and exercise.",
        contact: {
            name: "Greice Moreira",
            email: "deandradegreice@gmail.com",
          },
          version: "1.0.0"
    },
    host: "cse341-gm.onrender.com",
    schemes: ["https"],

    // host: "localhost:8080",
    // schemes: ["http"],

    definitions: {
        User: {
        id: "123456789",
        email: "user@example.com",
        password: "strongpassword123",
        name: "Jane Doe",
        age: 30,
        avatar: 1
        },
        Entry: {
            user: "userId123",
            date: "2025-05-20",
            mood: 4,
            exercise: true,
            water: 8,
            sleepHours: 7.5,
            bestMemory: "Had lunch with my friend",
            gratitude: "My health"
        }
    },

    externalDocs: {
        description: "GitHub Repository",
        url: "https://github.com/GreiceMoreira/cse341-gm/tree/main/project3-wellness"
      }

};

const outputFile = './swagger.json';
const endpointsFiles = ['./server.js' , './routes/entries.js']; 

swaggerAutogen(outputFile, endpointsFiles, doc);