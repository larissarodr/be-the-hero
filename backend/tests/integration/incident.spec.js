const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('INCIDENTS', () => {
    beforeAll(async () => {
        await connection.migrate.rollback(); //rollback to avoid DB growth
        await connection.migrate.latest(); //execute migrations to ensure DB is ready
    });

    afterAll(async () => {
        await connection.destroy();
    });

    it('should be able to create a new incident', async () => {
        const responseOng = await request(app)
        .post('/ongs')
        .send({
            name: "APAD2",
            email: "abc@abc.com",
            whatsapp: "19999999999",
            city: "Rio do Sul",
            uf: "SC"
        });
        
        const ongId = responseOng.body.id;

        const response = await request(app)
        .post('/incidents')
        .set('Authorization', ongId) //adding Authorization header
        .send({
            title: "Case 9",
            description: "My description",
            value: "150",
        });
    
        expect(response.body).toHaveProperty('id');
    });

    it('should be able to list incidents', async () => {
        const response = await request(app)
        .get('/incidents')
        .send();

        expect(response.body[0]).toHaveProperty('id');
        expect(response.body[0]).toHaveProperty('title');
        expect(response.body[0]).toHaveProperty('description');
        expect(response.body[0]).toHaveProperty('value');
        expect(response.body[0]).toHaveProperty('ong_id');
        expect(response.body[0]).toHaveProperty('name');
        expect(response.body[0]).toHaveProperty('email');
        expect(response.body[0]).toHaveProperty('whatsapp');
        expect(response.body[0]).toHaveProperty('city');
        expect(response.body[0]).toHaveProperty('uf');
    });

    it('should be able to delete an incident', async () => {
        const response = await request(app)
        .delete('/incidents/1')
        .send();

        expect(204);
    });
});