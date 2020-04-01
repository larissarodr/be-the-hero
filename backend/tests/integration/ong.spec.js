const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {
    beforeAll(async () => {
        await connection.migrate.rollback(); //rollback to avoid DB growth
        await connection.migrate.latest(); //execute migrations to ensure DB is ready
    });

    afterAll(async () => {
        await connection.destroy();
    });

    it('should be able to create a new ONG', async () => {
        const response = await request(app)
        .post('/ongs')
        .send({
            name: "APAD2",
            email: "abc@abc.com",
            whatsapp: "19999999999",
            city: "Rio do Sul",
            uf: "SC"
        });
    
        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    });

    it('should be able to list ONGs', async () => {
        const response = await request(app)
        .get('/ongs')
        .send();

        expect(response.body[0]).toHaveProperty('city');
        expect(response.body[0]).toHaveProperty('email');
        expect(response.body[0]).toHaveProperty('id');
        expect(response.body[0]).toHaveProperty('name');
        expect(response.body[0]).toHaveProperty('uf');
        expect(response.body[0]).toHaveProperty('whatsapp');
    });
});