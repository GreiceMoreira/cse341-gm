const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: "Mood Journal API",
        description: "API to create and track mood journal entries including sleep, hydration, and exercise.",
        contact: {
            name: "Greice Moreira teste",
            email: "deandradegreice@gmail.com",
          },
          version: "1.0.0"
    },
    // host: "cse341-gm.onrender.com",
    // schemes: ["https"],

    host: "localhost:8080",
    schemes: ["http"],

    definitions: {
        User: {
            email: "user@example.com",
            password: "strongpassword123",
            name: "Jane Doe",
            age: 30,
            avatar: 1
        },
        SocialEntry: {
            user: "6849bacf9069708e328de0de",
            date: "2025-06-07",
            interactionsCount: 3,
            socialActivities: ["Lunch with friend", "Call with family"],
            interactionType: ["In-person", "Online"],
            interactionQuality: "Good",
            energyAfterSocializing: "Refreshed",
            socialMood: "Connected"
        },
        PhysicalEntry: {
            user: "6849bacf9069708e328de0de",
            date: "2025-06-07",
            mood: 8,
            exercise: true,
            water: 2,
            sleepHours: 7.5,
            healthyEating: true,
            homeCare: "Cleaned the kitchen and folded laundry"
        },
        SpiritualEntry: {
            user: "6849bacf9069708e328de0de",
            date: "2025-06-07",
            prayerTime: 2,
            scriptureStudyMinutes: 30,
            comeFollowMeStudy: true,
            sacramentMeeting: true,
            ministering: false,
            templeAttendance: false,
            spiritualFeeling: "Grateful",
            journal: "Reflected on faith during study"
        },
        IntellectualEntry: {
            user: "6849bacf9069708e328de0de",
            date: "2025-06-07",
            studyMinutes: 120,
            pagesBooksRead: 45,
            newSkillsPracticed: ["UI Design", "Git"],
            mentalState: "Focused",
            notes: "Learned new CSS tricks",
            motivationLevel: 8,
            distractionsCount: 2
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
        url: "https://github.com/GreiceMoreira/cse341-gm/tree/main/project4-wellness"
    }

};

const outputFile = './swagger.json';
const endpointsFiles = ['./server.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);