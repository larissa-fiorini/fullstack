const userController = require('../controllers/userController');
const express = require('express');
const request = require('supertest');

//Mock the user model
jest.mock('../models/User', () => ({
    find: jest.fn(() => Promise.resolve([{ name: 'Larissa', email: 'test@example.com' }]))
}));

const app = express();
app.use(express.json());
app.get('/users', userController.getUsers);

describe('GET /users', () => {
    it('should return a list of users', async () => {
        const res = await request(app).get('/users');

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual([
            { name: 'Larissa', email: 'test@example.com'}
        ]);
    });
});