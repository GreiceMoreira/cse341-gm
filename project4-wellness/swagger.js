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
        SocialEntry: {
            user: "userId123",
            date: "2025-06-07",
            socialInteraction: 7,
            connection: "Had lunch with a friend"
        },
        PhysicalEntry: {
            user: "userId123",
            date: "2025-06-07",
            mood: 8,
            exercise: true,
            water: "2 liters",
            sleepHours: 7.5,
            healthyEating: true,
            homeCare: "Cleaned the kitchen and did laundry"
        },
        SpiritualEntry: {
            user: "userId123",
            date: "2025-06-07",
            prayerTime: "Morning and night",
            scriptureStudyMinutes: 30,
            comeFollowMeStudy: true,
            sacramentMeeting: true,
            ministering: false,
            templeAttendance: true,
            spiritualFeeling: "Peaceful and uplifted",
            journal: "Felt inspired after reading Alma 32"
        },
        IntellectualEntry: {
            user: "userId123",
            date: "2025-06-07",
            studyTime: 120,
            courses: "BYU Software Development",
            booksRead: "Atomic Habits",
            challenges: "Struggled with time management",
            wins: "Finished all homework ahead of deadline",
            creativeTime: "Sketched ideas for UI project"
        }
        
    },
    securityDefinitions: {
        cookieAuth: {
            type: "apiKey",
            in: "cookie",
            name: "connect.sid"
        }
    },

    externalDocs: {
        description: "GitHub Repository",
        url: "https://github.com/GreiceMoreira/cse341-gm/tree/main/project3-wellness"
    }

};

const outputFile = './swagger.json';
const endpointsFiles = ['./server.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);