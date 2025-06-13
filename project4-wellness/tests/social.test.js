const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');

describe('GET /social', () => {
  it('should return 200 and an object', async () => {
    const response = await request(app).get('/social?user=6849bacf9069708e328de0de');
    // console.log('BODY:', response.body);
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body) || typeof response.body === 'object').toBe(true);
  });
});

describe('GET /social/:date', () => {
    it('should return 200 and an object', async () => {
        const response = await request(app)
        .get('/social/2025-06-07?user=6849bacf9069708e328de0de');
        // console.log('BODY:', response.body);
        expect(response.statusCode).toBe(200);
        expect(typeof response.body === 'object').toBe(true);
    });

    it('should return 400 if user is missing', async () => {
        const response = await request(app).get('/social/2025-06-07');
        expect(response.statusCode).toBe(400);
    });

    it('should return 400 for invalid date format', async () => {
        const response = await request(app)
        .get('/social/invalid-date?user=6849bacf9069708e328de0de');
        expect(response.statusCode).toBe(400);
    });

    it('should return 404 if no entry found', async () => {
        const response = await request(app)
        .get('/social/1999-01-01?user=6849bacf9069708e328de0de');
        expect(response.statusCode).toBe(404);
    });
});

afterAll(async () => {
  await mongoose.connection.close();
    console.log('MongoDB closed')
});